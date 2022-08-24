const express = require('express')
const app = new express()
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const BlogPost = require('./models/BlogPost.js')
const fileUpload = require('express-fileupload')
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const validateMiddleware = require("./middleware/validationMiddleware");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')

app.use(expressSession({
    secret: 'keyboar dcat'
}))
global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
})

app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.listen(4000, () => {
    console.log('App listening on port 4000')
})

app.get('/', homeController)

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/post', (req, res) => {
    res.render('post')
})

app.get('/post/:id', getPostController)

app.post('/posts/store', authMiddleware, storePostController)

app.get('/posts/new', authMiddleware, newPostController)

app.use('/posts/new', validateMiddleware);

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);

app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.post('/posts/store', (req, res) => {
    BlogPost.create(req.body, (error, blogpost) => {
        res.redirect('/')
    })
})
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.get('/auth/logout', logoutController)
app.use((req,res) => res.render('notfound'))    