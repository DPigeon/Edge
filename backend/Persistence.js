const User = require('./User')
const mysql = require('mysql')
const syncMysql = require('sync-mysql')

// ----------------------------------------------------------------------------------------
// PLEASE DO NOT TOUCH THESE CONSTANTS
// THEY ARE USED TO CONNECT TO THE HOSTED DATABASE
const dbIp = '18.221.83.136'
const dbRootUser = 'root'
const dbUser = 'soen341'
const dbName = 'platform341'
const dbRootPass = 'ribalestbeau'
const dbUserPass = 'ilovedocker'

const dbConn = mysql.createConnection({
    host: dbIp,
    user: 'root',
    password: 'ribalestbeau',
    database: 'platform341'
});

const dbSyncConn = syncMysql.createConnection({
    user: dbRootUser,
    password: dbRootPass,
    database: dbName
})
// ----------------------------------------------------------------------------------------

class Persistence {
    static RegisterUser(user) {
        // Try to enter a new record in the database.
        try {
            const queryResult = dbSyncConn.query(
                `INSERT INTO user VALUES( ${this.userToQuery(user)} )`)
            console.log(queryResult);
        } catch (error) {
            console.log("error => \n"+error);
            console.log("error.code => \n"+error.code);
            return { success: false, message: error.code }
        }
        return { success: true }
    }

    // Return a string representing the query format of the object's values.
    // This string should be passed in the values() of an sql query.
    static userToQuery(user){
        return `'${user.firstname}','${user.lastname}','${user.email}','${user.password}',${user.isteacher}`
    }
}

module.exports = Persistence
