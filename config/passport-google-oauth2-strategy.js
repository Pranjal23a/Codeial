const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID: '252313988975-97t5qoo7639ogpafbijg5b11uef6aerf.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/users/auth/google/callback',
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