const Category = require('../models/category.model');
async function findAll() {
  return Category.findAll();
}
async function findById(id) {
  return Category.findByPk(id);
}
async function create(data) {
  return Category.create(data);
}
async function update(id, data) {
  const category = await Category.findByPk(id);
  if (!category) return null;
  return category.update(data);
}
async function remove(id) {
  const category = await Category.findByPk(id);
  if (!category) return null;
  await category.destroy();
  return true;
}
module.exports = { findAll, findById, create, update, remove };