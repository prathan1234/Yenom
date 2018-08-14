var path = require('path');

exports.index = (req, res) => {
    res.sendFile((path.join(__dirname + '/../views/index.html')));
}

exports.home = (req, res) => {
    if (req.user) {
        // res.sendFile((path.join(__dirname + '/../views/home.html')));
        res.render((path.join(__dirname + '/../views/home.html')), { username: req.user.username });        
    }
    else {
        res.status(400).send({ message: 'User is not signed in' });
    }
}

exports.help = (req, res) => {
    res.send('Help me');
}
