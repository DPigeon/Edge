const db = require('../db')
const Comment = require('./Comment')
const Like = require('./Like')

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
            console.log("postList (from within model)=>\n", postList);
            for (let i = 0; i < postList.length; i++) {
                let post_id = postList[i].id
                console.log("post_id =>", post_id)
                let { commentList } = fetchAllFromPostId({ post_id, test, type: 'comments' })
                let { likeList } = fetchAllFromPostId({ post_id, test, type: 'likes' })
                let { dislikeList } = fetchAllFromPostId({ post_id, test, type: 'dislikes' })
                postList[i].commentList = commentList
                postList[i].likeList = likeList
                postList[i].dislikeList = dislikeList
                console.log("commentList =>\n" + commentList)
                console.log("likeList =>\n" + likeList)
            }
            return { success: true, postList }
        }
        return { success: false, message: "postList is undefined" }
    }
}

// type is either 'comments', 'likes', or 'dislikes'
const fetchAllFromPostId = ({ post_id, test, type }) => {
    console.log("Entered fetchAllFromPostId with data:")
    console.log(`post_id: ${post_id},test: ${test},type: ${type}`)

    let connection = db.SyncConn
    if (test) {
        console.log("Test connection (from within fetchAllFromPostId)");
        connection = db.TestSynConn
    }
    console.log("connection =>", connection)

    let queryStr = null
    if (post_id) {
        if (type === 'comments') {
            queryStr = `SELECT * FROM ${type} WHERE post_id=${post_id}`
        }else{
            queryStr = `SELECT * FROM likes WHERE post_id=${post_id}`
        }
        console.log("post_id => " + post_id)
    } else {
        return { success: false, message: "You did not provide a post_id" }
    }
    try {
        console.log("queryStr =>", queryStr)
        if (type === 'comments') {
            const commentList = connection.query(queryStr)
            return { success: true, commentList }
        }
        else if (type === 'likes') {
            queryStr += ` AND dislike='false'`
            const likeList = connection.query(queryStr)
            return { success: true, likeList }
        }
        else if (type === 'dislikes') {
            queryStr += ` AND dislike='true'`
            const dislikeList = connection.query(queryStr)
            return { success: true, dislikeList }
        }
        else {
            return {
                success: false,
                message: "You provided the wrong type of list " +
                    "(either 'comments', 'likes', or 'dislikes') "
            }
        }
    } catch (error) {
        return { success: false, message: error }
    }

}



module.exports = Post
