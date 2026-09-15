const express = require('express');
const categoryRoutes = require('./routes/category.routes');
const ticketRoutes = require('./routes/ticket.routes');

const app = express();

app.use(express.json());

app.use('/categories', categoryRoutes);
app.use('/tickets', ticketRoutes);

module.exports = app;