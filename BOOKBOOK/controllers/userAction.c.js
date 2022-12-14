// const userM = require('../models/user.m')

exports.getFeed = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            if (!req.user.admin) {
                console.log("getfeed\n", userAvatar)
                res.render('index', {
                    title: "BookBook",
                    userAvatar: req.user.avatar
                })
            }
            else {
                res.redirect('/admin')
            }
        }
        else {
            res.redirect('/login')
        }
    } catch (error) {
        next(error)
    }
}