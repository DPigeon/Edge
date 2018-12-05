const Thread = require('../models/Thread');
const Message = require('../models/Message');

class MessageController {

    static create(req, res) {
        let message = new Message(req.body.thread_id, req.body.sender, req.body.receiver, req.body.data);

        if (!message.thread_id || !message.sender || !message.receiver || !message.data) {
            return res.status(400).json({error: "Please provide valid data"});
        }

        let query = Message.create(message);

        if (!query.success) {
            return res.send(query.error);
        }

        res.status(201).json(query.message);
    }

    static getById(req, res) {

        let test = false;
        if (req.originalUrl.slice(1, 5) == 'test') {
            test = true;
        }

        if (!req.params.messageId) {
            return res.status(400).json({error: "Please provide a message id in the route"});
        }

        let query = Message.getById(req.params.messageId, test);

        if (!query.success) {
            return res.send(query.error);
        }

        res.json(query.message);
    }

    updateById(req, res) {
        // NOT NEEDED FOR NOW
    }

    deleteById(req, res) {
        // NOT NEEDED FOR NOW
    }

}

module.exports = MessageController;
