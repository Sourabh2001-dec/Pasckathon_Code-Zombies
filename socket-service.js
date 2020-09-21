const socketIo = require("socket.io");
var jwtAuth = require("socketio-jwt-auth");
const User = require("./models/User");
var ObjectID = require("mongodb").ObjectID;

class SocketService {
  constructor(server) {
    this.io = socketIo(server);
    this.io.use(
      jwtAuth.authenticate(
        {
          secret: process.env.JWT_SECRET, // required, used to verify the token's signature
          algorithm: "HS256",
          succeedWithoutToken: true,
        },
        function (payload, done) {
          // you done callback will not include any payload data now
          // if no token was supplied
          if (payload && payload.id) {
            User.findOne({ _id: new ObjectID(payload.id) }, function (
              err,
              user
            ) {
              console.log("payload", payload);
              console.log("error", err);
              console.log("user", user);
              if (err) {
                // return error
                return done(err);
              }
              if (!user) {
                // return fail with an error message
                return done(null, false, "user does not exist");
              }
              // return success with a user info
              return done(null, user);
            });
          } else {
            return done(); // in your connection handler user.logged_in will be false
          }
        }
      )
    );
    this.io.on("connect", (socket) => {
      socket.emit("success", {
        message: "success logged in!",
        user: { ...socket.request.user._doc },
      });
      console.log("This is user", { ...socket.request.user._doc });
      console.log("user connected");
    });
    this.io.on("disconnect", (socket) => console.log("disconnected"));
  }

  emiter(event, body) {
    console.log("emitting", body);
    if (body) this.io.emit(event, body);
  }
}

module.exports = SocketService;
