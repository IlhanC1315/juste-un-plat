const { Strategy: jwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/UserSchema');
const passport = require('passport');
require('dotenv').config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //prend le JWT depuis le header
    secretOrKey: process.env.JWT_SECRET,  //utilise le meme secret que pour le signer
};

module.exports = (passport) => {
    passport.use(
        new jwtStrategy(opts, async (jwt_playload, done) => {
            try {
                const user = await User.findById(jwt_playload.id);
                if (user && user.isActive) {
                    return done(null, user)
                }
                return done(null, false);
            } catch (err) {
                return done(null, false)
            }
        })
    );
};