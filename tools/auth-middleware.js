const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;


const init = () => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: 'secret'
  }
  passport.use(new JwtStrategy(opts, (decoded, done) => {
    return done(null, decoded)
  }))
}


const protectWithJwt = (req, res, next) => {
  if (req.path == '/' || req.path == '/auth/login') {
    return next();
  }
  return passport.authenticate('jwt', { session: false })(req, res, next);
}

exports.init = init;
exports.protectWithJwt = protectWithJwt;


