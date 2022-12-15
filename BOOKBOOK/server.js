const express = require("express");
const userRouter = require("./routers/user.r");
//const profileRouter = require("./routers/profile.r")
const feedRouter = require("./routers/feed.r");
const postRouter = require("./routers/post.r");
const bodyParser = require("body-parser");
const sequelize = require("./database/db").sequelize;

//
const user = require("./services/userServices");
//
const app = express();
const port = 3000;

// using public folder
app.use("/post", express.static(__dirname + "/public"));
app.use("/user", express.static(__dirname + "/public"));
app.use("/", express.static(__dirname + "/public"));

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
app.use("/", userRouter);
app.use("/", feedRouter);
app.use("/post", postRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode | 500;
  res.status(statusCode).send(err.message);
});

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

app.listen(port, async () => {
  console.log("server started!");
  //Note chỉ lần đầu tiên chạy server mới chạy dòng sequelize.sync này để đồng bộ model và db
  await sequelize.sync({ alter: true });

  var data = {
    username: "user2",
    password: "1",
    secretkey: "1",
    email: "user2@gmail.com",
  };
  const text = await user.createDefaultProfile("user2");

  console.log(text);
  // const text1 = await user.creatDefaultProfile("user4");
  // const text1 = await user.startFollow("user2", "user1");
  var postdata = {
    img: "./public/avt1.png",
    content: "test post on wall",
  };
  var cmt = {
    username: "user2",
    post_id: "17",
    text: "tôi test cmt phát",
  };
  // const text1 = await user.deleteOnWall(17);
});
