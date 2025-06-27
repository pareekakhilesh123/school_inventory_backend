const express = require('express');
const router = express.Router();
const grnController = require('../controllers/grnController');

router.post('/', grnController.createGRN);
router.get('/', grnController.getAllGRNs);

module.exports = router;
