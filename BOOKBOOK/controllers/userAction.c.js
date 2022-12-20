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
            const followers = await userS.getFollowersList(req.user.username)
            const following = await userS.getFollowingList(req.user.username)
            res.render('profile', {
                title: uProfile.fullname + " | BookBook",
                user: uProfile,
                userViewed: uProfile,
                followers: followers,
                following: following,
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
        const followers = await userS.getFollowersList(req.query.username)
        const following = await userS.getFollowingList(req.query.username)
        // console.log(followers)
        // console.log(following)

        res.render('profile', {
            title: uViewedProfile.fullname + " | BookBook",
            user: uProfile,
            userViewed: uViewedProfile,
            followers: followers,
            following: following,
            helpers: hbsHelpers,
        })
    } catch (error) {
        next(error)
    }
}

exports.followUser = async (req, res, next) => {
    try {
        const result = await userS.follow(req.user.username, req.body.user_to_follow)
        if (result) {
            res.send(JSON.stringify({ result: 1 }))
        }
        else {
            res.send(JSON.stringify({ result: 0 }))
        }
    } catch (error) {
        next(error)
    }
}

exports.unfollowUser = async (req, res, next) => {
    try {
        const result = await userS.follow(req.user.username, req.body.user_to_unfollow)
        if (result) {
            res.send(JSON.stringify({ result: 1 }))
        }
        else {
            res.send(JSON.stringify({ result: 0 }))
        }
    } catch (error) {
        next(error)
    }
}

exports.getFollow = async (req, res, next) => {
    try {
        const followers = await userS.countFollowers(req.user.username)
        const following = await userS.countFollowing(req.user.username)
        console.log("followers\n", followers)
        console.log("following\n", following)
        if (followers != null && following != null) {
            res.send(JSON.stringify({ result: 1 }))
        }
        else {
            res.send(JSON.stringify({ result: 0 }))
        }
    } catch (error) {
        next(error)
    }
}