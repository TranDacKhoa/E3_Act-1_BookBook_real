const userS = require('../services/userServices')
const hbsHelpers = require('../helpers/hbs_helpers.js')

exports.getFeed = async (req, res, next) => {
    try {
        const uProfile = await userS.getUserProfile(req.user.username)
        res.render('feed', {
            title: "BookBook",
            user: uProfile,
        })
    } catch (error) {
        next(error)
    }
}

exports.checkPermission = async (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            if (req.user.permission == 0) {
                next()
            }
            else if (req.user.permission == 1) {
                res.redirect('/admin')
            }
            else {
                res.redirect('/block')
            }
        }
        else {
            res.redirect('/login')
        }
    } catch (error) {
        next(error)
    }
}

exports.checkUser = async (req, res, next) => {
    try {
        if (req.user.username === req.query.username || req.query.username === undefined) {
            const uProfile = await userS.getUserProfile(req.user.username)
            res.render('profile', {
                title: uProfile.fullname + " | BookBook",
                user: uProfile,
                userViewed: uProfile,
                helpers: hbsHelpers,
            })
        }
        else {
            next()
        }
    } catch (error) {
        next(error)
    }
}

exports.getProfile = async (req, res, next) => {
    try {
        const uProfile = await userS.getUserProfile(req.user.username)
        const uViewedProfile = await userS.getUserProfile(req.query.username)
        res.render('profile', {
            title: uViewedProfile.fullname + " | BookBook",
            user: uProfile,
            userViewed: uViewedProfile,
            helpers: hbsHelpers,
        })
    } catch (error) {
        next(error)
    }
}