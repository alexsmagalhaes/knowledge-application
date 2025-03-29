const passport = require("passport");
const passportJwt = require("passport-jwt");

const authSecret = process.env.JWT_SECRET;

const { Strategy, ExtractJwt } = passportJwt;

module.exports = (app) => {
  const params = {
    secretOrKey: authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  const strategy = new Strategy(params, (payload, done) => {
    app
      .db("users")
      .where({ id: payload.id })
      .first()
      .then((user) => {
        done(null, user ? { ...payload } : false);
      })
      .catch((msg) => {
        done(msg, false);
      });
  });

  passport.use(strategy);

  return {
    authenticate: () => passport.authenticate("jwt", { session: false }),
  };
};
