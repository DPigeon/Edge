const db = require('../db');

class Group {

    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    static groupToQuery(group) {
        return `'${group.name}', '${group.description}'`;
    }

    static create(group) {

        console.log('Creating group with values : ', group);

        try {
            const queryResult = db.SyncConn.query(`INSERT INTO groups (name, description) VALUES(${this.groupToQuery(group)})`);
            group.id = queryResult.insertId;
        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return { success: false, error: error };
        }

        console.log(group);
        console.log('---------------------------------------');
        return { success: true, group: group };
    }

    static getById(groupId) {

        let group = null;

        console.log('Getting group with id : ', groupId);

        try {
            const queryResult = db.SyncConn.query(`SELECT * FROM groups WHERE id = ${groupId}`);
            group = queryResult[0];
        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return { success: false, error: error };
        }

        console.log(group);
        console.log('---------------------------------------');
        return { success: true, group: group };
    }

    static getAll() {
        let groups = null;

        console.log('Getting all groups');

        try {
            const queryResult = db.SyncConn.query(`SELECT * FROM groups`);
            groups = queryResult;
        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return { success: false, error: error };
        }

        console.log(groups);
        console.log('---------------------------------------');
        return { success: true, groups: groups };
    }

    static addMember(groupId, userId, admin) {

        console.log('Adding user with id : ', userId);
        console.log('To group with id : ', groupId);
        console.log('With admin : ', admin);

        try {
            const queryResult = db.SyncConn.query(`INSERT INTO user_groups (user_id, group_id, admin) VALUES('${userId}', '${groupId}', ${admin ? 1 : 0})`);
        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return { success: false, error: error };
        }

        console.log('---------------------------------------');
        return { success: true };
    }

    static getMembers(groupId) {

        let members = [];

        console.log('Getting all members for group with id : ', groupId);

        try {
            const queryResult = db.SyncConn.query(`SELECT * FROM user_groups WHERE group_id = ${groupId}`);
            queryResult.forEach((association) => {
                members.push({user_id: association.user_id, admin: !!association.admin});
            })
        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return { success: false, error: error };
        }

        console.log(members);
        console.log('---------------------------------------');
        return { success: true, members: members };
    }

    static createRequest(groupId, userId) {

        let request = { user_id: userId, group_id: groupId };

        console.log('Creating an addition request for user of id : ', userId);
        console.log('Into group of id : ', groupId);

        try {
            const queryResult = db.SyncConn.query(`INSERT INTO group_requests (user_id, group_id) VALUES('${userId}', '${groupId}')`);
            request.id = queryResult.insertId;
        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return { success: false, error: error };
        }

        console.log(request);
        console.log('---------------------------------------');
        return { success: true, request: request };
    }

    static getRequest(requestId) {

        let request = null;

        console.log('Getting request with id : ', requestId);

        try {
            const queryResult = db.SyncConn.query(`SELECT * FROM group_requests WHERE id = ${requestId}`);
            request = queryResult[0];
        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return { success: false, error: error };
        }

        console.log(request);
        console.log('---------------------------------------');
        return { success: true, request: request };
    }

    static getRequests(groupId) {

        let requests = null;

        console.log('Getting all requests for group with id : ', groupId);

        try {
            const queryResult = db.SyncConn.query(`SELECT * FROM group_requests WHERE group_id = ${groupId}`);
            requests = queryResult;
        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return { success: false, error: error };
        }

        console.log(requests);
        console.log('---------------------------------------');
        return { success: true, requests: requests };
    }

    static processRequest(requestId, accept) {

        let requestQuery = this.getRequest(requestId);
        let request = requestQuery.request;

        if (!requestQuery.success) {
            return requestQuery;
        }

        console.log('Processing request with id : ', requestId);
        console.log('With acceptance : ', accept);

        try {

            if (accept) {
                let memberRequest = this.addMember(request.group_id, request.user_id, false);
                if (!memberRequest.success) {
                    return memberRequest;
                }
            }

            const queryResult = db.SyncConn.query(`DELETE FROM group_requests WHERE id = ${requestId}`);

        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return { success: false, error: error };
        }

        console.log('---------------------------------------');
        return { success: true }
    }
}

module.exports = Group;
