const db = require('../db/db');

//   Get All Categories
exports.getAllcategory = (req, res) => {
  db.query('SELECT * FROM category WHERE is_deleted = 0', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

//   Insert New Category
exports.insertCategory = (req, res) => {
  const { category_name } = req.body;
  const sql = 'INSERT INTO category (category_name) VALUES (?)';
  db.query(sql, [category_name], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Category inserted successfully' });
  });
};

//   Update Category Name
exports.updateCategory = (req, res) => {
  const { category_name, id } = req.body;
  const sql = 'UPDATE category SET category_name = ? WHERE id = ? AND is_deleted = 0';
  db.query(sql, [category_name, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Category updated successfully' });
  });
};

//   Soft Delete Category
exports.deleteCategory = (req, res) => {
  const { id } = req.params;
  const sql = 'UPDATE category SET is_deleted = 1 WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Category deleted successfully' });
  });
};
