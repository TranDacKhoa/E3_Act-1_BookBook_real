const app = require('express')
const router = app.Router()
const userActionC = require('../controllers/userAction.c')

router.get('/', userActionC.checkPermission, userActionC.getFeed)

module.exports = router