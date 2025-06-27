const db = require('../db/db');

//Insert GRN with Items
exports.createGRN = (req, res) => {
  const { grn_number, suppler_name, remark, items , date } = req.body;

  const grnSql = 'INSERT INTO grn (grn_number, suppler_name, remark , date ) VALUES (?, ?, ?, ?)';
  db.query(grnSql, [grn_number, suppler_name, remark , date], (err, grnResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const grnId = grnResult.insertId;

    const grnItemSql = 'INSERT INTO grn_item (grn_id, item_id, quantity, price) VALUES ?';
    const grnItemValues = items.map(item => [grnId, item.item_id, item.quantity, item.price]);

    db.query(grnItemSql, [grnItemValues], (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.status(201).json({ message: 'GRN created successfully' });
    });
  });
};

// Get All GRNs with Items
exports.getAllGRNs = (req, res) => {
  const sql = `
    SELECT grn.id AS grn_id, grn.grn_number, grn.suppler_name, grn.remark, grn.created_at,
           grn_item.id AS grn_item_id, grn_item.item_id, item.item_name, grn_item.quantity, grn_item.price
    FROM grn
    JOIN grn_item ON grn.id = grn_item.grn_id
    JOIN item ON grn_item.item_id = item.id
    ORDER BY grn.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
