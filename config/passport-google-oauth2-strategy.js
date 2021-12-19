const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');

// Tell passport to use a new strategy for google login 
passport.use(new googleStrategy({
        clientID: env.google_clientID,
        clientSecret: env.google_clientSecret,
        callbackURL: env.google_callbackURL
    },
    function(accessToken, refreshToken, profile, done){
        // Find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('Error in google strategy - Passport', err);
                return;
            }
            // If found, set it as req.user
            if(user){
                done(null,user);
            }
            // Else, create it and set it as req.user
            else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err,user){
                    if(err){
                        console.log('Error in creating user', err);
                        return;
                    }
                    done(null,user);
                });

            }
        })
    }
));

module.exports = passport;