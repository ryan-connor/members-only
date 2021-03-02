const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const hidden = require('../hidden');

const opts = {};

//assumes token is in auth header as bearer token
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = hidden.jwtSecret;

module.exports = new JwtStrategy( opts, (jwt_payload, done) => {

    return done(null, jwt_payload);
});
