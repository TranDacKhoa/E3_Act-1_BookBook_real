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
  // const text1 = await user.createNewUser("user5", "1", "1", "user5@gmail.com");
  // console.log(text1);
});
