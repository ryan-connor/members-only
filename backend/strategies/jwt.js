const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const hidden = require('../hidden');

const opts = {};

//note assumes token is in auth header as bearer, could configure otherwise
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = hidden.jwtSecret;

module.exports = new JwtStrategy( opts, (jwt_payload, done) => {

    console.log("made it into the jwt strategy");

    //could add check for user in db here later, currently always returns true if jwt verifies
    return done(null, true);

});
