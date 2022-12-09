const app = require('express')
const router = app.Router()
const userCtrller = require('../controllers/user.c')

router.get('/login', userCtrller.getLogIn)
router.get('/signup', userCtrller.getSignUp)

router.get('/forgotpass', userCtrller.getSignUp)

// router.get('/', userCtrller.getUser)
// router.post('/', userCtrller.postUser)

module.exports = router