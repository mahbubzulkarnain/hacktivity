const FacebookStrategy = require('passport-facebook').Strategy;
const {User} = require('../models');
const {Op} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser(async (user, cb) => {
        if (user && user.fbToken) {
            let profile = await User.findOne({
                where: {fbToken: user.fbToken}
            });
            cb(null, profile)
        } else {
            cb(null, user);
        }
    });

    passport.use('facebook', new FacebookStrategy({
        clientID: "826259671068644",
        clientSecret: "583872ee78d62429320dc8278e7c47e8",
        callbackURL: "http://localhost:3000/login/facebook/callback",
        profileFields: ['id', 'email', 'name', 'displayName', 'picture.type(large)']
    }, async function (accessToken, refreshToken, profile, cb) {
        try {
            console.log(profile);
            let user = await User.findOne({
                where: {
                    fbToken: profile.id
                }
            });
            if (!user || !user.id) {
                user = await User.findOne({
                    where: {
                        [Op.or]: [
                            {username: profile.displayName.replace(/\s+/g, '').toLowerCase()},
                            {email: profile.emails[0].value}
                        ]
                    }
                });
                if (user && user.id) {
                    user = await user.update({
                        fbToken: profile.id
                    })
                }
            }
            if (!user || !user.id) {
                user = await User.create({
                    avatar: profile.photos[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    fbToken: profile.id,
                    username: profile.displayName
                })
            }
            cb(null, user)
        } catch (e) {
            console.log(e);
            cb(e)
        }
    }))
};