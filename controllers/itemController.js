const db = require('../db/db');

// 🔍 Get all items with category name
exports.getAllItems = (req, res) => {
  const sql = `
    SELECT item.id, item.item_name, item.category_id, category.category_name 
    FROM item 
    JOIN category ON item.category_id = category.id 
    WHERE item.is_deleted = 0
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// ➕ Insert new item
exports.insertItem = (req, res) => {
  const { item_name, category_id } = req.body;
  const sql = 'INSERT INTO item (item_name, category_id) VALUES (?, ?)';
  db.query(sql, [item_name, category_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Item inserted successfully' });
  });
};

// ✏️ Update item
exports.updateItem = (req, res) => {
  const { id, item_name, category_id } = req.body;
  const sql = 'UPDATE item SET item_name = ?, category_id = ? WHERE id = ? AND is_deleted = 0';
  db.query(sql, [item_name, category_id, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Item updated successfully' });
  });
};

// 🗑️ Soft delete item
exports.deleteItem = (req, res) => {
  const { id } = req.params;
  const sql = 'UPDATE item SET is_deleted = 1 WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Item deleted successfully' });
  });
};
