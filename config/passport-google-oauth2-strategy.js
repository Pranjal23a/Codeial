const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');

passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_call_back_url,
},
    function (aceesToken, refreshToken, profile, done) {
        // Find a user

        User.findOne({ email: profile.emails[0].value }).exec()
            .then(user => {
                if (user) {
                    // If user found, set user as req.user
                    return done(null, user);
                } else {
                    // If user not found, create the user and set it as req.user
                    return User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex'),
                    });
                }
            })
            .then(newUser => {
                return done(null, newUser);
            })
            .catch(err => {
                console.log('Error in Google strategy-passport:', err);
                return done(err);
            });

    }
));

module.exports = passport;