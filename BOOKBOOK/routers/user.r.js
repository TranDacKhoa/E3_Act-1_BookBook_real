const app = require('express')
const router = app.Router()
const userC = require('../controllers/user.c')
const passport = require('passport')

router.get('/login', userC.getLogIn)
router.get('/signup', userC.getSignUp)

router.post('/login', passport.authenticate('local'), userC.postLogIn)
router.post('/signup', userC.postSignUp)
router.post('/logout', userC.logOut)

module.exports = router