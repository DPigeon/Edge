//Author: used Anas' logic from group requests

const Notification = require("../models/Notification");

class NotificationController {
    static create(req, response) {
        let notification = new Notification(req.body.name);
        if (!req.params.threadId) {
            return res.status(400).json({
                error: "Please provide a valid thread id in the route"
            });
        }
        if (!notification.name) {
            return response.status(400).json({
                error: "Please provide valid data to create a notification"
            });
        }
        if (!req.body.user_id) {
            return res.status(400).json({ error: "Please provide valid data" });
        }
        let query = Notification.createNotification(
            req.params.thread_id,
            req.body.user_id
        );
        if (!query.success) {
            return response.send(query.error);
        }
        response.status(201).json(query.notification); //sends the json, returns it
    }

    static getNotification(req, response) {
        if (!req.params.notificationId) {
            return response.status(400).json({
                error: "Please provide a valid notification id in the route"
            });
        }
        let query = Notification.getNotification(req.params.notificationId);
        if (!query.success) {
            return response.send(query.error);
        }
        response.json(query.request);
    }

    static getAllNotifications(req, response) {
        if (!req.params.userId) {
            return response.status(400).json({
                error: "Please provide a valid thread id in the route"
            });
        }
        let query = Notification.getAllNotifications(req.params.userId);
        if (!query.success) {
            return response.send(query.error);
        }
        response.json(query.requests);
    }

    static dismissNotification(req, response) {
        if (!req.params.threadId) {
            return response.status(400).json({
                error: "Please provide a valid notification id in the route"
            });
        }
        let query = Notification.dismissNotification(req.params.notificationId);
        if (!query.success) {
            return response.send(query.error);
        }
        response.json({ success: true });
    }
}

module.exports = NotificationController;
