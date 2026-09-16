const ticketRepository = require('../repositories/ticket.repository');

const ALLOWED_TRANSITIONS = {
  open: ['in_progress'],
  in_progress: ['resolved'],
  resolved: ['closed'],
  closed: ['open'],
};

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

async function changeTicketStatus(id, newStatus) {
  const ticket = await ticketRepository.findById(id);
  if (!ticket) {
    const error = new Error('Ticket not found');
    error.statusCode = 404;
    throw error;
  }

  const currentStatus = ticket.status;
  const allowedNextStatuses = ALLOWED_TRANSITIONS[currentStatus] || [];

  if (!allowedNextStatuses.includes(newStatus)) {
    const error = new Error(
      `Invalid transition from "${currentStatus}" to "${newStatus}"`
    );
    error.statusCode = 409;
    throw error;
  }

  return ticketRepository.update(id, { status: newStatus });
}

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  changeTicketStatus,
};