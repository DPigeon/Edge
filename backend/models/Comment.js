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

        let queryStr = ""

        if (newComment.post_id == null || newComment.post_id == "") {
            newComment.post_id == null
        }
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

}
module.exports = Comment
