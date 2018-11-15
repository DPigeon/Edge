//Author: used Anas' logic from group requests

const Notification = require("../models/Notification");

class NotificationController {
    static create(req, response) {
        let notification = new Notification(req.body.user_id, req.body.thread_id);
        if (!notification.user_id || !notification.thread_id) {
            return response.status(400).json({
                error: "Please provide valid data"
            });
        }
        let query = Notification.create(notification);
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
        if (!req.params.notificationId) {
            return response.status(400).json({
                error: "Please provide a valid notification id in the route"
            });
        }
        let query = Notification.dismissNotification(req.params.notificationId);
        if (!query.success) {
            return response.send(query.error);
        }
        response.json({
            success: true
        });
    }
}

module.exports = NotificationController;
