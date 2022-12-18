const app = require("express");
const router = app.Router();
const userC = require("../controllers/user.c");
const passport = require("passport");

//vì tất cả router đều phải đi qua middleware isloggedin
//--> có thể tạo 1 middleware chung ngoài app.js
//eg. app.user("/",isloggedin)

router.get("/login", userC.getLogIn);
//router.get('/login', is logged in,login)
router.get("/signup", userC.getSignUp);
//router.get('/signup', is logged in,signup)

router.post("/login", passport.authenticate("local"), userC.postLogIn);
//router.post('/login', is logged in, validate,passport,isadmin,feed)
router.post("/signup", userC.postSignUp);
//router.post('/signup', is logged in, validate,login)
router.post("/logout", userC.logOut);
//router.post('/logout', is logged in,logout,login)

module.exports = router;
