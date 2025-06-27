const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.getAllStudents);
router.post('/', studentController.addStudent);
router.put('/', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
