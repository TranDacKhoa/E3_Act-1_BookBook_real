const express = require("express");
const path = require("path");
const fs = require("fs");
const user = require("./services/userServices");

const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));
app.use(express.json());

// app.get("/", async (req, res) => {
//   // const text = await user.getList();

//   res.send(text);
// });

app.listen(port, async () => {
  console.log("server started!");
  const text = await user.getList();
  var data = {
    username: "user5",
    password: "11",
    secretkey: "1",
    email: "user5@gmail.com",
  };
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
  console.log(text);
});
