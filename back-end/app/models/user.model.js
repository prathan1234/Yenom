import mongoose from 'mongoose';
import crypto from 'crypto';
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        trim: true
    },
    firstname: String,
    lastname: String,
    phonenumber: String,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        // required: 'Password is required',
        validate: [
            (password) => { return password && password.length >= 4; },
            'Password cannot be less than 4!'
        ]
    },
    status: { type: String },
    created: {
        type: Date,
        default: Date.now
    },
    salt: String,
    provider: {
        type: String,
        default: 'local'
    },
    providerId: String,
    providerData: {}
});

UserSchema.pre('save', function (next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

UserSchema.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
}

UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
}

UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');
    _this.findOne({
        username: possibleUsername
    }, (err, user) => {
        if (!err) {
            if (!user) callback(possibleUsername);
            else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        }
        else {
            callback(null);
        }
    });
}

mongoose.model('User', UserSchema);