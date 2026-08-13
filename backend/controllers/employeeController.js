// ============================================
// Employee Controller — Full CRUD
// ============================================
const pool = require('../config/db');

// ─── GET ALL EMPLOYEES ───────────────────────
const getAllEmployees = async (req, res, next) => {
  try {
    const { status, department_id, search } = req.query;

    let sql = `
      SELECT
        e.id,
        e.first_name,
        e.last_name,
        e.avatar_initials,
        e.email,
        e.phone,
        e.position,
        e.salary,
        e.hire_date,
        e.status,
        e.created_at,
        d.id   AS department_id,
        d.name AS department_name
      FROM employees e
      JOIN departments d ON e.department_id = d.id
      WHERE 1=1
    `;
    const params = [];

    if (status) {
      sql += ' AND e.status = ?';
      params.push(status);
    }
    if (department_id) {
      sql += ' AND e.department_id = ?';
      params.push(department_id);
    }
    if (search) {
      sql += ` AND (
        e.first_name LIKE ? OR
        e.last_name  LIKE ? OR
        e.email      LIKE ? OR
        e.position   LIKE ?
      )`;
      const like = `%${search}%`;
      params.push(like, like, like, like);
    }

    sql += ' ORDER BY e.created_at DESC';

    const [rows] = await pool.execute(sql, params);
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    next(err);
  }
};

// ─── GET SINGLE EMPLOYEE ──────────────────────
const getEmployeeById = async (req, res, next) => {
  try {
    const [rows] = await pool.execute(
      `SELECT
         e.*, d.name AS department_name
       FROM employees e
       JOIN departments d ON e.department_id = d.id
       WHERE e.id = ?`,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Employee not found.' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// ─── CREATE EMPLOYEE ──────────────────────────
const createEmployee = async (req, res, next) => {
  try {
    const {
      first_name, last_name, email, phone,
      position, department_id, salary, hire_date, status,
    } = req.body;

    // Basic required field check
    if (!first_name || !last_name || !email || !position || !department_id || !salary || !hire_date) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided.' });
    }

    const [result] = await pool.execute(
      `INSERT INTO employees
         (first_name, last_name, email, phone, position, department_id, salary, hire_date, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        first_name.trim(),
        last_name.trim(),
        email.trim().toLowerCase(),
        phone?.trim() || null,
        position.trim(),
        department_id,
        parseFloat(salary),
        hire_date,
        status || 'active',
      ]
    );

    const [newEmp] = await pool.execute(
      `SELECT e.*, d.name AS department_name
       FROM employees e JOIN departments d ON e.department_id = d.id
       WHERE e.id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Employee created successfully.',
      data: newEmp[0],
    });
  } catch (err) {
    next(err);
  }
};

// ─── UPDATE EMPLOYEE ──────────────────────────
const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check exists
    const [existing] = await pool.execute('SELECT id FROM employees WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Employee not found.' });
    }

    const {
      first_name, last_name, email, phone,
      position, department_id, salary, hire_date, status,
    } = req.body;

    await pool.execute(
      `UPDATE employees SET
         first_name    = ?,
         last_name     = ?,
         email         = ?,
         phone         = ?,
         position      = ?,
         department_id = ?,
         salary        = ?,
         hire_date     = ?,
         status        = ?
       WHERE id = ?`,
      [
        first_name.trim(),
        last_name.trim(),
        email.trim().toLowerCase(),
        phone?.trim() || null,
        position.trim(),
        department_id,
        parseFloat(salary),
        hire_date,
        status,
        id,
      ]
    );

    const [updated] = await pool.execute(
      `SELECT e.*, d.name AS department_name
       FROM employees e JOIN departments d ON e.department_id = d.id
       WHERE e.id = ?`,
      [id]
    );

    res.json({
      success: true,
      message: 'Employee updated successfully.',
      data: updated[0],
    });
  } catch (err) {
    next(err);
  }
};

// ─── DELETE EMPLOYEE ──────────────────────────
const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [existing] = await pool.execute('SELECT id, first_name, last_name FROM employees WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Employee not found.' });
    }

    await pool.execute('DELETE FROM employees WHERE id = ?', [id]);

    res.json({
      success: true,
      message: `Employee "${existing[0].first_name} ${existing[0].last_name}" deleted successfully.`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};