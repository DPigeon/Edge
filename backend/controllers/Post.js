const Post = require('../models/Post')
const BaseController = require('../Controller')


module.exports.create = (req, res) => {
    const {test,isAuthorized} = BaseController.determineTestAndAuth(req)
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
    const { test, isAuthorized } = BaseController.determineTestAndAuth(req)
    console.log("test =>",test)
    console.log ("isAuthorized =>",isAuthorized)
    if (isAuthorized) {

        author_email = req.params.author_email
        console.log("req.params.author_email => " + author_email)

        if (author_email) { // return all posts from a given person
            const { success, postList } = Post.fetchAll({ author_email, test })
            console.log("success =>", success)
            // console.log("postList (from within controller) => \n" + postList)
            return res.status(200).json({success, postList })
        }
        return res.status(400).json({ error: "Have to provide author_email" })

    }
}
module.exports.retrieveAll = (req, res) => {
    const { test, isAuthorized } = BaseController.determineTestAndAuth(req)
    if (isAuthorized) {
        const { success, postList } = Post.fetchAll({ test })
        console.log("success =>", success)
        // console.log("postList =>\n", postList)
        if(success){
        return res.status(200).json({ success, postList })
        }
        return res.status(500).json({success, message:"Unable to retrieve posts"})
    }
    return res.status(403).json({success:false,message:"UnAuthorized"})

}



// for another method
// if (group_id) {
    // return all posts from a given group
    // const postList = Post.fetchAll({ group_id, test })
//
// }
