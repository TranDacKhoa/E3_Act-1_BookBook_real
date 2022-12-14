const userM = require('../models/user.m')
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getLogIn = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            res.redirect('/')
        }
        else {
            res.render('login', {
                title: "Log In | BookBook",
                layout: "account.hbs"
            })
        }
    } catch(error) {
        next(error)
    }
}

exports.getSignUp = (req, res, next) => {
    try {
        // if (req.session.errorMsg) {
        //     errorMsg = req.session.errorMsg
        //     delete req.session.errorMsg
        //     res.render('signup', {
        //         title: "Sign Up",
        //         errorMsg: errorMsg
        //     })
        // }
        // else {
            res.render('signup', {
                title: "Sign Up | BookBook",
                layout: "account.hbs",
            })
        //}
    } catch(error) {
        next(error)
    }
}



exports.postLogIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.admin) {
            res.redirect('/admin')
        }
        else {
            res.redirect('/')
        }
    }
    else {
        res.redirect('/login')
    }
}

exports.postSignUp = async (req, res, next) => {
    try {
        const un = req.body.username
        console.log(req.body)
        
        switch (req.body.todo) {
            case "checkusername": {
                const unDb = await userM.findUserInfoByUsername(un)
                if (unDb.length > 0) {
                    res.send(JSON.stringify({result: 0}))
                }
                else {
                    res.send(JSON.stringify({result: 1}))
                }   

                break
            }

            case "signup": {
                const pw = req.body.password
                const key = req.body.secretkey
                const pwHashed = await bcrypt.hash(pw, saltRounds)
                const keyHashed = await bcrypt.hash(key, saltRounds)
                const fullname = req.body.fullname
                const email = req.body.email
                const dob = req.body.dob
                const gender = req.body.gender
                
                const uInfo = {
                    email: email,
                    password: pwHashed,
                    username: un,
                    admin: false,
                    secretkey: keyHashed
                }
                const uProfile = {
                    fullname: fullname,
                    username: username,
                    gender: gender,
                    location: null,
                    about: null,
                    avatar: '/images/user/user-default.png',
                    dob: dob
                }
                const uInfoNew = await userM.addUserInfo(uInfo)
                const uProfileNew = await userM.addUserProfile(uProfile)

                res.redirect('/login')
            }
        }
    } catch (err) {
        next(err)
    }
}

exports.postLogOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        req.logout(err => {
            if (err) {
                return next(err)
            }
        })
    }
    res.redirect('/login')
}