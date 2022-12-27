const app = require("express");
const router = app.Router();
const adminC = require("../controllers/admin.c");

router
  .route("/")
  .all(adminC.checkPermission)
  .get(adminC.renderAdmin);


module.exports = router;
