/* begin:strategy */
// const { Strategy, ExtractJwt } = require('passport-jwt');
// const config = require('../../../config/config');

// const options = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: config.jwtSecret,
// };

// const JwtStrategy = new Strategy(options, (payload, done) => {
//   return done(null, payload);
// });

// module.exports = JwtStrategy;
/* end:strategy */

const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require('../../config/config');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

const jwtStrategy = new Strategy(opts, (jwt_payload, done) => {
  return done(null, jwt_payload);
});

passport.use(jwtStrategy);
