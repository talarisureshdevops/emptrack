// ============================================
// Stats Controller — Dashboard Numbers
// ============================================
const pool = require('../config/db');

const getStats = async (req, res, next) => {
  try {
    const [[totals]] = await pool.execute(`
      SELECT
        COUNT(*)                                             AS total_employees,
        SUM(status = 'active')                              AS active_employees,
        SUM(status = 'inactive')                            AS inactive_employees,
        SUM(status = 'on_leave')                            AS on_leave_employees,
        ROUND(AVG(salary), 2)                               AS avg_salary,
        SUM(salary)                                         AS total_payroll,
        SUM(hire_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) AS new_hires_30d
      FROM employees
    `);

    const [deptBreakdown] = await pool.execute(`
      SELECT
        d.name,
        COUNT(e.id)         AS count,
        ROUND(AVG(e.salary),2) AS avg_salary
      FROM departments d
      LEFT JOIN employees e ON d.id = e.department_id
      GROUP BY d.id, d.name
      ORDER BY count DESC
    `);

    const [[deptCount]] = await pool.execute('SELECT COUNT(*) AS total FROM departments');

    res.json({
      success: true,
      data: {
        ...totals,
        total_departments: deptCount.total,
        department_breakdown: deptBreakdown,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getStats };