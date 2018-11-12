const Post = require('../models/Post')
const Auth = require('../Auth')


module.exports.create = (req, res) => {
    console.log("Enter PostController.create handler")
    let test = false
    if (req.originalUrl.slice(1, 5) == 'test') {
        test = true
    }
    console.log("test => " + test)
    const isAuthorized = true
    // const { jwt } = req.header
    // const { isAuthorized } = Auth.AuthorizeUser(jwt)
    if (isAuthorized) {
        console.log("isAuthorized => " + isAuthorized)
        const { author_email, data, group_id } = req.body
        if (author_email == undefined || author_email == "") {
            res.json({
                success: false,
                message: 'author_email cannot be an empty field when creating a dashboard post'
            })
            return
        }
        const newPost = new Post(author_email, data, group_id)
        const { success, message } = Post.persist({ newPost, test })
        if (success == undefined || success == null) {
            // if enter this block, method must be async.
            // However it is dealt with as sync
            process.exit
        }
        if (!success) {
            res.json({ success: false, message })
            return
        } else {
            res.json({ success, message })
            return
        }

    }
    res.json({ success: false, message: "UnAuthorized" })
}

module.exports.retrieve = (req, res) => {
    let test = false
    if (req.originalUrl.slice(1, 5) == 'test') {
        test = true
    }

    const { jwt } = req.header
    const { isAuthorized } = Auth.AuthorizeUser(jwt)
    if (isAuthorized) {
        const { author_email, group_id } = res.body

        if (group_id) {
            // return all posts from a given group
            const postList = Post.fetchAll({ group_id, test })

        } else if (author_email) {
            // return all posts from a given person
            const postList = Post.fetchAll({ author_email, test })
        } else {
            const postList = Post.fetchAll()
        }
        console.log("postList => \n" + postList)
        res.status(200)
        res.json({ postList })

    }
}




