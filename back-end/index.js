import mongoose from './config/mongoose';
import express from './config/express';
import passport from './config/passport';

var node_env = 'development';

process.env.NODE_ENV = process.env.NODE_ENV || node_env;
process.env.PORT = process.env.PORT || 3000;

var db = mongoose();
var app = express();
var psp = passport();
var cors = require('cors');

app.options('*', cors());

app.listen(process.env.PORT, () => {
    console.log('Starting node.js on port ' + process.env.PORT);
});
module.exports = app;