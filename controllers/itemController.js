const db = require('../db/db');

exports.getAllitems = (req, res) => {
  db.query('SELECT * FROM items WHERE is_deleted = 0', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.insertItem = (req, res) => {
  const { item_name, quantity, category_id } = req.body;

  const sql = 'INSERT INTO items (item_name, quantity, category_id) VALUES (?, ?, ?)';
  db.query(sql, [item_name, quantity, category_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Item inserted into database' });
  });
};



exports.updateItem = (req, res) => {
  const { item_name, quantity, category_id } = req.body;
  const { id } = req.params;

  const sql = 'UPDATE items SET item_name = ?, quantity = ?, category_id = ? WHERE id = ?';
  db.query(sql, [item_name, quantity, category_id, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item updated successfully' });
  });
};

exports.deleteItem = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM items WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully' });
  });
};
