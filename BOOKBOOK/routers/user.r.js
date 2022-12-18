const app = require("express");
const router = app.Router();
const userC = require("../controllers/user.c");
const passport = require("passport");

// router.route("/").get(userC.getLogIn);

router
  .route("/login")
  .get(userC.getLogIn)
  .post(passport.authenticate("local"), userC.postLogIn);

router
  .route("/signup")
  .get(userC.renderHome, userC.getSignUp)
  .post(userC.renderHome, userC.postSignUp);

router.post("/logout", userC.logOut);

module.exports = router;
