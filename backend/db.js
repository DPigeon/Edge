const syncMySQL = require('sync-mysql');

// ----------------------------------------------------------------------------------------
// PLEASE DO NOT TOUCH THESE CONSTANTS
// THEY ARE USED TO CONNECT TO THE HOSTED DATABASE
const dbHost = '18.221.83.136';
const dbRootUser = 'root';
const dbName = 'platform341';
const dbRootPass = 'ribalestbeau';

const dbSyncConn = new syncMySQL({
    host: dbHost,
    user: dbRootUser,
    password: dbRootPass,
    database: dbName
});
// ----------------------------------------------------------------------------------------

module.exports = dbSyncConn;
