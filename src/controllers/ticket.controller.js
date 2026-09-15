const ticketService = require('../services/ticket.service');

async function getAllTickets(req, res, next) {
  try {
    const tickets = await ticketService.getAllTickets();
    res.status(200).json(tickets);
  } catch (err) {
    next(err);
  }
}

async function getTicketById(req, res, next) {
  try {
    const ticket = await ticketService.getTicketById(req.params.id);
    res.status(200).json(ticket);
  } catch (err) {
    next(err);
  }
}

async function createTicket(req, res, next) {
  try {
    const ticket = await ticketService.createTicket(req.body);
    res.status(201).json(ticket);
  } catch (err) {
    next(err);
  }
}

async function updateTicket(req, res, next) {
  try {
    const ticket = await ticketService.updateTicket(req.params.id, req.body);
    res.status(200).json(ticket);
  } catch (err) {
    next(err);
  }
}

async function deleteTicket(req, res, next) {
  try {
    await ticketService.deleteTicket(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
};