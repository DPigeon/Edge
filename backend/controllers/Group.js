const Group = require('../models/Group');

class GroupController {

    static create(req, res) {

        let group = new Group(req.body.name, req.body.description);

        if (!group.name || !group.description) {
            return res.status(400).json({error: "Please provide valid data"});
        }

        let query = Group.create(group);

        if (!query.success) {
            return res.send(query.error);
        }

        res.status(201).json(query.group);
    }

    static getById(req, res) {

        let test = false;
        if (req.originalUrl.slice(1, 5) == 'test') {
            test = true;
        }

        if (!req.params.groupId) {
            return res.status(400).json({error: "Please provide a valid group id in the route"});
        }

        let query = Group.getById(req.params.groupId, test);

        if (!query.success) {
            return res.send(query.error);
        }

        res.json(query.group);
    }

    static getAll(req, res) {

        let test = false;
        if (req.originalUrl.slice(1, 5) == 'test') {
            test = true;
        }

        let query = Group.getAll(test);

        if (!query.success) {
            return res.send(query.error);
        }

        res.json(query.groups);
    }

    static addMemberToGroup(req, res) {
        if (!req.params.groupId) {
            return res.status(400).json({error: "Please provide a valid group id in the route"});
        }

        if (!req.body.user_id) {
            return res.status(400).json({error: "Please provide valid data"});
        }

        let query = Group.addMember(req.params.groupId, req.body.user_id, req.body.admin);

        if (!query.success) {
            return res.send(query.error);
        }

        res.json({success: true})
    }

    static getMembers(req, res) {

        let test = false;
        if (req.originalUrl.slice(1, 5) == 'test') {
            test = true;
        }

        if (!req.params.groupId) {
            return res.status(400).json({error: "Please provide a valid group id in the route"});
        }

        let query = Group.getMembers(req.params.groupId, test);

        if (!query.success) {
            return res.send(query.error);
        }

        res.json(query.members);
    }

    static createRequest(req, res) {
        if (!req.params.groupId) {
            return res.status(400).json({error: "Please provide a valid group id in the route"});
        }

        if (!req.body.user_id) {
            return res.status(400).json({error: "Please provide valid data"});
        }

        let query = Group.createRequest(req.params.groupId, req.body.user_id);

        if (!query.success) {
            return res.send(query.error);
        }

        res.json(query.request);
    }

    static getRequest(req, res) {
        if (!req.params.requestId) {
            return res.status(400).json({error: "Please provide a valid request id in the route"});
        }

        let query = Group.getRequest(req.params.requestId);

        if (!query.success) {
            return res.send(query.error);
        }

        res.json(query.request);
    }

    static getRequests(req, res) {
        if (!req.params.groupId) {
            return res.status(400).json({error: "Please provide a valid group id in the route"});
        }

        let query = Group.getRequests(req.params.groupId);

        if (!query.success) {
            return res.send(query.error);
        }

        res.json(query.requests);
    }

    static processRequest(req, res) {
        if (!req.params.requestId) {
            return res.status(400).json({error: "Please provide a valid request id in the route"});
        }

        let query = Group.processRequest(req.params.requestId, req.body.accept);

        if (!query.success) {
            return res.send(query.error);
        }

        res.json({success: true});
    }

}

module.exports = GroupController;
