const app = require('express')
const router = app.Router()
const userActionC = require('../controllers/userAction.c')

router.get('/', userActionC.checkPermission, userActionC.checkUser, userActionC.getProfile)

// router.post('/follow', userActionC.checkPermission, userActionC.followUser)
// router.post('/unfollow', userActionC.checkPermission, userActionC.unfollowUser)

router.post('/follow', userActionC.checkPermission, userActionC.getFollow)
router.post('/unfollow', userActionC.checkPermission, userActionC.getFollow)

module.exports = router