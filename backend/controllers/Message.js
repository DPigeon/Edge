const Thread = require('../models/Thread');
const Message = require('../models/Message');

class MessageController {

    create(req, res) {
        let message = new Message(req.body.thread_id, req.body.from, req.body.to, req.body.data);

        if (!message.thread_id || !message.from || !message.to || !message.data) {
            return res.status(400).json({error: "Please provide valid data"});
        }

        console.log("thread_id : " + message.thread_id);
        console.log("from : " + message.from);
        console.log("to : " + message.to);
        console.log("data : " + message.data);

        Message.create(message, (err, message) => {
            if (err) {
                return res.send(err);
            }

            Thread.addMessageById(message.thread_id, message.id, (err, thread) => {
                if (err) {
                    return res.send(err);
                }
            });

            res.status(201).json(message);
        });
    }

    getById(req, res) {
        if (!req.params.messageId) {
            return res.status(400).json({error: "Please provide a message Id"});
        }

        Message.getById(req.params.messageId, (err, message) => {
            if (err) {
                return res.send(err);
            }

            res.json(message);
        })
    }

    updateById(req, res) {
        let message = new Message(req.body.from, req.body.to, req.body.data);

        if (!message.data) {
            return res.status(400).json({error: "Please provide valid data"});
        }

        if (!req.params.messageId) {
            return res.status(400).json({error: "Please provide a message Id"});
        }

        Message.updateById(req.params.messageId, message, (err, message) => {
            if (err) {
                return res.send(err);
            }

            res.json({message: 'Message successfully updated'});
        });
    }

    deleteById(req, res) {
        if (!req.params.messageId) {
            return res.status(400).json({error: "Please provide a message Id"});
        }

        Message.deleteById(req.params.messageId, (err, message) => {
            if (err) {
                return res.send(err);
            }

            res.json({message: 'Message successfully deleted'});
        });
    }

}

module.exports = MessageController;
