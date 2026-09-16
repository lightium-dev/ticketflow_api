const express = require('express');
const router = express.Router();

const ticketController = require('../controllers/ticket.controller');
const validate = require('../middlewares/validate');
const { ticketSchema, statusChangeSchema } = require('../validations/ticket.validation');

router.get('/', ticketController.getAllTickets);
router.get('/:id', ticketController.getTicketById);
router.post('/', validate(ticketSchema), ticketController.createTicket);
router.put('/:id', validate(ticketSchema), ticketController.updateTicket);
router.patch('/:id/status', validate(statusChangeSchema), ticketController.changeTicketStatus);
router.delete('/:id', ticketController.deleteTicket);

module.exports = router;