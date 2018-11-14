const db = require('../db')
const Comment = require('./Comment')


class Post {
    constructor(author_email, data, group_id) {
        this.author_email = author_email
        this.data = data
        this.group_id = group_id
    }

    // Save a single post into DB
    static persist({ newPost, test }) {
        let connection = db.SyncConn
        if (test) {
            connection = db.TestSynConn
        }

        let queryStr = ""
        if (newPost.group_id == null || newPost.group_id == undefined | newPost.group_id == "") {
            newPost.group_id = null
            queryStr =
                `INSERT INTO posts (author_email, data, group_id) ` +
                `VALUES('${newPost.author_email}','${newPost.data}', NULL)`
        } else {
            queryStr =
                `INSERT INTO posts (author_email,data,group_id) ` +
                `VALUES(${db.ObjectToQuery(newPost)})`
        }
        console.log("query string => \n" + queryStr)
        let result
        try {
            result = connection.query(queryStr)
            console.log("query result => " + result)
        } catch (error) {
            console.log("Error: query result => " + error)
            return { success: false, message: error }
        }
        return { success: true, message: "Post successfully saved to database" }

    }

    // Return all posts
    static fetchAll({ author_email, group_id, test }) {
        let connection = db.SyncConn
        if (test) {
            console.log("connection to test db")
            connection = db.TestSynConn
        }
        console.log("connection =>", connection)

        let queryStr = null

        // if group_id is provided, assume that post belongs to a certain group
        if (group_id != null && group_id != undefined && group_id != "") {
            console.log("group_id =>", group_id)
            // select posts related to a group
            queryStr = `SELECT * FROM posts WHERE group_id=${group_id}`
        }
        // group_id not provided then assume that post belongs to the shared dashboard
        else if (author_email) {
            // select posts related to a user
            queryStr = `SELECT * FROM posts WHERE author_email='${author_email}' AND group_id IS NULL`
        } else {
            queryStr = `SELECT * from posts`
        }
        let postList
        try {
            console.log("queryStr =>", queryStr)
            postList = connection.query(queryStr)
        } catch (error) {
            return { success: false, message: error }
        }
        if (postList) {
            console.log("postList (from within model)=>\n",postList);
            for (let i = 0; i < postList.length; i++) {
                let post_id = postList[i].id
                console.log("post_id =>", post_id);
                let { commentList } = Comment.fetchAllFromPostId({ post_id, test })
                postList[i].commentList = commentList
                console.log("commentList =>\n" + commentList)
            }
            return { success: true, postList }
        }
        return { success: false, message: "postList is undefined" }
    }
}
module.exports = Post
