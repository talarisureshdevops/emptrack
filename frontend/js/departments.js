// ============================================
// Departments Page
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
  await loadDepartments();
  bindDeptForm();
});

async function loadDepartments() {
  try {
    const res  = await fetch(`${API_BASE_URL}/departments`);
    const json = await res.json();
    renderDepts(json.data);
  } catch {
    Toast.show('Failed to load departments.', 'error');
  }
}

function renderDepts(departments) {
  const grid = document.getElementById('dept-grid');
  if (departments.length === 0) {
    grid.innerHTML = `<p class="empty-msg">No departments found. Add one below.</p>`;
    return;
  }
  grid.innerHTML = departments.map(d => `
    <div class="dept-card">
      <div class="dept-header">
        <div class="dept-icon">🏢</div>
        <div class="dept-actions">
          <button onclick="editDept(${d.id}, '${d.name}', \`${d.description || ''}\`)"
                  class="btn btn-sm btn-edit" title="Edit">✏️</button>
          <button onclick="deleteDept(${d.id}, '${d.name}')"
                  class="btn btn-sm btn-delete" title="Delete">🗑️</button>
        </div>
      </div>
      <h3 class="dept-name">${d.name}</h3>
      <p class="dept-desc">${d.description || 'No description.'}</p>
      <div class="dept-count">
        <span>👥 ${d.employee_count} employee${d.employee_count !== 1 ? 's' : ''}</span>
      </div>
    </div>
  `).join('');
}

function bindDeptForm() {
  document.getElementById('dept-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id   = document.getElementById('dept-id').value;
    const name = document.getElementById('dept-name-input').value.trim();
    const desc = document.getElementById('dept-desc-input').value.trim();

    const isEdit = !!id;
    const url    = isEdit ? `${API_BASE_URL}/departments/${id}` : `${API_BASE_URL}/departments`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res  = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, description: desc }),
      });
      const json = await res.json();
      Toast.show(json.message, json.success ? 'success' : 'error');
      if (json.success) {
        resetDeptForm();
        await loadDepartments();
      }
    } catch {
      Toast.show('Operation failed.', 'error');
    }
  });
}

function editDept(id, name, desc) {
  document.getElementById('dept-id').value           = id;
  document.getElementById('dept-name-input').value   = name;
  document.getElementById('dept-desc-input').value   = desc;
  document.getElementById('dept-form-title').textContent = '✏️ Edit Department';
  document.getElementById('dept-submit-btn').textContent = 'Update Department';
  document.getElementById('dept-cancel-btn').style.display = 'inline-block';
}

async function deleteDept(id, name) {
  if (!confirm(`Delete department "${name}"? Employees must be moved first.`)) return;
  try {
    const res  = await fetch(`${API_BASE_URL}/departments/${id}`, { method: 'DELETE' });
    const json = await res.json();
    Toast.show(json.message, json.success ? 'success' : 'error');
    if (json.success) await loadDepartments();
  } catch {
    Toast.show('Delete failed.', 'error');
  }
}

function resetDeptForm() {
  document.getElementById('dept-id').value           = '';
  document.getElementById('dept-name-input').value   = '';
  document.getElementById('dept-desc-input').value   = '';
  document.getElementById('dept-form-title').textContent = '➕ Add Department';
  document.getElementById('dept-submit-btn').textContent = 'Add Department';
  document.getElementById('dept-cancel-btn').style.display = 'none';
}