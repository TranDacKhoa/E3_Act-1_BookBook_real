const CryptoJS = require("crypto-js")
const hashLength = 64
const userM = require('../models/user.m')

exports.getLogIn = async (req, res, next) => {
    try {
        res.render('login', {
            title: "Log In",
            layout: "account.hbs"
        })
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
                title: "Sign Up",
                layout: "account.hbs",
                errorMsg: errorMsg
            })
        }
        else {
            res.render('signup', {
                title: "Sign Up",
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
//             res.render('user', {
//                 title: "User",
//                 name: name
//             })
//         }
//         else {
//             res.redirect('/user/login')
//         }
//     } catch(error) {
//         next(error)
//     }
// }

// exports.postUser = async (req, res, next) => {
//     try {
//         const un = req.body.username
//         const pw = req.body.password

//         switch(req.body.todo) {
//             case 'login':
//                 {  
//                     const unDb = await userM.byUsername(un)
//                     const pwDb = unDb[0].f_Password
//                     const salt = pwDb.slice(hashLength)
//                     const pwSalt = pw + salt
//                     const pwHashed = CryptoJS.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString(CryptoJS.enc.Hex)
//                     const permission = unDb[0].f_Permission

//                     if (pwDb == (pwHashed + salt)) {
//                         req.session.name = unDb[0].f_Name
//                         req.session.uid = unDb[0].f_ID
//                         req.session.rem = req.body.remember
//                         req.session.permission = permission
//                     }
//                     if (permission == 0) {
//                         res.redirect('/user')
//                     }
//                     else {
//                         res.redirect('/admin')
//                     }
//                 }
//                 break
//             case 'signup':
//                 {
//                     const unDb = await userM.byUsername(un)
//                     if (unDb.length > 0) {
//                         req.session.errorMsg = "This username is used, please choose another username"
//                         res.redirect("/user/signup")
//                     }
//                     else {
//                         const salt = Date.now().toString(16)
//                         const pwSalt = pw + salt
//                         const pwHashed = CryptoJS.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString(CryptoJS.enc.Hex)
//                         const name = req.body.name
//                         const email = req.body.email
//                         const dob = req.body.dob
                        
//                         const u = {
//                             username: un,
//                             password: pwHashed + salt,
//                             name: name,
//                             email: email,
//                             dob: dob
//                         }
//                         const uNew = await userM.add(u)
                        
//                         res.redirect('/user/login')
//                     }   
//                 }
//                 break
//             case 'logout':
//                 {
//                     req.session.destroy()
//                     res.redirect('/user/login')
//                 }
//                 break
//         }
//     } catch(error) {
//         console.log('error')
//         next(error)
//     }
// }

