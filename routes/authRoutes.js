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
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    })
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })

}