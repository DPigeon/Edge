const Thread = require('../models/Thread');

class ThreadController {

    static create(req, res) {

        let thread = new Thread(req.body.sender, req.body.receiver, req.body.name);

        if (!thread.sender || !thread.receiver || !thread.name) {
            return res.status(400).json({error: "Please provide valid data"});
        }

        let query = Thread.create(thread);

        if (!query.success) {
            return res.send(query.error);
        }

        res.status(201).json(query.thread);
    }

    static getById(req, res) {
        if (!req.params.threadId) {
            return res.status(400).json({error: "Please provide a valid thread id in the route"});
        }

        let query = Thread.getById(req.params.threadId);

        if (!query.success) {
            return res.send(query.error);
        }

        res.json(query.thread);
    }

    static getAll(req, res) {

        // TODO :: Filter by user id/email im headers

        let query = Thread.getAll();

        if (!query.success) {
            return res.send(query.error);
        }

        res.json(query.threads);
    }

    updateById(req, res) {
        // NOT NEEDED FOR NOW
    }

    static getAllMessagesById(req, res) {
        if (!req.params.threadId) {
            return res.status(400).json({error: "Please provide a valid thread id in the route"});
        }

        let query = Thread.getAllMessagesById(req.params.threadId);

        if (!query.success) {
            return res.send(query.error);
        }

        res.json(query.messages);
    }

}

module.exports = ThreadController;
