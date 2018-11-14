const UserController = require("./controllers/User");
// const User = require('./User')
const jwt = require("jsonwebtoken");

const superSecret = "string used to sign jwt";

class AuthService {
    // Returns success, message, or error in the case that the error is related to a database issue.
    // If success == true, then check the token field
    // else
    static AuthenticateUser(email, password) {
        const { success, error, user } = UserController.retrieveUser({ email, password })
        const result = { success, error, user }
        console.log("result from 'AuthenticateUser => ", result);
        if (error != undefined) {
            return {
                success: false,
                error
            };
        }
        if (success == false) {
            return {
                success,
                message: "wrong username and password"
            };
        } else {
            const token = jwt.sign({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                is_teacher: user.is_teacher
            },
                superSecret,
                { expiresIn: 60 * 60 })
            return { success: true, token }
        }
    }

    static AuthorizeUser(token) {
        // if (token == null || token == undefined) {
            // return { isAuthorized: false }
        // }
        // try {
            // const decoded = jwt.verify(token, superSecret)
        // } catch (error) {
            // return {isAuthorized:false}
        // }
        // return {isAuthorized: true, token: decoded}


        // for now accept all tokens in order not to break the whole API
        return {isAuthorized: true}
    }

}



module.exports = AuthService
