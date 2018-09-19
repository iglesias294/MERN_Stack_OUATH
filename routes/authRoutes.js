const passport = require('passport');

module.exports = (app) => {
    //route for google auth page
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        }));
    //callback route after authorization
    app.get('/auth/google/callback',
        passport.authenticate('google'))

    //TODO: Add Facebook oAuth
    app.get('/auth/facebook',
        passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));

    // app.get('/auth/facebook/callback',
    //     passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }))
    // function (req, res) {
    //     console.log('yay');
    //     res.redirect('/')
    // });


    //TODO: Add a third 0Auth

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    })
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })

}