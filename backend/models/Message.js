const db = require('../Persistence');

class Message {

    constructor(thread_id, from, to, data) {
        this.thread_id = thread_id;
        this.from = from;
        this.to = to;
        this.data = data;
    }

    static create(message, result) {

        db.query('INSERT INTO messages SET ?', message,

            function (err, res) {
            if (err) {
                console.log("Error => ", err);
                result(err, null);
            } else {
                console.log("Created message with ID => " + res.insertId);
                message.id = res.insertId;
                console.log(message);
                console.log("-----------------------------------------");
                result(null, message);
            }});
    }

    static getById(messageId, result) {

        db.query('SELECT * FROM messages WHERE id = ?', messageId,

            function(err, res) {
            if (err) {
                console.log("Error => ", err);
                result(err, null);
            } else {
                console.log("Got message with ID => ", messageId);
                console.log(res[0]);
                console.log("-----------------------------------------");
                result(null, res[0]);
            }});
    }

    static updateById(messageId, message, result) {

        db.query("UPDATE messages SET data = ? WHERE id = ?", [message.data, messageId],

            function(err, res) {
            if (err) {
                console.log("Error => ", err);
                result(err, null);
            } else {
                console.log("Updated message with ID => ", messageId);
                console.log(message);
                console.log("-----------------------------------------");
                result(null, res);
            }});
    }

    static deleteById(messageId, result) {

        // TODO DELETE INSIDE THREAD

        db.query("DELETE FROM messages WHERE id = ?", [messageId],

            function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

}

module.exports = Message;
