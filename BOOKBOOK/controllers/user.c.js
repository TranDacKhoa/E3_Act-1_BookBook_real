const CryptoJS = require("crypto-js")
const hashLength = 64
const userM = require('../models/user.m')

exports.getLogIn = async (req, res, next) => {
    try {
        // User has logged in
        if (req.session.rem) {
            res.redirect('/')
        }
        // User hasn't logged in
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

exports.getSignUp = async (req, res, next) => {
    try {
        if (req.session.errorMsg) {
            errorMsg = req.session.errorMsg
            delete req.session.errorMsg
            res.render('signup', {
                title: "Sign Up | BookBook",
                layout: "account.hbs",
                errorMsg: errorMsg
            })
        }
        else {
            res.render('signup', {
                title: "Sign Up | BookBook",
                layout: "account.hbs",
            })
        }
    } catch(error) {
        next(error)
    }
}

// exports.getUser = async (req, res, next) => {
//     try {
//         if (req.session.permission == 0) {
//             let name = req.session.name
//             if (!req.session.rem) {
//                 req.session.destroy()
//             }
//             res.render('index', {
//                 title: "User",
//                 name: name
//             })
//         }
//         else {
//             res.redirect('/login')
//         }
//     } catch(error) {
//         next(error)
//     }
// }

exports.postUser = async (req, res, next) => {
    try {
        
        console.log(req.body)

        switch(req.body.todo) {
            case 'login':
                {  
                    const un = req.body.username
                    const pw = req.body.password
                    const unDb = await userM.byUsername(un)
                    const pwDb = unDb[0].f_Password
                    const salt = pwDb.slice(hashLength)
                    const pwSalt = pw + salt
                    const pwHashed = CryptoJS.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString(CryptoJS.enc.Hex)
                    const permission = unDb[0].f_Permission

                    if (pwDb == (pwHashed + salt)) {
                        req.session.name = unDb[0].f_Name
                        req.session.uid = unDb[0].f_ID
                        req.session.rem = req.body.remember
                        req.session.permission = permission
                    }
                    if (permission == 0) {
                        res.redirect('/user')
                    }
                    else {
                        res.redirect('/admin')
                    }
                }
                break
            case 'checkusername':
                {
                    const un = req.body.username
                    const uiDb = await userM.findUserInfo(un)
                    const upDb = await userM.findUserProfile(un)
                    if (uiDb.length > 0 || upDb.length > 0) {
                        res.send({result: 0})
                    }
                    else {
                        res.send({result: 1})
                    }
                }
            case 'signup':
                {
                    const un = req.body.username
                    const pw = req.body.password
                    const salt = Date.now().toString(16)
                    const pwSalt = pw + salt
                    const pwHashed = CryptoJS.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString(CryptoJS.enc.Hex)
                    const fullname = req.body.fullname
                    const email = req.body.email
                    const dob = req.body.dob
                    const sex = req.body.sex
                    const phone = req.body.phone
                    const secretkey = req.body.secretkey

                    const u = {
                        fullname: fullname,
                        username: un,
                        password: pwHashed + salt,
                        email: email,
                        dob: dob,
                        sex: sex,
                        phone: phone,
                        secretkey: secretkey
                    }
                    
                    const userInfoNew = await userM.addUserInfo(u)
                    const userProfileNew = await userM.addUserProfile(u)
                    
                    res.redirect('/login')
                }
                break
            case 'logout':
                {
                    req.session.destroy()
                    res.redirect('/login')
                }
                break
        }
    } catch(error) {
        console.log('error')
        next(error)
    }
}