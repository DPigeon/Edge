const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const User = require("./models/User");
const UserController = require("./controllers/User");
const Auth = require("./Auth");

// ============ Allow Requests from a Browser ==========
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get("/", (req, res) => {
    res.status(200);
    res.contentType("application/json");
    res.json({
        response: "hello world",
        method: "GET"
    });
    console.log("Get request at path '/'");
});

app.post("/signup", (req, res) => {
    const {
        firstname,
        lastname,
        email,
        password,
        is_teacher
    } = req.body;
    const user = new User({
        firstname,
        lastname,
        email,
        password,
        is_teacher
    });
    console.log("Attempt at signup:\n");
    console.log(user);
    const {
        success,
        message
    } = UserController.RegisterUser(user);
    const status = {
        success,
        message
    };
    console.log(status);
    res.json(status);
    res.end();
});

app.post("/login", (req, res) => {
    const {
        email,
        password
    } = req.body;
    const result = Auth.AuthenticateUser(email, password);
    console.log("Attempt at login:", {
        email,
        password
    });
    res.json(result);
});

const MessageController = require("./controllers/Message");

app.get("/users", UserController.getAll);

app.post("/messages", MessageController.create);
app.get("/messages/:messageId", MessageController.getById);
//app.put('/messages/:messageId', messageController.updateById); NOT NEEDED FOR NOW
//app.delete('/messages/:messageId', messageController.deleteById); NOT NEEDED FOR NOW

const ThreadController = require("./controllers/Thread");

app.get("/threads", ThreadController.getAll);
app.post("/threads", ThreadController.create);
app.get("/threads/:threadId", ThreadController.getById);
//app.put('/threads/:threadId', threadController.updateById); NOT NEEDED FOR NOW
app.get("/threads/:threadId/messages", ThreadController.getAllMessagesById);

const GroupController = require("./controllers/Group");

app.get("/groups", GroupController.getAll);
app.post("/groups", GroupController.create);
app.get("/groups/:groupId", GroupController.getById);

app.post("/groups/:groupId/members", GroupController.addMemberToGroup);
app.get("/groups/:groupId/members", GroupController.getMembers);

app.post("/groups/:groupId/requests", GroupController.createRequest);
app.get("/groups/:groupId/requests", GroupController.getRequests);

app.get("/groupRequests/:requestId", GroupController.getRequest);
app.post("/groupRequests/:requestId", GroupController.processRequest);

const PostController = require("./controllers/Post");

// req.body  = {author_email, data, group_id}
app.post("/posts", PostController.create);
// gets all post
app.get("/posts", PostController.retrieveAll);
// gets all posts written by one user in the shared dashboard
app.get('/posts/:author_email', PostController.retrieveByUser)

// modify the test db only
// ------------------------------------------------------------------
app.post("/test/posts", PostController.create);

app.get("/test/posts", PostController.retrieveAll);

// gets all posts written by one user in the shared dashboard
app.get("/test/posts/:author_email", PostController.retrieveByUser);
// ------------------------------------------------------------------

const NotificationController = require("./controllers/Notification");

// create notification
app.post("/notifications", NotificationController.create);
// gets all the notifications for a user id
app.get("/notifications/:userId", NotificationController.getAllNotifications);
// deletes a notification
app.post("/notifications/:notificationId", NotificationController.dismissNotification);

const CommentController = require('./controllers/Comment')

app.post('/comments', CommentController.create)

app.post('/test/comments', CommentController.create)

const LikeController = require('./controllers/Like')

app.post('/likes', LikeController.create)

app.post('/test/likes', LikeController.create)

const RecoverPasswordController = require("./controllers/RecoverPassword");

app.post('/sendRecoverEmail', RecoverPasswordController.sendRecoverEmail);


module.exports.determineTestAndAuth = (req) => {
    let test = false
    if (req.originalUrl.slice(1, 5) == 'test') {
        test = true
    }

    const jwt = req.get('jwt');
    const {
        isAuthorized,
        token
    } = Auth.AuthorizeUser(jwt);
    return {
        test,
        isAuthorized,
        token
    }
}

let port = 8000;
const api = app.listen(port, () => {
    console.log("backend started on port", port);
});


module.exports = api
