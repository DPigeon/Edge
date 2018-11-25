const db = require('../db')

class Like {
    constructor(author_email, post_id, dislike) {
        this.author_email = author_email
        this.post_id = post_id
        this.dislike = false
        if (dislike == true) {
            this.dislike = true
        }
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
            `INSERT INTO likes (author_email,dislike,post_id) ` +
            `VALUES('${newLike.author_email}','${newLike.dislike}',${newLike.post_id})`
        // console.log("queryStr => \n", queryStr)

        let result
        try {
            result = connection.query(queryStr)
            // console.log("query result => " + result)
        } catch (error) {
            return { success: false, message: error }
        }
        if (newLike.dislike) {
            return { success: true, message: "Dislike was successfully saved to database" }
        }
        return { success: true, message: "Like was successfully saved to database" }
    }

    static fetch({ post_id, test }) {
        let connection = db.SyncConn
        if (test) {
            // console.log("connection to test db");
            connection = db.TestSynConn
        }

        let queryStr = `SELECT * FROM likes`

        if (post_id) {
            queryStr += ` WHERE post_id=${post_id}`
        }

        let likeList

        try {
            likeList = connection.query(queryStr)

        }catch (error){
            console.log(error)
            return {status:false,message:error}
        }
        return {success:true,likeList}
    }

}
module.exports = Like
