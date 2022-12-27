const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const userRouter = require("./routers/user.r");
const adminRouter = require("./routers/admin.r");
const profileRouter = require("./routers/profile.r");
const feedRouter = require("./routers/feed.r");
const postRouter = require("./routers/post.r");
const marketRouter = require("./routers/market.r");
const e = require("express");

const app = express();
app.use(morgan("dev"));
// using public folder
app.use(
  "/",
  express.static(__dirname + "/public"),
  express.static(__dirname + "/uploads")
);
app.use(
  "/profile",
  express.static(__dirname + "/public"),
  express.static(__dirname + "/uploads")
);
app.use(
  "/market",
  express.static(__dirname + "/public"),
  express.static(__dirname + "/uploads")
);
app.use(
  "/market/me",
  express.static(__dirname + "/public"),
  express.static(__dirname + "/uploads")
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Handlebars config
require("./configs/hbs")(app);

// Session
require("./configs/session")(app);

// Passport
require("./configs/passport")(app);

// Router

app.use("/", feedRouter);
app.use("/", userRouter);
app.use("/", postRouter);
app.use("/profile", profileRouter);
app.use("/market", marketRouter);
app.use("/admin", adminRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode | 500;
  res.status(statusCode).send(err.message);
});

module.exports = app;
