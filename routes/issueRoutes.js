const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');

router.post('/', issueController.createIssue);
router.get('/', issueController.getIssuedItems);

module.exports = router;
// This code defines the routes for handling issue-related operations in an Express application.