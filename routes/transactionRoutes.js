const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/transactions', transactionController.getAllTransactions);
router.post('/transactions', transactionController.insertTransaction);
router.get('/items/:id/stock', transactionController.getItemStock);

module.exports = router;
