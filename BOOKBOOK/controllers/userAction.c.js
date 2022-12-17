const userS = require('../services/userServices')

exports.getFeed = async (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            if (req.user.permission == 0) {
                const uProfile = await userS.getUserProfile(req.user.username)
                res.render('index', {
                    title: "BookBook",
                    userAvatar: uProfile.avatar
                })
            }
            else if (req.user.permission == 1) {
                res.redirect('/admin')
            }
            else {
                res.redirect('/login')
            }
        }
        else {
            res.redirect('/login')
        }
    } catch (error) {
        next(error)
    }
}