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

module.exports.retrieveByUser = (req, res) => {
    const { test, isAuthorized } = determineTestAndAuth(req)
    console.log("test =>",test)
    console.log ("isAuthorized =>",isAuthorized)
    if (isAuthorized) {

        author_email = req.params.author_email
        console.log("req.params.author_email => " + author_email)

        if (author_email) { // return all posts from a given person
            const { success, postList } = Post.fetchAll({ author_email, test })
            console.log("success =>", success)
            console.log("postList => \n" + postList)
            return res.status(200).json({success, postList })
        }
        return res.status(400).json({ error: "Have to provide author_email" })

    }
}
module.exports.retrieveAll = (req, res) => {
    const { test, isAuthorized } = determineTestAndAuth(req)
    if (isAuthorized) {
        const { success, postList } = Post.fetchAll({ test })
        console.log("success =>", success)
        console.log("postList =>\n", postList)
        return res.status(200).json({ success, postList })

    }
    return res.status(403)

}

const determineTestAndAuth = (req) => {
    let test = false
    if (req.originalUrl.slice(1, 5) == 'test') {
        test = true
    }

    const { jwt } = req.header
    const { isAuthorized } = Auth.AuthorizeUser(jwt)
    return { test, isAuthorized }
}

// for another method
// if (group_id) {
    // return all posts from a given group
    // const postList = Post.fetchAll({ group_id, test })
//
// }
