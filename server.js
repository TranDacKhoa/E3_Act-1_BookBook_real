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
  // const text = await user.getList();
  const text = await user.getFollowingList("user2");
  console.log(text);
});
