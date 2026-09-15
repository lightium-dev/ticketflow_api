const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category.controller');
const validate = require('../middlewares/validate');
const { categorySchema } = require('../validations/category.validation');

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', validate(categorySchema), categoryController.createCategory);
router.put('/:id', validate(categorySchema), categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;