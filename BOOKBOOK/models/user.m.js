const initOptions = {}
const pgp = require('pg-promise')(initOptions)
const cn = require("../configs/connectStr")

const db = pgp(cn)

module.exports = {
    // getUsers: async () => {
    //     const rs = await db.any('select * from "Users"')
    //     return rs
    // },
    addUserInfo: async (u) => {
        const insertString = 'insert into user_info(email, pwd, username, admin, secret_key)'
                            +' values ($1, $2, $3, $4, $5) returning *'
        
        const rs = await db.one(insertString, [u.email, u.password, u.username, u.admin, u.secretkey])
        return rs
    },
    addUserProfile: async (u) => {
        const insertString = 'insert into user_profile(fullname, username, gender, location, about, avatar)'
                                +' values ($1, $2, $3, $4, $5, $6) returning *'
        
        const rs = await db.one(insertString, [u.fullname, u.username, u.gender, u.location, u.about, u.avatar])
        return rs
    },
    findUserInfo: async (username) => {
        const rs = await db.any('select * from user_info where username = $1', [username])
        return rs
    },
    findUserProfile: async (username) => {
        const rs = await db.any('select * from user_profile where username = $1', [username])
        return rs
    },
}