const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');

const opts = { };
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_OR_KEY;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_paylad, done) => {
        User.findById(jwt_paylad.id).then(user => {
            if (user) {
                console.log('config/passport.js');
                return done(null, user);
            }
            return done(null, false);
        }).catch(err => console.log(err));
    }));
}