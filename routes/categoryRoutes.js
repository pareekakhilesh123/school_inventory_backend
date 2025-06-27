const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getAllcategory);
router.post('/', categoryController.insertCategory);
router.put('/', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
