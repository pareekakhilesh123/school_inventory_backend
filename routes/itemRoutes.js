const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.getAllItems);
router.post('/', itemController.insertItem);
router.put('/', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

module.exports = router;
