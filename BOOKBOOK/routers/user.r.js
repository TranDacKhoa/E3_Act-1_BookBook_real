const app = require('express')
const router = app.Router()
const userC = require('../controllers/user.c')

router.get('/login', userC.getLogIn)
router.get('/signup', userC.getSignUp)

router.post('/signup', userC.postSignUp)
// router.post('/logout', userC.logOut)

module.exports = router