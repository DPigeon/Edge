const express = require('express');
const router = express.Router();

const MessageController = require('../controllers/Message');
const messageController = new MessageController;
// TODO LATER USE THIS FILE
router.post('/messages', messageController.create);
router.get('/messages/:messageId', messageController.getById);

module.exports = router;
