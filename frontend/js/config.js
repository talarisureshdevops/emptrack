// ============================================
// API Configuration — Change this to match
// your backend server IP/port when deploying
// ============================================
const API_BASE_URL = 'http://172.31.27.21:5000/api';

// Utility: show toast notifications
const Toast = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.getElementById('toast-container');
    }
  },

  show(message, type = 'success') {
    this.init();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
      <span>${message}</span>
    `;
    this.container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  },
};

// Utility: format currency
const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

// Utility: format date
const formatDate = (dateStr) =>
  dateStr ? new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  }) : '—';

// Utility: status badge HTML
const statusBadge = (status) => {
  const map = {
    active:   { cls: 'badge-active',   label: 'Active' },
    inactive: { cls: 'badge-inactive', label: 'Inactive' },
    on_leave: { cls: 'badge-leave',    label: 'On Leave' },
  };
  const s = map[status] || { cls: 'badge-inactive', label: status };
  return `<span class="badge ${s.cls}">${s.label}</span>`;
};