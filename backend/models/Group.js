const db = require('../db');

class Group {

    constructor(name) {
        this.name = name;
    }

    static groupToQuery(group) {
        return `'${group.name}'`;
    }

    static create(group) {

        console.log('Creating group with values : ', group);

        try {
            const queryResult = db.SyncConn.query(`INSERT INTO groups (name) VALUES(${this.groupToQuery(group)})`);
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

}

module.exports = Group;
