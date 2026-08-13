const express    = require('express');
const router     = express.Router();
const ctrl       = require('../controllers/employeeController');

// GET    /api/employees          — list (with optional ?search=&status=&department_id=)
// POST   /api/employees          — create
// GET    /api/employees/:id      — read one
// PUT    /api/employees/:id      — update
// DELETE /api/employees/:id      — delete

router.get('/',     ctrl.getAllEmployees);
router.post('/',    ctrl.createEmployee);
router.get('/:id',  ctrl.getEmployeeById);
router.put('/:id',  ctrl.updateEmployee);
router.delete('/:id', ctrl.deleteEmployee);

module.exports = router;