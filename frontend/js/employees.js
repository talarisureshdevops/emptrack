// ============================================
// Employee List Page
// ============================================
let allEmployees = [];

document.addEventListener('DOMContentLoaded', async () => {
  await loadDepartmentFilter();
  await loadEmployees();
  bindFilters();
});

async function loadDepartmentFilter() {
  const select = document.getElementById('filter-dept');
  if (!select) return;
  const res  = await fetch(`${API_BASE_URL}/departments`);
  const json = await res.json();
  json.data.forEach(d => {
    select.innerHTML += `<option value="${d.id}">${d.name}</option>`;
  });
}

async function loadEmployees(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res   = await fetch(`${API_BASE_URL}/employees?${query}`);
    const json  = await res.json();
    allEmployees = json.data || [];
    renderTable(allEmployees);
    document.getElementById('employee-count').textContent = allEmployees.length;
  } catch (err) {
    Toast.show('Failed to load employees.', 'error');
  }
}

function renderTable(employees) {
  const tbody = document.getElementById('employee-table-body');

  if (employees.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="empty-state">
          <div class="empty-icon">👤</div>
          <p>No employees found.</p>
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = employees.map(emp => `
    <tr>
      <td>
        <div class="emp-cell">
          <div class="avatar">${emp.avatar_initials}</div>
          <div>
            <div class="emp-name">${emp.first_name} ${emp.last_name}</div>
            <div class="emp-email">${emp.email}</div>
          </div>
        </div>
      </td>
      <td>${emp.position}</td>
      <td>${emp.department_name}</td>
      <td>${formatCurrency(emp.salary)}</td>
      <td>${formatDate(emp.hire_date)}</td>
      <td>${statusBadge(emp.status)}</td>
      <td>
        <div class="action-btns">
          <a href="edit-employee.html?id=${emp.id}" class="btn btn-sm btn-edit" title="Edit">✏️</a>
          <button onclick="confirmDelete(${emp.id}, '${emp.first_name} ${emp.last_name}')"
                  class="btn btn-sm btn-delete" title="Delete">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function bindFilters() {
  const searchInput  = document.getElementById('search-input');
  const statusSelect = document.getElementById('filter-status');
  const deptSelect   = document.getElementById('filter-dept');

  const applyFilters = () => {
    const params = {};
    if (searchInput.value.trim())   params.search        = searchInput.value.trim();
    if (statusSelect.value)         params.status        = statusSelect.value;
    if (deptSelect.value)           params.department_id = deptSelect.value;
    loadEmployees(params);
  };

  searchInput.addEventListener('input',  applyFilters);
  statusSelect.addEventListener('change', applyFilters);
  deptSelect.addEventListener('change',   applyFilters);
}

// Delete with modal confirmation
function confirmDelete(id, name) {
  const modal = document.getElementById('delete-modal');
  document.getElementById('delete-name').textContent = name;
  modal.classList.add('open');

  document.getElementById('confirm-delete-btn').onclick = async () => {
    try {
      const res  = await fetch(`${API_BASE_URL}/employees/${id}`, { method: 'DELETE' });
      const json = await res.json();
      modal.classList.remove('open');
      Toast.show(json.message, json.success ? 'success' : 'error');
      if (json.success) await loadEmployees();
    } catch {
      Toast.show('Delete failed.', 'error');
    }
  };

  document.getElementById('cancel-delete-btn').onclick = () => modal.classList.remove('open');
}