const categoryRepository = require('../repositories/category.repository');
async function getAllCategories() {
  return categoryRepository.findAll();
}
async function getCategoryById(id) {
  const category = await categoryRepository.findById(id);
  if (!category) {
    const error = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }
  return category;
}
async function createCategory(data) {
  return categoryRepository.create(data);
}

async function updateCategory(id, data) {
  const category = await categoryRepository.update(id, data);
  if (!category) {
    const error = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }
  return category;
}
async function deleteCategory(id) {
  const deleted = await categoryRepository.remove(id);
  if (!deleted) {
    const error = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }
  return true;
}
module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};