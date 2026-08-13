// ============================================
// Edit Employee Page
// ============================================
let employeeId = null;

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  employeeId = params.get('id');

  if (!employeeId) {
    Toast.show('No employee ID provided.', 'error');
    setTimeout(() => (window.location.href = 'employees.html'), 1500);
    return;
  }

  await populateDepartmentsEdit('department_id');
  await loadEmployee(employeeId);

  document.getElementById('edit-employee-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.disabled    = true;
    btn.textContent = 'Updating…';

    const payload = getFormDataEdit('edit-employee-form');

    try {
      const res  = await fetch(`${API_BASE_URL}/employees/${employeeId}`, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
      const json = await res.json();

      if (json.success) {
        Toast.show('Employee updated! Redirecting…', 'success');
        setTimeout(() => (window.location.href = 'employees.html'), 1800);
      } else {
        Toast.show(json.message || 'Update failed.', 'error');
        btn.disabled    = false;
        btn.textContent = 'Update Employee';
      }
    } catch {
      Toast.show('Network error.', 'error');
      btn.disabled    = false;
      btn.textContent = 'Update Employee';
    }
  });
});

async function loadEmployee(id) {
  try {
    const res  = await fetch(`${API_BASE_URL}/employees/${id}`);
    const json = await res.json();
    if (!json.success) throw new Error('Not found');

    const emp = json.data;
    document.getElementById('first_name').value    = emp.first_name;
    document.getElementById('last_name').value     = emp.last_name;
    document.getElementById('email').value         = emp.email;
    document.getElementById('phone').value         = emp.phone || '';
    document.getElementById('position').value      = emp.position;
    document.getElementById('department_id').value = emp.department_id;
    document.getElementById('salary').value        = emp.salary;
    document.getElementById('hire_date').value     = emp.hire_date?.split('T')[0];
    document.getElementById('status').value        = emp.status;

    document.getElementById('page-title').textContent =
      `Edit — ${emp.first_name} ${emp.last_name}`;
  } catch {
    Toast.show('Failed to load employee data.', 'error');
  }
}

async function populateDepartmentsEdit(selectId) {
  const select = document.getElementById(selectId);
  const res    = await fetch(`${API_BASE_URL}/departments`);
  const json   = await res.json();
  json.data.forEach(d => {
    select.innerHTML += `<option value="${d.id}">${d.name}</option>`;
  });
}

function getFormDataEdit(formId) {
  const form = document.getElementById(formId);
  const data = new FormData(form);
  return Object.fromEntries(data.entries());
}