const db = require('../db')

class Like {
    constructor(author_email, post_id) {
        this.author_email = author_email
        this.post_id = post_id
    }

    static persist({ newLike, test }) {
        let connection = db.SyncConn
        if (test) {
            connection = db.TestSynConn
        }

        if (newLike.post_id == null || newLike.post_id == "") {
            return { success: false, message: "You did not provide a post_id" }

        } else if (newLike.author_email == null || newLike.author_email == "") {
            return { success: false, message: "You did not provide an author_email" }
        }


        const queryStr =
            `INSERT INTO likes (author_email,post_id) ` +
            `VALUES('${newLike.author_email}',${newLike.post_id})`
        console.log("queryStr => \n", queryStr)

        let result
        try {
            result = connection.query(queryStr)
            console.log("query result => " + result)
        } catch (error) {
            return { success: false, message: error }
        }
        return { success: true, message: "Like was successfully saved to database" }
    }
}
module.exports = Like
