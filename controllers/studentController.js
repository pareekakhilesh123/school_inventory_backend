const db = require('../db/db');

//  Get all students (not deleted)
exports.getAllStudents = (req, res) => {
  const sql = 'SELECT * FROM students WHERE is_deleted = 0';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

//  Add new student
exports.addStudent = (req, res) => {
  const { name, roll_no, class: studentClass, section } = req.body;
  const sql = 'INSERT INTO students (name, roll_no, class, section) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, roll_no, studentClass, section], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Student added successfully' });
  });
};

// Update student
exports.updateStudent = (req, res) => {
  const { name, roll_no, class: studentClass, section } = req.body;
  const { id } = req.params;
  const sql = 'UPDATE students SET name = ?, roll_no = ?, class = ?, section = ? WHERE id = ? AND is_deleted = 0';
  db.query(sql, [name, roll_no, studentClass, section, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Student updated successfully' });
  });
};

//  Soft delete student
exports.deleteStudent = (req, res) => {
  const { id } = req.params;
  const sql = 'UPDATE students SET is_deleted = 1 WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Student deleted successfully' });
  });
};
