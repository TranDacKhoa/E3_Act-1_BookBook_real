const app = require("express");
const router = app.Router();
const userActionC = require("../controllers/userAction.c");

router.get("/", userActionC.checkPermission, userActionC.getFeed);

router.post("/like", userActionC.likePost);

router.post("/comment", userActionC.commentPost);

router.route("/report_post").post(userActionC.reportPost);

router.route("/report_user").post(userActionC.reportUser);

module.exports = router;
