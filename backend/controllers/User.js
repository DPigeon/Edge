const User = require('../models/User');
const db = require('../db')


class UserController {

    static RegisterUser(user) {
        // Try to enter a new record in the database.
        try {
            const queryResult = db.SyncConn.query(
                `INSERT INTO user VALUES( ${this.userToQuery(user)} )`)
            console.log(queryResult);
        } catch (error) {
            console.log("error => \n" + error);
            console.log("error.code => \n" + error.code);
            return { success: false, message: error.code }
        }
        return { success: true }
    }

    static retrieveUser({ email, password }) {
        let storedUser = null
        try {
            // returns an array. We know that there will only be a single element
            // because the email is unique
            console.log("Query, ", `SELECT * FROM user WHERE email='${email}' AND password='${password}'`);
            storedUser = db.SyncConn.query(
                `SELECT * FROM user WHERE email='${email}' AND password='${password}'`
            )
            console.log("storedUser =>", storedUser[0])
        } catch (error) {
            console.log(error)
            return {error,success:false}
        }
        if (storedUser[0] == null) {
            return { success: false, message: "The email/password combination is incorrect" }
        }
        // else, the user must exist
        return{success: true, user : storedUser[0]}

    }


    // Return a string representing the query format of the object's values.
    // This string should be passed in the values() of an sql query.
    static userToQuery(user) {
        let isTeacher = 0
        if (user.is_teacher == true){
            isTeacher = 1
        }
        return `'${user.firstname}','${user.lastname}','${user.email}','${user.password}',${isTeacher}`
    }

    static getAll(req, res) {

        let query = User.getAll();

        if (!query.success) {
            return res.send(query.error);
        }

        res.json(query.users);
    }

}

module.exports = UserController;
