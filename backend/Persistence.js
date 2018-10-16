const User = require('./User')
const mysql = require('mysql')
// ----------------------------------------------------------------------------------------
// PLEASE DO NOT TOUCH THESE CONSTANTS
// THEY USE TO CONNECT TO THE HOSTED DATABASE
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

module.exports = dbConn;

class Persistence {

}
