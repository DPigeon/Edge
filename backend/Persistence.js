const User = require('./User')
const mysql = require('sync-mysql')
// ----------------------------------------------------------------------------------------
// PLEASE DO NOT TOUCH THESE CONSTANTS
// THEY USE TO CONNECT TO THE HOSTED DATABASE
const dbIp = '18.221.83.136'
const dbRootUser = 'root'
const dbUser = 'soen341'
const dbName = 'platform341'
const dbRootPass = 'ribalestbeau'
const dbUserPass = 'ilovedocker'

const dbConn = new mysql({
    host: dbIp,
    user: dbUser,
    password: dbUserPass,
    database: dbName
})
class Persistence {

}
