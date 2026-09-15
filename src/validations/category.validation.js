const { z } = require('zod');

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be at most 100 characters'),
});

module.exports = { categorySchema }; 