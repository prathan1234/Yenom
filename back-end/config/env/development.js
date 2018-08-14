module.exports = {
    mongoUri: 'mongodb://localhost:27017/Yenom',
    debug: true,
    sessionSecret: 'dev_secret_key',
    google: {
        clientID: '58130352340-dndl9o15b5nivour4p18n4rdd6c2b9i7.apps.googleusercontent.com',
        clientSecret: 'VuT_LxU6L0j0YWuhmRinQ4A1',
        callbackURL: 'http://localhost:3000/oauth/google/callback'
    }
}
