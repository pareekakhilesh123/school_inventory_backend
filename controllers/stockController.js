const db = require('../db/db');

exports.getStockReport = (req, res) => {
  const sql = `
    SELECT 
      i.id AS item_id,
      i.item_name,
      c.category_name,
      IFNULL(SUM(gi.quantity), 0) AS total_received,
      IFNULL((
        SELECT SUM(it.quantity)
        FROM item_issue_transaction it
        WHERE it.item_id = i.id
      ), 0) AS total_issued,
      (IFNULL(SUM(gi.quantity), 0) - 
       IFNULL((
        SELECT SUM(it.quantity)
        FROM item_issue_transaction it
        WHERE it.item_id = i.id
      ), 0)) AS current_stock
    FROM item i
    JOIN category c ON i.category_id = c.id
    LEFT JOIN grn_item gi ON i.id = gi.item_id
    WHERE i.is_deleted = 0
    GROUP BY i.id
    ORDER BY i.id;
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
