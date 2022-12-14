const bcrypt = require("bcrypt")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const userM = require("../models/user.m")

module.exports = app => {
    app.use(passport.initialize())
    app.use(passport.session())

    passport.serializeUser((user, done) => {
        done(null, user.username)
    })

    passport.deserializeUser(async (username, done) => {
        try {
            const user = await userM.findUserInfo(username)
            done(null, user[0])
        } catch (err) {
            done(err, null)
        }
    })

    passport.use(new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true     // add more params
        },
        async (req, username, password, done) => {
            try {
                const user = await userM.findUserInfo(username)

                // if user with this username does not exist
                if (user.length == 0) {
                    return done(null, false)
                }

                const cmp_pw = await bcrypt.compare(password, user[0].password)
                const cmp_key = await bcrypt.compare(req.body.secretkey, user[0].secret_key)

                // if password or secret key don't match
                if (!cmp_pw || !cmp_key) {
                    return done(null, false)
                }

                return done(null, user[0])
            } catch (err) {
                return done(err)
            }
        }
    ))
}