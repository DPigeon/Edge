const Like = require('../models/Like')
const BaseController = require('../Controller')

module.exports.create = (req, res) => {
    console.log("POST request at " + req.originalUrl)
    console.log("Entering LikeController.create handler")

    const { test, isAuthorized } = BaseController.determineTestAndAuth(req)
    console.log("test =>", test)

    console.log("isAuthorized =>", isAuthorized)

    if (isAuthorized) {
        const { author_email, post_id, dislike } = req.body
        const newLike = new Like(author_email, post_id, dislike)

        const { success, message } = Like.persist({ newLike, test })

        let statusCode = 400
        if (success) {
            statusCode = 200
        }
        return res.status(statusCode).json({ success, message })
    }
    return res.status(403).json({ success: false, message: "unauthorized" })
}

module.exports.retrieve = (req, res) => {
    console.log("GET request at " + req.originalUrl)
    console.log("Entering LikeController.retrieve handler")

    const { test, isAuthorized } = BaseController.determineTestAndAuth(req)
    console.log("test =>", test)

    console.log("isAuthorized =>", isAuthorized)


    if (isAuthorized) {
        let { success, message, likeList } = Like.fetch({ test })
        if (success) {
            return res.status(200).json({ success, likeList })
        }
        return res.status(400).json({ success, message })
    }
    return res.status(403).json({ success, message: 'unauthorized' })

}
