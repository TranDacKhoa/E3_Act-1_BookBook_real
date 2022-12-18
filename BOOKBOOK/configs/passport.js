const bcrypt = require("bcrypt")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const userS = require("../services/userServices")

module.exports = app => {
    app.use(passport.initialize())
    app.use(passport.session())

    passport.serializeUser((user, done) => {
        done(null, user.username)
    })

    passport.deserializeUser(async (username, done) => {
        try {
            const user = await userS.getUserInfo(username)
            done(null, user)
        } catch (err) {
            done(err, null)
        }
    })

    passport.use(new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            //passReqToCallback: true     // add more params
        },
        async (username, password, done) => {
            try {
                const checkLogin = await userS.checkLogin(username, password)
                if (!checkLogin) {
                    return done(null, false)
                }
                const user = await userS.getUserInfo(username)

                return done(null, user)
            } catch (err) {
                return done(err)
            }
        }
    ))
}