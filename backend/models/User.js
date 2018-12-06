const db = require('../db');

// Represents a Parent or a Teacher account
class User {
    constructor({ firstname, lastname, email, password, is_teacher, profile_pic, cover_pic }) {
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.password = password
        this.is_teacher = is_teacher
        this.profile_pic = profile_pic
        this.cover_pic = cover_pic
    }

    static getAll() {
        let users = null;

        console.log('Getting all users');

        try {
            const queryResult = db.SyncConn.query(`SELECT * FROM user`);
            users = queryResult;
        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return { success: false, error: error };
        }

        users.forEach((user) => {
            delete user.password;
        });

        console.log(users);
        console.log('---------------------------------------');
        return { success: true, users: users };
    }

    static modifyPassword(userId, newPassword) {

        console.log('Modifying password for : ', userId);

        try {
            const queryResult = db.SyncConn.query(`UPDATE user SET password = '${newPassword}' WHERE email = '${userId}'`);
        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return { success: false, error: error };
        }

        return { success: true };
    }

    static update(userId, firstname, lastname) {
        console.log('Updating user : ', userId);

        try {
            const queryResult = db.SyncConn.query(`UPDATE user SET firstname = '${firstname}', lastname = '${lastname}' WHERE email = '${userId}'`);
        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return { success: false, error: error };
        }

        return { success: true };
    }

    static addPic({ email, profile_pic, cover_pic, imageName, test }) {
        let connection = db.SyncConn
        if (test) {
            connection = db.TestSynConn
        }

        let queryStr = null
        if (!email) {
            return {
                success: false,
                message: "you did not provide an email"
            }
        }
        else if (!profile_pic && !cover_pic) {
            return {
                success: false,
                message: "you did not provide any of profile_pic or cover_pic"
            }
        }
        else if (profile_pic && !cover_pic) {
            queryStr =
                `UPDATE user ` +
                `SET profile_pic = '${imageName}' ` +
                `WHERE email = '${email}'`
        }
        else if (!profile_pic && cover_pic) {
            queryStr =
                `UPDATE user ` +
                `SET cover_pic = '${imageName}' ` +
                `WHERE email ='${email}'`
        }

        let result
        try {
            result = connection.query(queryStr)
        } catch (error) {
            console.log(`sql query error => ${error}`)
            return {
                success: false,
                message: error.message
            }
        }
        console.log(`sql query result => ${JSON.stringify(result)}`)
        return {
            success: true,
            message: 'picture succesfully added'
        }
    }
}

module.exports = User
