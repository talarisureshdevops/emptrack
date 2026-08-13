// ============================================
// Dashboard — loads live stats from API
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
  await loadStats();
});

async function loadStats() {
  try {
    const res  = await fetch(`${API_BASE_URL}/stats`);
    const json = await res.json();
    if (!json.success) throw new Error(json.message);

    const d = json.data;

    // Stat cards
    document.getElementById('stat-total').textContent    = d.total_employees;
    document.getElementById('stat-active').textContent   = d.active_employees;
    document.getElementById('stat-leave').textContent    = d.on_leave_employees;
    document.getElementById('stat-depts').textContent    = d.total_departments;
    document.getElementById('stat-payroll').textContent  = formatCurrency(d.total_payroll);
    document.getElementById('stat-avg-sal').textContent  = formatCurrency(d.avg_salary);
    document.getElementById('stat-newhires').textContent = d.new_hires_30d;

    // Department breakdown table
    const tbody = document.getElementById('dept-breakdown-body');
    tbody.innerHTML = d.department_breakdown.map(dept => `
      <tr>
        <td>${dept.name}</td>
        <td><strong>${dept.count}</strong></td>
        <td>${formatCurrency(dept.avg_salary || 0)}</td>
      </tr>
    `).join('');

  } catch (err) {
    console.error('Stats load error:', err);
    Toast.show('Failed to load dashboard stats.', 'error');
  }
}