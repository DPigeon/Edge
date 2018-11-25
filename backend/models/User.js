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
}

module.exports = User
