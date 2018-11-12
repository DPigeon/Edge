const Group = require('../models/Group');

class GroupController {

    static create(req, res) {

        let group = new Group(req.body.name);

        if (!group.name) {
            return res.status(400).json({error: "Please provide valid data"});
        }

        let query = Group.create(group);

        if (!query.success) {
            return res.send(query.error);
        }

        res.status(201).json(query.group);
    }

    static getById(req, res) {
        if (!req.params.groupId) {
            return res.status(400).json({error: "Please provide a valid group id in the route"});
        }

        let query = Group.getById(req.params.groupId);

        if (!query.success) {
            return res.send(query.error);
        }

        res.json(query.group);
    }

    static getAll(req, res) {
        let query = Group.getAll();

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
        if (!req.params.groupId) {
            return res.status(400).json({error: "Please provide a valid group id in the route"});
        }

        let query = Group.getMembers(req.params.groupId);

        if (!query.success) {
            return res.send(query.error);
        }

        res.json(query.members);
    }
}

module.exports = GroupController;
