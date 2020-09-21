var express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var SocketService = require("./socket-service");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => console.log("Mongo DB Connected"))
  .catch((err) => console.log(err.message));

const PORT = process.env.PORT || 3000;
var app = express();
const server = require("http").Server(app);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use((req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});


// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode);
  if (process.env.NODE_END == "production") {
    res.json({
      message: error.message,
    });
  } else {
    res.json({
      message: error.message,
      stack: error.stack,
    });
  }
});

server.listen(PORT, function () {
  console.debug(`listening on port ${PORT}`);
});

app.set("socketService", new SocketService(server));
