const db = require('../db/db');

// ➕ Create issue (master + transactions)
exports.createIssue = (req, res) => {
  const { issue_number, issue_student_id, issue_by, remark, items } = req.body;

  const issueSql = 'INSERT INTO item_issue_master (issue_number, issue_student_id, issue_by, remark) VALUES (?, ?, ?, ?)';
  db.query(issueSql, [issue_number, issue_student_id, issue_by, remark], (err, issueResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const issueMasterId = issueResult.insertId;

    const transSql = 'INSERT INTO item_issue_transaction (item_issue_master_id, item_id, quantity, remark) VALUES ?';
    const transValues = items.map(item => [issueMasterId, item.item_id, item.quantity, item.remark || '']);

    db.query(transSql, [transValues], (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.status(201).json({ message: 'Items issued successfully' });
    });
  });
};

// 🔍 Get all issued transactions with student and item info
exports.getIssuedItems = (req, res) => {
  const sql = `
    SELECT iim.id AS issue_id, iim.issue_number, s.name AS student_name, s.class, iim.issue_by, iim.created_at,
           iit.item_id, item.item_name, iit.quantity, iit.remark
    FROM item_issue_master AS iim
    JOIN student AS s ON iim.issue_student_id = s.id
    JOIN item_issue_transaction AS iit ON iim.id = iit.item_issue_master_id
    JOIN item ON iit.item_id = item.id
    ORDER BY iim.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
