const searchS = require("../services/searchServices");

module.exports.searchPeople = async (req, res, next) => {
  var input = req.query.user;
  if (input === undefined || input.trim() === "") {
    // res.redirect("/");
  } else {
    const result = await searchS.searchUser(input);
    res.render("search", {
      result: result,
      query: input,
      user: {
        avatar: req.user.profile.avatar,
      },
    });
  }
};

// module.exports.testRender = async (req, res) => {
//   const result = await searchS.searchUser("nguyen");
//   res.render("search", {
//     result: result,
//   });
// };
