jest.mock('../../src/repositories/ticket.repository');

const ticketRepository = require('../../src/repositories/ticket.repository');
const ticketService = require('../../src/services/ticket.service');

describe('ticketService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllTickets', () => {
    it('returns all tickets from the repository', async () => {
      const mockTickets = [{ id: 1, title: 'Bug A' }, { id: 2, title: 'Bug B' }];
      ticketRepository.findAll.mockResolvedValue(mockTickets);

      const result = await ticketService.getAllTickets();

      expect(result).toEqual(mockTickets);
    });
  });

  describe('getTicketById', () => {
    it('returns the ticket when found', async () => {
      const mockTicket = { id: 1, title: 'Bug A', status: 'open' };
      ticketRepository.findById.mockResolvedValue(mockTicket);

      const result = await ticketService.getTicketById(1);

      expect(result).toEqual(mockTicket);
    });

    it('throws a 404 error when the ticket is not found', async () => {
      ticketRepository.findById.mockResolvedValue(null);

      await expect(ticketService.getTicketById(999)).rejects.toMatchObject({
        message: 'Ticket not found',
        statusCode: 404,
      });
    });
  });

  describe('createTicket', () => {
    it('creates and returns a new ticket', async () => {
      const newTicket = { title: 'Bug A', priority: 'high', category_id: 1 };
      const createdTicket = { id: 1, ...newTicket, status: 'open' };
      ticketRepository.create.mockResolvedValue(createdTicket);

      const result = await ticketService.createTicket(newTicket);

      expect(result).toEqual(createdTicket);
      expect(ticketRepository.create).toHaveBeenCalledWith(newTicket);
    });
  });

  describe('updateTicket', () => {
    it('updates and returns the ticket when found', async () => {
      const updatedTicket = { id: 1, title: 'Updated title' };
      ticketRepository.update.mockResolvedValue(updatedTicket);

      const result = await ticketService.updateTicket(1, { title: 'Updated title' });

      expect(result).toEqual(updatedTicket);
      expect(ticketRepository.update).toHaveBeenCalledWith(1, { title: 'Updated title' });
    });

    it('throws a 404 error when updating a nonexistent ticket', async () => {
      ticketRepository.update.mockResolvedValue(null);

      await expect(
        ticketService.updateTicket(999, { title: 'X' })
      ).rejects.toMatchObject({
        message: 'Ticket not found',
        statusCode: 404,
      });
    });
  });

  describe('deleteTicket', () => {
    it('deletes the ticket when found', async () => {
      ticketRepository.remove.mockResolvedValue(true);

      const result = await ticketService.deleteTicket(1);

      expect(result).toBe(true);
    });

    it('throws a 404 error when deleting a nonexistent ticket', async () => {
      ticketRepository.remove.mockResolvedValue(null);

      await expect(ticketService.deleteTicket(999)).rejects.toMatchObject({
        statusCode: 404,
      });
    });
  });

  describe('changeTicketStatus', () => {
    it('throws a 404 error when the ticket does not exist', async () => {
      ticketRepository.findById.mockResolvedValue(null);

      await expect(
        ticketService.changeTicketStatus(999, 'in_progress')
      ).rejects.toMatchObject({
        message: 'Ticket not found',
        statusCode: 404,
      });
    });

    it('allows the transition from open to in_progress', async () => {
      const mockTicket = { id: 1, status: 'open' };
      const updatedTicket = { id: 1, status: 'in_progress' };
      ticketRepository.findById.mockResolvedValue(mockTicket);
      ticketRepository.update.mockResolvedValue(updatedTicket);

      const result = await ticketService.changeTicketStatus(1, 'in_progress');

      expect(result).toEqual(updatedTicket);
      expect(ticketRepository.update).toHaveBeenCalledWith(1, { status: 'in_progress' });
    });

    it('allows the transition from in_progress to resolved', async () => {
      const mockTicket = { id: 1, status: 'in_progress' };
      ticketRepository.findById.mockResolvedValue(mockTicket);
      ticketRepository.update.mockResolvedValue({ id: 1, status: 'resolved' });

      const result = await ticketService.changeTicketStatus(1, 'resolved');

      expect(result.status).toBe('resolved');
    });

    it('allows the transition from resolved to closed', async () => {
      const mockTicket = { id: 1, status: 'resolved' };
      ticketRepository.findById.mockResolvedValue(mockTicket);
      ticketRepository.update.mockResolvedValue({ id: 1, status: 'closed' });

      const result = await ticketService.changeTicketStatus(1, 'closed');

      expect(result.status).toBe('closed');
    });

    it('allows reopening a closed ticket (closed to open)', async () => {
      const mockTicket = { id: 1, status: 'closed' };
      ticketRepository.findById.mockResolvedValue(mockTicket);
      ticketRepository.update.mockResolvedValue({ id: 1, status: 'open' });

      const result = await ticketService.changeTicketStatus(1, 'open');

      expect(result.status).toBe('open');
    });

    it('refuses a direct transition from open to closed', async () => {
      const mockTicket = { id: 1, status: 'open' };
      ticketRepository.findById.mockResolvedValue(mockTicket);

      await expect(
        ticketService.changeTicketStatus(1, 'closed')
      ).rejects.toMatchObject({
        message: 'Invalid transition from "open" to "closed"',
        statusCode: 409,
      });

      expect(ticketRepository.update).not.toHaveBeenCalled();
    });

    it('refuses a transition from closed directly to in_progress', async () => {
      const mockTicket = { id: 1, status: 'closed' };
      ticketRepository.findById.mockResolvedValue(mockTicket);

      await expect(
        ticketService.changeTicketStatus(1, 'in_progress')
      ).rejects.toMatchObject({
        statusCode: 409,
      });
    });

    it('refuses a transition from open directly to resolved', async () => {
      const mockTicket = { id: 1, status: 'open' };
      ticketRepository.findById.mockResolvedValue(mockTicket);

      await expect(
        ticketService.changeTicketStatus(1, 'resolved')
      ).rejects.toMatchObject({
        statusCode: 409,
      });
    });
  });
});
