// ============================================
// Department Controller — Full CRUD
// ============================================
const pool = require('../config/db');

// GET ALL
const getAllDepartments = async (req, res, next) => {
  try {
    const [rows] = await pool.execute(`
      SELECT
        d.*,
        COUNT(e.id) AS employee_count
      FROM departments d
      LEFT JOIN employees e ON d.id = e.department_id
      GROUP BY d.id
      ORDER BY d.name ASC
    `);
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    next(err);
  }
};

// GET ONE
const getDepartmentById = async (req, res, next) => {
  try {
    const [rows] = await pool.execute(
      `SELECT d.*, COUNT(e.id) AS employee_count
       FROM departments d
       LEFT JOIN employees e ON d.id = e.department_id
       WHERE d.id = ?
       GROUP BY d.id`,
      [req.params.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ success: false, message: 'Department not found.' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// CREATE
const createDepartment = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Department name is required.' });

    const [result] = await pool.execute(
      'INSERT INTO departments (name, description) VALUES (?, ?)',
      [name.trim(), description?.trim() || null]
    );
    const [newDept] = await pool.execute('SELECT * FROM departments WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: 'Department created.', data: newDept[0] });
  } catch (err) {
    next(err);
  }
};

// UPDATE
const updateDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [existing] = await pool.execute('SELECT id FROM departments WHERE id = ?', [id]);
    if (existing.length === 0)
      return res.status(404).json({ success: false, message: 'Department not found.' });

    const { name, description } = req.body;
    await pool.execute(
      'UPDATE departments SET name = ?, description = ? WHERE id = ?',
      [name.trim(), description?.trim() || null, id]
    );
    const [updated] = await pool.execute('SELECT * FROM departments WHERE id = ?', [id]);
    res.json({ success: true, message: 'Department updated.', data: updated[0] });
  } catch (err) {
    next(err);
  }
};

// DELETE
const deleteDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [existing] = await pool.execute('SELECT * FROM departments WHERE id = ?', [id]);
    if (existing.length === 0)
      return res.status(404).json({ success: false, message: 'Department not found.' });

    await pool.execute('DELETE FROM departments WHERE id = ?', [id]);
    res.json({ success: true, message: `Department "${existing[0].name}" deleted.` });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};