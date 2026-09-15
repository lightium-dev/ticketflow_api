const { z } = require('zod');

const ticketSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be at most 200 characters'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  category_id: z.number().int().positive('category_id must be a positive integer'),
});

module.exports = { ticketSchema };