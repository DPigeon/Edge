const db = require('../db');

// Represents a Parent or a Teacher account
class User{
    constructor({firstname,lastname,email,password, is_teacher}){
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.password = password
        this.is_teacher = is_teacher
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

        return { success:true };
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

        return { success:true };
    }
}

module.exports = User
