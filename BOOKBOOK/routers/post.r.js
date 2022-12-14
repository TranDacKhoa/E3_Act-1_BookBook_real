const app = require('express')
const router = app.Router()

router.get('/', (req, res, next) => {
    res.render("post_main")
})

module.exports = router