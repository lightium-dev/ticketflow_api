const ticketRepository = require('../repositories/ticket.repository');

async function getAllTickets() {
  return ticketRepository.findAll();
}

async function getTicketById(id) {
  const ticket = await ticketRepository.findById(id);
  if (!ticket) {
    const error = new Error('Ticket not found');
    error.statusCode = 404;
    throw error;
  }
  return ticket;
}

async function createTicket(data) {
  return ticketRepository.create(data);
}

async function updateTicket(id, data) {
  const ticket = await ticketRepository.update(id, data);
  if (!ticket) {
    const error = new Error('Ticket not found');
    error.statusCode = 404;
    throw error;
  }
  return ticket;
}

async function deleteTicket(id) {
  const deleted = await ticketRepository.remove(id);
  if (!deleted) {
    const error = new Error('Ticket not found');
    error.statusCode = 404;
    throw error;
  }
  return true;
}

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
};