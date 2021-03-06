const db = require('../db');

class Message {

    constructor(thread_id, sender, receiver, data) {
        this.thread_id = thread_id;
        this.sender = sender;
        this.receiver = receiver;
        this.data = data;
    }

    static messageToQuery(message) {
        return `${message.thread_id}, '${message.sender}', '${message.receiver}', '${message.data}'`;
    }

    static create(message) {

        console.log('Creating message with values : ', message);

        try {
            const queryResult = db.SyncConn.query(`INSERT INTO messages (thread_id, sender, receiver, data) VALUES(${this.messageToQuery(message)})`);
            message.id = queryResult.insertId;
        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return { success: false, error: error };
        }

        console.log(message);
        console.log('---------------------------------------');
        return { success: true, message: message };
    }

    static getById(messageId, test) {

        let message = null;

        console.log('Getting message with id : ', messageId);

        try {
            if (test) {
                const queryResult = db.TestSynConn.query(`SELECT * FROM messages WHERE id = ${messageId}`);
                message = queryResult[0];
            } else {
                const queryResult = db.SyncConn.query(`SELECT * FROM messages WHERE id = ${messageId}`);
                message = queryResult[0];
            }

        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return { success: false, error: error };
        }

        console.log(message);
        console.log('---------------------------------------');
        return { success: true, message: message };
    }

    static updateById(messageId, message, result) {
        // NOT NEEDED FOR NOW
    }

    static deleteById(messageId, result) {
        // NOT NEEDED FOR NOW
    }

}

module.exports = Message;
