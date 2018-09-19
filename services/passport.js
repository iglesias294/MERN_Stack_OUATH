const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');
require('https').globalAgent.options.rejectUnauthorized = false;

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
})
//create a new instance of google strategy, tell passport to use it 
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({
        googleId: profile.id
    })
    if (existingUser) {
        //we already have a record with the given profile ID
        done(null, existingUser);
    }

    //We dont have a user record with this ID,make a new record!
    const user = await new User({
        googleId: profile.id
    }).save()
    done(null, user);


}));

//create a new instance of facebook strategy, tell passport to use it
passport.use(new FacebookStrategy({
    clientID: keys.facebookClientId,
    clientSecret: keys.facebookClientSecret,
    callbackURL: '/auth/facebook/callback'
},
    async function (accessToken, refreshToken, profile, cb) {
        console.log(profile)
        const existingUser = await User.findOne({
            facebookId: profile.id
        })
        if (existingUser) {
            //we already have a record with the given profile ID
            done(null, existingUser);
        }

        //We dont have a user record with this ID,make a new record!
        const user = await new User({
            facebookId: profile.id
        }).save()
        done(null, user);

    }
))