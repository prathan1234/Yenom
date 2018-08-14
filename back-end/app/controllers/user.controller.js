var User = require('mongoose').model('User');
var path = require("path");

exports.login = (req, res, done) => {
    var user_req = new User(req.body);
    User.findOne({ username: user_req.username }, (err, user) => {
        if (!user || err || !user.authenticate(user_req.password)) {
            res.json({ "success": "false" });
        }
        else {
            res.json({ "success": "true", "status": user.status });
        }
    });
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

exports.create = (req, res, next) => {
    var user = new User(req.body);
    user.save((err) => {
        if (!user || err) {
            console.log('Failure');
            res.json({ "success": "false" });
        }
        else {
            console.log('Success\n' + user);
            res.json({ "success": "true" });
        }
    });
}

exports.editUser = (req, res, next) => {
    var userupdate = {};
    userupdate = Object.assign(userupdate, req.body);
    delete userupdate._id;
    User.update({
        username: req.params.username
    }, userupdate, 
        function (err, user) {
            if (err) { return next(err); }
            else {
                res.json(user);
            }
        });
}

exports.removeUser = (req, res, next) => {
    User.remove({
        username: req.params.username
    }, function (err, user) {
        if (err) {
            console.log('Failure');
            return next(err);
        }
        else {
            console.log('Remove success');
        }
    });
}

exports.getOneUser = (req, res, next) => {
    User.findOne({
        username: req.params.username
    }, function (err, user) {
        if (err) {
            console.log('Failure' + err);
            return next(err);
        }
        else {
            console.log('Success');
            res.json(user);
        }
    });
}

exports.getAllUsers = (req, res, next) => {
    User.find((err, user) => {
        if (err) {
            console.log('Failure');
            return next(err);
        }
        else {
            console.log('Success');
            res.json(user);
        }
    });
}

exports.saveOAuthUserProfile = (req, profile, done) => {
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, function (err, user) {
        if (err) return done(err);
        else {
            if (!user) {
                var possibleUsername = profile.username || (profile.email ? profile.email.split('@')[0] : '');
                console.log('NAME: ' + profile.username);
                User.findUniqueUsername(possibleUsername, null, (availableUsername) => {
                    profile.username = availableUsername;
                    user = new User(profile);
                    user.save((err) => {
                        if (err) { return req.res.redirect('/user/login'); }
                        return done(err, user);
                    })
                });
            }
            else { return done(err, user); }
        }
    });
}