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

}

module.exports = GroupController;
