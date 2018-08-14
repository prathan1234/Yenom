import passport from 'passport';

var user = require('../controllers/user.controller');

module.exports = (app) => {
    var path = '/user';

    app.post('/login', user.login);
    app.post('/logout', user.logout);

    app.post('/signup', user.create);

    app.get(path + '/all', user.getAllUsers);
    app.get('/:username', user.getOneUser);

    app.post(path + '/edit/:username', user.editUser);
    app.get(path + '/remove/:username', user.removeUser);

    app.get('/oauth/google', passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
        failureRedirect: '/login'
    }));

    app.get('/oauth/google/callback', passport.authenticate('google', {
        failureRedirect: '/login',
        successRedirect: '/home'
    }));

}
