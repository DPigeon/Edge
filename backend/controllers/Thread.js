const Thread = require('../models/Thread');

class ThreadController {

    create(req, res) {
        let thread = new Thread(req.body.from, req.body.to, req.body.name);

        if (!thread.from || !thread.to || !thread.name) {
            return res.status(400).json({error: "Please provide valid data"});
        }

        console.log("from : " + thread.from);
        console.log("to : " + thread.to);
        console.log("data : " + thread.name);

        Thread.create(thread, (err, thread) => {
            if (err) {
                return res.send(err);
            }

            res.status(201).json(thread);
        });

    }

    getById(req, res) {
        if (!req.params.threadId) {
            return res.status(400).json({error: "Please provide a thread Id"});
        }

        Thread.getById(req.params.threadId, (err, threads) => {
            if (err) {
                return res.send(err);
            }

            res.json(threads);
        });
    }

    getAll(req, res) {
        Thread.getAll((err, threads) => {
            if (err) {
                return res.send(err);
            }

            res.json(threads);
        });
    }

    updateById(req, res) {
        let thread = new Thread(req.body.from, req.body.to, req.body.name);

        if (!thread.name) {
            return res.status(400).json({error: "Please provide valid data"});
        }

        if (!req.params.threadId) {
            return res.status(400).json({error: "Please provide a thread id"});
        }

        Thread.updateById(req.params.threadId, thread, (err, thread) => {
            if (err) {
                return res.send(err);
            }

            res.json({message: "Thread successfully updated"});
        });
    }

    getAllMessagesById(req, res) {
        if (!req.params.threadId) {
            return res.status(400).json({error: "Please provide a thread id"});
        }

        Thread.getAllMessagesById(req.params.threadId, (err, messageList) => {
            if (err) {
                return res.send(err);
            }

            res.json(messageList);
        });
    }

}

module.exports = ThreadController;
