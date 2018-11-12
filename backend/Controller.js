const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const User = require('./models/User')
const UserController= require('./controllers/User')
const Auth = require('./Auth')


// ============ Allow Requests from a Browser ==========
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})

app.get('/', (req, res) => {
    res.status(200)
    res.contentType('application/json')
    res.json({
        response: 'hello world',
        method: "GET"
    })
    console.log("Get request at path '/'")
})

app.post('/signup', (req, res) => {
    const { firstname, lastname, email, password, is_teacher } = req.body
    const user = new User({ firstname, lastname, email, password, is_teacher })
    console.log('Attempt at signup:\n', );
    console.log(user);
    const { success, message } = UserController.RegisterUser(user)
    const status = { success, message }
    console.log(status);
    res.json(status)
    res.end()
})

app.post('/login', (req, res) => {
    const { email, password } = req.body
    const result = Auth.AuthenticateUser(email,password)
    console.log("Attempt at login:", { email, password })
    res.json(result)
})

const MessageController = require('./controllers/Message');

app.post('/messages', MessageController.create);
app.get('/messages/:messageId', MessageController.getById);
//app.put('/messages/:messageId', messageController.updateById); NOT NEEDED FOR NOW
//app.delete('/messages/:messageId', messageController.deleteById); NOT NEEDED FOR NOW

const ThreadController = require('./controllers/Thread');

app.get('/threads', ThreadController.getAll);
app.post('/threads', ThreadController.create);
app.get('/threads/:threadId', ThreadController.getById);
//app.put('/threads/:threadId', threadController.updateById); NOT NEEDED FOR NOW
app.get('/threads/:threadId/messages', ThreadController.getAllMessagesById);


const PostController = require('./controllers/Post')

// req.body  = {author_email, data, group_id}
app.post('/posts', PostController.create)
// gets all post
app.get('/posts')
// gets all posts written by one user in the shared dashboard
app.get('/posts/:author_email,', PostController.retrieve)





// modify the test db only
// ------------------------------------------------------------------
app.post('/test/posts',PostController.create)

app.get('/test/posts',PostController.retrieve)

// gets all posts written by one user in the shared dashboard
app.get('/test/posts/:author_email',PostController.retrieve)
// ------------------------------------------------------------------


let port = 8000;
const api = app.listen(port, () => {
    console.log('backend started on port', port)
});

module.exports = api;
