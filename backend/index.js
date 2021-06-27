var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
/**
 * Routes of the backed
 * Index Route - Default Route
 * Login Route - Routes related to login
 * Dashboard Route - Routes relates to dashboard
 */
var indexRouter = require("./routes/index");
var loginRouter = require("./routes/login");
var dashboardRouter = require("./routes/dashboard");

const cors = require('cors');
const PORT = process.env.PORT || 3001;
var app = express();

app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/dashboard", dashboardRouter);

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/coviddb", {
  useNewUrlParser: true,
});

mongoose.connection.on("error", function () {
  console.log("Unable to connect ro database.");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
