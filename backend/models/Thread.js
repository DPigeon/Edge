const sync = require('synchronize');
const db = require('../Persistence');
const Message = require('../models/Message');

class Thread {

    constructor(from, to, name) {
        this.from = from;
        this.to = to;
        this.name = name;
        this.messages = JSON.stringify([]);
    }

    static create(thread, result) {

        db.query('INSERT INTO threads SET ?', thread,

            function(err, res) {
            if (err) {
                console.log("Error => ", err);
                result(err, null);
            } else {
                console.log("Created thread with ID => " + res.insertId);
                thread.id = res.insertId;
                console.log(thread);
                console.log("-----------------------------------------");
                result(null, thread);
            }});

    }

    static getById(threadId, result) {

        db.query('SELECT * FROM threads WHERE id = ?', threadId,

            function(err, res) {
            if (err) {
                console.log("Error => ", err);
                result(err, null);
            } else {
                console.log("Got thread by ID => ", threadId);
                console.log(res[0]);
                console.log("-----------------------------------------");
                result(null, res[0]);
            }});
    }

    static getAll(result) {

        db.query('SELECT * FROM threads',

            function(err, res) {
            if (err) {
                console.log("Error => ", err);
                result(err, null);
            } else {
                console.log("Got list of threads");
                console.log(res);
                console.log("-----------------------------------------");
                result(null, res);
            }});
    }

    static updateById(threadId, thread, result) {

        db.query("UPDATE threads SET name = ? WHERE id = ?", [thread.name, threadId],

            function(err, res) {
            if (err) {
                console.log("error =>", err);
                result(err, null);
            } else {
                console.log("Updated thread with ID => ", threadId);
                console.log(thread);
                console.log("-----------------------------------------");
                result(null, res);
            }});
    }

    static addMessageById(threadId, messageId, result) {

        Thread.getById(threadId, (err, thread) => {
            if (err) {
                result(err, null);
            } else {
                let messages = JSON.parse(thread.messages);
                messages.push(messageId);
                thread.messages = JSON.stringify(messages);

                db.query("UPDATE threads SET messages = ? WHERE id = ?", [thread.messages, threadId],

                    function(err, res) {
                    if (err) {
                        console.log("error => ", err);
                        result(err, null);
                    } else {
                        console.log("Added message ", messageId, " to thread with ID => ", threadId);
                        console.log(thread);
                        console.log("-----------------------------------------");
                        result(null, res);
                    }});
            }});
    }

    static getAllMessagesById(threadId, result) {

        Thread.getById(threadId, (err, thread) => {
            sync.fiber(() => {
                if (err) {
                    result(err, null);
                } else {
                    let messageList = [];
                    let messages = JSON.parse(thread.messages);

                    messages.forEach((messageId) => {

                        let message = sync.await(db.query('SELECT * FROM messages WHERE id = ?', messageId, sync.defer()));
                        messageList.push(message[0]);
                    });

                    console.log("Got message list of thread with ID => ", threadId);
                    console.log(messageList);
                    console.log("-----------------------------------------");

                    result(null, messageList);
                }
            });
        });
    }
}

module.exports = Thread;
