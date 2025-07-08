const express = require('express');
const router = express.Router();
const freshdeskController = require('../controller/freshdesk.controller');

router.get('/tickets', freshdeskController.getFreshdeskTickets);

router.post('/create-ticket', freshdeskController.createTicket);

module.exports = router;
