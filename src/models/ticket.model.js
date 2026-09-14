const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Category = require('./category.model');
const Ticket = sequelize.define(
  'Ticket',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('open', 'in_progress', 'resolved', 'closed'),
      allowNull: false,
      defaultValue: 'open',
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: 'id',
      },
    },
  },
  {
    tableName: 'ticket',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
Category.hasMany(Ticket, { foreignKey: 'category_id' });
Ticket.belongsTo(Category, { foreignKey: 'category_id' });
module.exports = Ticket;