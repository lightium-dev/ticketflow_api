const express = require('express');
const categoryRoutes = require('./routes/category.routes');
const ticketRoutes = require('./routes/ticket.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.use('/categories', categoryRoutes);
app.use('/tickets', ticketRoutes);

app.use(errorHandler);

module.exports = app;