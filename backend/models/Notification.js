//Author: used Anas' logic from group requests

const db = require("../db");

class Notification {
    constructor(user_id, thread_id, tag_id) {
        this.user_id = user_id;
        this.thread_id = thread_id;
        this.tag_id = tag_id;
    }

    static notificationToQuery(notification) {
        return `'${notification.user_id}', '${notification.thread_id}', '${notification.tag_id}'`;
    }

    static create(notification) {
        console.log("Creating a notification with values: ", notification);
        try {
            const queryResult = db.SyncConn.query(`INSERT INTO notifications (user_id, thread_id, tag_id) VALUES(${this.notificationToQuery(notification)})`);
            notification.id = queryResult.insertId;
        } catch (error) {
            console.log("Error : ", error);
            console.log("Error code : ", error.code);
            return {
                success: false,
                error: error
            };
        }
        console.log(notification);
        console.log("---------------------------------------");
        return {
            success: true,
            notification: notification
        };
    }

    static dismissNotification(notificationId) {
        let requestQuery = this.getNotification(notificationId); //You first get the notification asked
        let request = requestQuery.request; //Makes the request
        if (!requestQuery.success) {
            return requestQuery; //return if getting the notification is successed
        }
        console.log("Dismissing notification with id: ", notificationId);
        try {
            const queryResult = db.SyncConn.query(
                `DELETE FROM notifications WHERE id = ${notificationId}`
            ); //Deletes the Notification
            request.id = queryResult.deleteId;
        } catch (error) {
            console.log("Error: ", error);
            console.log("Error code: ", error.code);
            return {
                success: false,
                error: error
            };
        }
        console.log("---------------------------------------");
        return {
            success: true
        };
    }

    static getNotification(notificationId) {
        //Will be used to delete the notification afterwards
        let request = null;
        console.log(
            "Getting the notification request with id: ",
            notificationId
        );
        try {
            const queryResult = db.SyncConn.query(
                `SELECT * FROM notifications WHERE id = ${notificationId}`
            );
            request = queryResult[0];
        } catch (error) {
            console.log("Error: ", error);
            console.log("Error code: ", error.code);
            return {
                success: false,
                error: error
            };
        }
        console.log(request);
        console.log("---------------------------------------");
        return {
            success: true,
            request: request
        };
    }

    static getAllNotifications(userId) {
        //Logic: threadId will be either NULL or an integer.
        //If NULL: means it is a notification from profile walls or tags
        //If not NULL: means it is a notification from a message received

        let requests = null;
        console.log("Getting all the notifications for user with id: ", userId);
        try {
            const queryResult = db.SyncConn.query(
                `SELECT * FROM notifications WHERE user_id = '${userId}'`
            );
            requests = queryResult;
        } catch (error) {
            console.log("Error: ", error);
            console.log("Error code: ", error.code);
            return {
                success: false,
                error: error
            };
        }
        console.log(requests);
        console.log("---------------------------------------");
        return {
            success: true,
            requests: requests
        };
    }
}

module.exports = Notification;
