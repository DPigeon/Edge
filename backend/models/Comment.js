const db = require('../db')

class Comment {
    constructor(author_email, data, post_id) {
        this.author_email = author_email
        this.data = db.InsertEscapeCharacters(data)
        this.post_id = post_id
    }

    static persist({ newComment, test }) {
        let connection = db.SyncConn
        if (test) {
            connection = db.TestSynConn
        }

        if (newComment.author_email == undefined || newComment.author_email == "") {
            return {
                success: false,
                message: 'You did not provide an "author_email" field for this comment'
            }
        } else if (newComment.post_id == null || newComment.post_id == "") {
            return {
                success: false,
                message: 'You did not provide a "post_id" field for this comment'
            }
        }

        let queryStr = ""
        queryStr =
            `INSERT INTO comments (author_email, data,post_id) ` +
            `VALUES(${db.ObjectToQuery(newComment)})`
        console.log("queryStr => \n" + queryStr)

        let result
        try {
            result = connection.query(queryStr)
            console.log("query result => " + result);
        } catch (error) {
            console.log("Error: query result => " + error)
            return { success: false, message: error }
        }
        return { success: true, message: "Comment successfully saved to database" }
    }

    static fetchAllFromPostId({ post_id, test }) {
        let connection = db.SyncConn
        if (test) {
            connection = db.TestSynConn
        }
        console.log("connection =>", connection)

        let queryStr = null
        if (post_id) {
            console.log("post_id => " + post_id)
            queryStr = `SELECT * FROM comments WHERE post_id=${post_id}`
        } else {
            return { success: false, message: "You did not provide a post_id" }
        }
        try {
            console.log("queryStr =>", queryStr)
            const commentList = connection.query(queryStr)
            return { success: true, commentList }
        } catch (error) {
            return { success: false, message: error }
        }
    }

}
module.exports = Comment
