const app = require("express");
const router = app.Router();
const adminC = require("../controllers/admin.c");

router.get('/', adminC.checkPermission, adminC.redirectAdmin)
router.get('/post', adminC.checkPermission, adminC.renderReportPost)
router.get('/user', adminC.checkPermission, adminC.renderReportUser)


module.exports = router;
