const express = require("express")
const userRouter = require("./routers/user.r")
//const adminRouter = require("./routers/admin.r")
const bodyParser = require("body-parser")

const app = express()
const port = 3000

app.use('/user', express.static(__dirname + '/public'))
app.use('/', express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))

// Handlebars config
require("./configs/hbs") (app)

// Session
require("./configs/session") (app)

// Router
app.use('/user', userRouter)
//app.use('/admin', adminRouter)

// Root
// app.get('/', (req, res, next) => {
//     try {
//         res.render('index', {
//             title: "Home",
//         })
//     } catch(error) {
//         next(error)
//     }
// })

app.use((err, req, res, next) => {
    const statusCode = err.statusCode | 500
    res.status(statusCode).send(err.message)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})