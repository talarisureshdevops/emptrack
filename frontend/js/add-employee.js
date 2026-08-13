// ============================================
// Add Employee Page
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
  await populateDepartments('department_id');

  document.getElementById('add-employee-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.textContent = 'Saving…';

    const payload = getFormData('add-employee-form');

    try {
      const res  = await fetch(`${API_BASE_URL}/employees`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
      const json = await res.json();

      if (json.success) {
        Toast.show('Employee added successfully! Redirecting…', 'success');
        setTimeout(() => (window.location.href = 'employees.html'), 1800);
      } else {
        Toast.show(json.message || 'Failed to add employee.', 'error');
        btn.disabled   = false;
        btn.textContent = 'Save Employee';
      }
    } catch (err) {
      Toast.show('Network error. Please try again.', 'error');
      btn.disabled    = false;
      btn.textContent = 'Save Employee';
    }
  });
});

async function populateDepartments(selectId) {
  const select = document.getElementById(selectId);
  const res    = await fetch(`${API_BASE_URL}/departments`);
  const json   = await res.json();
  json.data.forEach(d => {
    select.innerHTML += `<option value="${d.id}">${d.name}</option>`;
  });
}

function getFormData(formId) {
  const form = document.getElementById(formId);
  const data = new FormData(form);
  return Object.fromEntries(data.entries());
}