const app = require('express')
const router = app.Router()
//const userCtrller = require('../controllers/user.c')

router.get('/', (req, res, next) => {
    try {
        // User hasn't logged in
        //if (req.session.admin == undefined) {
        //    res.redirect('/login')
        //}
        // This is admin account
        //else if (req.session.admin == true) {

        //}
        // This is user account
        //else {
            // let name = req.session.name
            // if (!req.session.rem) {
            //     req.session.destroy()
            // }
            res.render('index', {
                title: "BookBook",
                // name: "Ng Ng Thuy"
            })
       // }   
    } catch(error) {
        next(error)
    }
})


module.exports = router