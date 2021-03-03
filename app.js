require("dotenv").config();
require("./config/mongo");
require("./helpers/hbs"); // custom functions adding features to hbs templates

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("hbs");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views/partials")); // where are the tiny chunks of views ?

app.use(logger("dev"));
app.use(express.json()); // expose asynchronous posted data in req.body
app.use(express.urlencoded({ extended: false })); // same for synchronous posted data
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// FLASH MESSAGES
// enable "flash messaging" system
// flash relies on the express-session mechanism
app.use(flash());
// INITIALIZE SESSION
app.use(
  session({
    secret: "ASecretStringThatSouldBeHARDTOGUESS/CRACK",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(require("./middlewares/exposeFlashMessage"));
app.use(require("./middlewares/exposeLoginStatus"));


// connect routers
const indexRouter = require("./routes/index");
const artistRouter = require("./routes/artist");
const albumRouter = require("./routes/album");
const labelRouter = require("./routes/label");
const styleRouter = require("./routes/style");
const authRouter = require("./routes/auth");


// use routers
app.use("/", indexRouter); // use routers
app.use("/dashboard/artist", artistRouter); // use artist router
app.use("/dashboard/album", albumRouter); // use album router
app.use("/dashboard/label", labelRouter); // use label router
app.use("/dashboard/style", styleRouter); // use style router
app.use("/dashboard/auth", authRouter); //use auth router

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

