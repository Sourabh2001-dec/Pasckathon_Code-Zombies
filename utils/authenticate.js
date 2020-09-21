var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken");
var passport = require("passport");
var ObjectID = require("mongodb").ObjectID;
const User = require("../models/User");
require("dotenv").config();

exports.getToken = function (user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "6h" });
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({ _id: new ObjectID(jwt_payload.id) }, (err, user) => {
      console.log("authenticate",err);
      console.log("authenticate",user);
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

exports.verifyUser = passport.authenticate("jwt", { session: false });

exports.verifyAdmin = (req, res, next) => {
  if (req.user.admin) {
    return next();
  } else {
    res.status(403).json({ error : "You are not authorized to perform this operation!" });
  }
};
