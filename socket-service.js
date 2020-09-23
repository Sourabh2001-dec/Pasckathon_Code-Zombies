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
          secret: process.env.JWT_SECRET,
          algorithm: "HS256",
          succeedWithoutToken: true,
        },
        function (payload, done) {
          if (payload && payload.id) {
            User.findOne({ _id: new ObjectID(payload.id) }, function (
              err,
              user
            ) {
              console.log("payload", payload);
              console.log("error", err);
              console.log("user", user);
              if (err) {
                return done(err);
              }
              if (!user) {
                return done(null, false, "user does not exist");
              }
              return done(null, user);
            });
          } else {
            return done();
          }
        }
      )
    );
    this.io.on("connect", (socket) => {
      // if admin join admin room else join normal room
      if (socket.request.user.admin && socket.request.user.college) {
        socket.join(socket.request.user.college + "-admin");
      } else if (socket.request.user.college) {
        socket.join(socket.request.user.college);
      }
      socket.emit("success", {
        message: "success logged in!",
        user: { ...socket.request.user._doc },
      });
      console.log("This is user", { ...socket.request.user._doc });
      console.log("user connected");
    });
    this.io.on("disconnect", (socket) => console.log("disconnected"));
  }

  emiter(event, collegeid, body) {
    console.log("emitting", body);
    if (body) this.io.to(collegeid).emit(event, body);
  }
  adminemiter(event, collegeid, body) {
    console.log("emitting", body);
    if (body) this.io.to(collegeid + "-admin").emit(event, body);
  }
}

module.exports = SocketService;
