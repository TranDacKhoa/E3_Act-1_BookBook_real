const express = require("express")
const userRouter = require("./routers/user.r")
//const profileRouter = require("./routers/profile.r")
const feedRouter = require("./routers/feed.r")
const postRouter = require("./routers/post.r")
const bodyParser = require("body-parser")

const app = express()
const port = 3000

// using public folder
app.use('/post', express.static(__dirname + '/public'))
app.use('/user', express.static(__dirname + '/public'))
app.use('/', express.static(__dirname + '/public'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))

// Handlebars config
require("./configs/hbs") (app)

// Session
require("./configs/session") (app)

// Passport
require("./configs/passport") (app)

// Router
app.use('/', userRouter)
app.use('/', feedRouter)
app.use('/post', postRouter)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode | 500
    res.status(statusCode).send(err.message)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})