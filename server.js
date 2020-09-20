var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const PORT = process.env.PORT || 5000;
var app = express();
const server = require("http").Server(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

server.listen(PORT, function () {
    console.debug(`listening on port ${PORT}`);
  });
