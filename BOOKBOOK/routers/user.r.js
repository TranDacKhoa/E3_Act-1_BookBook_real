const app = require('express')
const router = app.Router()
const userCtrller = require('../controllers/user.c')

router.get('/login', userCtrller.getLogIn)
router.get('/signup', userCtrller.getSignUp)

router.post('/user', userCtrller.postUser)

module.exports = router