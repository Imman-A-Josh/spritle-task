const express = require('express');
const webhookRouter = require('../controller/webhook.controller');
const router = express.Router();

router.post('/freshdesk-webhook', webhookRouter.InsertWebhooks)

router.get('/logs', webhookRouter.WebhookLogs);

module.exports = router