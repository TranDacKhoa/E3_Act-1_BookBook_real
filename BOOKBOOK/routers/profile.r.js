const app = require("express");
const upload_avt = require("../uploads/storage").upload_avt;
const router = app.Router();
const userActionC = require("../controllers/userAction.c");

router
  .route("/")
  .all(userActionC.checkPermission)
  .get(userActionC.handleMyProfile, userActionC.handleOtherProfile)

router
  .route("/edit")
  .post(
    upload_avt.single("avatar"),
    userActionC.updateProfile
  );

router
  .route("/follow")
  .post(userActionC.followUser)

router
  .route("/unfollow")
  .post(userActionC.unfollowUser)


module.exports = router
