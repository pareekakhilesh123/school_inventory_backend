const db = require('../db/db');

 
exports.getAllTransactions = (req, res) => {
  const sql = `
    SELECT t.*, i.item_name 
    FROM item_transactions t 
    JOIN items i ON t.item_id = i.id
    ORDER BY t.created_at DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

//   Insert new transaction
exports.insertTransaction = (req, res) => {
  const { item_id, transaction_type, quantity, remarks } = req.body;

  const sql = `
    INSERT INTO item_transactions (item_id, transaction_type, quantity, remarks)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [item_id, transaction_type, quantity, remarks], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({ message: 'Transaction recorded successfully' });
  });
};

 
exports.getItemStock = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      SUM(CASE WHEN transaction_type = 'IN' THEN quantity ELSE 0 END) AS total_in,
      SUM(CASE WHEN transaction_type = 'OUT' THEN quantity ELSE 0 END) AS total_out
    FROM item_transactions
    WHERE item_id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const total_in = results[0].total_in || 0;
    const total_out = results[0].total_out || 0;
    const current_stock = total_in - total_out;

    res.json({ item_id: id, total_in, total_out, current_stock });
  });
};
