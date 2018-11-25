const db = require('../db');

class Thread {

    constructor(sender, receiver, name) {
        this.sender = sender;
        this.receiver = receiver;
        this.name = name;
    }

    static threadToQuery(thread) {
        return `'${thread.sender}', '${thread.receiver}', '${thread.name}'`;
    }

    static create(thread) {

        console.log('Creating thread with values : ', thread);

        try {
            const queryResult = db.SyncConn.query(`INSERT INTO threads (sender, receiver, name) VALUES(${this.threadToQuery(thread)})`);
            thread.id = queryResult.insertId;
        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return { success: false, error: error };
        }

        console.log(thread);
        console.log('---------------------------------------');
        return { success: true, thread: thread };
    }

    static getById(threadId) {

        let thread = null;

        console.log('Getting thread with id : ', threadId);

        try {
            const queryResult = db.SyncConn.query(`SELECT * FROM threads WHERE id = ${threadId}`);
            thread = queryResult[0];
        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return { success: false, error: error };
        }

        console.log(thread);
        console.log('---------------------------------------');
        return { success: true, thread: thread };
    }

    static getAll(userId) {

        let threads = null;

        console.log('Getting all threads');

        try {
            const queryResult = db.SyncConn.query(`SELECT * FROM threads WHERE sender = '${userId}' OR receiver = '${userId}'`);
            threads = queryResult;
        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return { success: false, error: error };
        }

        console.log(threads);
        console.log('---------------------------------------');
        return { success: true, threads: threads };
    }

    static updateById(threadId, thread, result) {

        // NOT NEEDED YET

    }

    static getAllMessagesById(threadId) {

        let messages = null;

        console.log('Getting all messages for thread of id : ', threadId);

        try {
            const queryResult = db.SyncConn.query(`SELECT * FROM messages WHERE thread_id = ${threadId}`);
            messages = queryResult;
        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return { success: false, error: error };
        }

        console.log(messages);
        console.log('---------------------------------------');
        return { success: true, messages: messages };
    }
}

module.exports = Thread;
