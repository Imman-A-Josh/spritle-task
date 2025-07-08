const express = require('express');
const router = express.Router();
const freshdeskController = require('../controller/freshdesk.controller');

router.get('/tickets', freshdeskController.getFreshdeskTickets);

router.post('/create-ticket', freshdeskController.createTicket);

router.get('/ticket-conversations/:ticket_id', freshdeskController.getTicketConversation);

module.exports = router;
