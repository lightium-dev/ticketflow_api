const Ticket = require('../models/ticket.model');

async function findAll() {
  return Ticket.findAll();
}

async function findById(id) {
  return Ticket.findByPk(id);
}

async function create(data) {
  return Ticket.create(data);
}

async function update(id, data) {
  const ticket = await Ticket.findByPk(id);
  if (!ticket) return null;
  return ticket.update(data);
}

async function remove(id) {
  const ticket = await Ticket.findByPk(id);
  if (!ticket) return null;
  await ticket.destroy();
  return true;
}

module.exports = { findAll, findById, create, update, remove };