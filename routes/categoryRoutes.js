const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/category', categoryController.getAllcategory);
router.post('/category', categoryController.insertCategory);
router.put('/category', categoryController.updateCategory);
router.delete('/category/:id', categoryController.deleteCategory);


module.exports = router;