const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/items', itemController.getAllitems);
router.post('/items', itemController.insertItem);
router.put('/items/:id', itemController.updateItem);  
router.delete('/items/:id', itemController.deleteItem);

module.exports = router;