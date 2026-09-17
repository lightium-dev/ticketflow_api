jest.mock('../../src/repositories/category.repository');

const categoryRepository = require('../../src/repositories/category.repository');
const categoryService = require('../../src/services/category.service');

describe('categoryService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCategories', () => {
    it('returns all categories from the repository', async () => {
      const mockCategories = [{ id: 1, name: 'Billing' }, { id: 2, name: 'Technical' }];
      categoryRepository.findAll.mockResolvedValue(mockCategories);

      const result = await categoryService.getAllCategories();

      expect(result).toEqual(mockCategories);
      expect(categoryRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCategoryById', () => {
    it('returns the category when found', async () => {
      const mockCategory = { id: 1, name: 'Billing' };
      categoryRepository.findById.mockResolvedValue(mockCategory);

      const result = await categoryService.getCategoryById(1);

      expect(result).toEqual(mockCategory);
      expect(categoryRepository.findById).toHaveBeenCalledWith(1);
    });

    it('throws a 404 error when the category is not found', async () => {
      categoryRepository.findById.mockResolvedValue(null);

      await expect(categoryService.getCategoryById(999)).rejects.toMatchObject({
        message: 'Category not found',
        statusCode: 404,
      });
    });
  });

  describe('createCategory', () => {
    it('creates and returns a new category', async () => {
      const newCategory = { name: 'Billing' };
      const createdCategory = { id: 1, name: 'Billing' };
      categoryRepository.create.mockResolvedValue(createdCategory);

      const result = await categoryService.createCategory(newCategory);

      expect(result).toEqual(createdCategory);
      expect(categoryRepository.create).toHaveBeenCalledWith(newCategory);
    });
  });

  describe('updateCategory', () => {
    it('updates and returns the category when found', async () => {
      const updatedCategory = { id: 1, name: 'Updated' };
      categoryRepository.update.mockResolvedValue(updatedCategory);

      const result = await categoryService.updateCategory(1, { name: 'Updated' });

      expect(result).toEqual(updatedCategory);
    });

    it('throws a 404 error when updating a nonexistent category', async () => {
      categoryRepository.update.mockResolvedValue(null);

      await expect(categoryService.updateCategory(999, { name: 'X' })).rejects.toMatchObject({
        statusCode: 404,
      });
    });
  });

  describe('deleteCategory', () => {
    it('deletes the category when found', async () => {
      categoryRepository.remove.mockResolvedValue(true);

      const result = await categoryService.deleteCategory(1);

      expect(result).toBe(true);
    });

    it('throws a 404 error when deleting a nonexistent category', async () => {
      categoryRepository.remove.mockResolvedValue(null);

      await expect(categoryService.deleteCategory(999)).rejects.toMatchObject({
        statusCode: 404,
      });
    });
  });
});