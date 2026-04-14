/* ════════════════════════════════════════
   市民服務平台管理後台 — admin.js
   核心邏輯：驗證、API、導覽、Toast
   ════════════════════════════════════════ */

// ── 設定
const ADMIN_CONFIG = {
  API_BASE:    window.location.origin + '/api',
  N8N_BASE:    '',  // 由 settings 動態讀取
  NOTION_BASE: '',  // 由 settings 動態讀取
};

/* ══════════════════════════════
   1. 身份驗證
══════════════════════════════ */
const Auth = {
  getToken()  { return localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token'); },
  getRole()   { return localStorage.getItem('admin_role')  || sessionStorage.getItem('admin_role'); },
  getName()   { return localStorage.getItem('admin_name')  || sessionStorage.getItem('admin_name'); },
  getEmail()  { return localStorage.getItem('admin_email') || sessionStorage.getItem('admin_email'); },
  getClientId(){ return localStorage.getItem('client_id') || sessionStorage.getItem('client_id'); },

  isLoggedIn() { return !!this.getToken(); },
  isSuperAdmin(){ return this.getRole() === 'super_admin'; },
  isAdmin()    { return ['super_admin','admin'].includes(this.getRole()); },

  logout() {
    ['admin_token','admin_role','admin_name','admin_email','client_id']
      .forEach(k => { localStorage.removeItem(k); sessionStorage.removeItem(k); });
    window.location.href = 'login.html';
  },

  // 頁面進入時驗證（每個頁面 head 呼叫）
  require(minRole = 'staff') {
    if (!this.isLoggedIn()) { window.location.href = 'login.html'; return false; }
    const roleOrder = { staff:1, admin:2, super_admin:3 };
    if ((roleOrder[this.getRole()] || 0) < (roleOrder[minRole] || 0)) {
      toast.warn('權限不足，無法存取此頁面。');
      setTimeout(() => window.location.href = 'dashboard.html', 1500);
      return false;
    }
    return true;
  }
};

/* ══════════════════════════════
   2. API 呼叫
══════════════════════════════ */
const API = {
  async call(method, path, body = null) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Auth.getToken()}`,
    };
    const opts = { method, headers };
    if (body) opts.body = JSON.stringify(body);

    try {
      const res  = await fetch(ADMIN_CONFIG.API_BASE + path, opts);
      if (res.status === 401) { Auth.logout(); return null; }
      return await res.json();
    } catch(e) {
      console.error('[API Error]', path, e);
      toast.error('網路連線失敗，請稍後再試。');
      return null;
    }
  },

  get(path)          { return this.call('GET', path); },
  post(path, body)   { return this.call('POST', path, body); },
  patch(path, body)  { return this.call('PATCH', path, body); },
  delete(path)       { return this.call('DELETE', path); },

  // ── 案件相關
  cases: {
    list(params = {}) {
      const qs = new URLSearchParams(params).toString();
      return API.get(`/cases${qs ? '?' + qs : ''}`);
    },
    get(id)         { return API.get(`/cases/${id}`); },
    create(data)    { return API.post('/cases', data); },
    update(id, data){ return API.patch(`/cases/${id}`, data); },
    delete(id)      { return API.delete(`/cases/${id}`); },
    notify(id, data){ return API.post(`/cases/${id}/notify`, data); },
  },

  // ── 圖片上傳
  async uploadImage(caseId, type, file) {
    const fd = new FormData();
    fd.append('caseId', caseId);
    fd.append('imageType', type);
    fd.append('file', file);
    const res = await fetch(ADMIN_CONFIG.API_BASE + '/images/upload', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${Auth.getToken()}` },
      body: fd,
    });
    return res.json();
  },

  // ── 統計
  stats:    { get() { return API.get('/stats'); } },

  // ── 帳號管理（Admin+）
  users: {
    list()          { return API.get('/users'); },
    create(data)    { return API.post('/users', data); },
    delete(id)      { return API.delete(`/users/${id}`); },
    update(id, data){ return API.patch(`/users/${id}`, data); },
  },

  // ── 系統設定（Super Admin）
  settings: {
    get()       { return API.get('/settings'); },
    update(data){ return API.patch('/settings', data); },
  },

  // ── 政績版額外
  inspections: {
    list(params={})  { return API.get('/inspections?' + new URLSearchParams(params)); },
    create(data)     { return API.post('/inspections', data); },
    update(id, data) { return API.patch(`/inspections/${id}`, data); },
    delete(id)       { return API.delete(`/inspections/${id}`); },
  },
  interpellations: {
    list(params={})  { return API.get('/interpellations?' + new URLSearchParams(params)); },
    create(data)     { return API.post('/interpellations', data); },
    update(id, data) { return API.patch(`/interpellations/${id}`, data); },
    delete(id)       { return API.delete(`/interpellations/${id}`); },
  },
  proposals: {
    list(params={})  { return API.get('/proposals?' + new URLSearchParams(params)); },
    create(data)     { return API.post('/proposals', data); },
    update(id, data) { return API.patch(`/proposals/${id}`, data); },
    delete(id)       { return API.delete(`/proposals/${id}`); },
  },
};

/* ══════════════════════════════
   3. Toast 通知
══════════════════════════════ */
const toast = {
  _container: null,
  _init() {
    if (!this._container) {
      this._container = document.createElement('div');
      this._container.className = 'toast-wrap';
      document.body.appendChild(this._container);
    }
  },
  _show(msg, icon, duration = 3000) {
    this._init();
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<span class="toast-icon">${icon}</span><span>${msg}</span>`;
    this._container.appendChild(el);
    setTimeout(() => {
      el.style.animation = 'toastIn .3s reverse ease';
      setTimeout(() => el.remove(), 280);
    }, duration);
  },
  success(msg) { this._show(msg, '✅'); },
  error(msg)   { this._show(msg, '❌', 4000); },
  warn(msg)    { this._show(msg, '⚠️', 4000); },
  info(msg)    { this._show(msg, 'ℹ️'); },
};

/* ══════════════════════════════
   4. Sidebar 互動
══════════════════════════════ */
const Sidebar = {
  _collapsed: localStorage.getItem('sidebar_collapsed') === '1',

  init() {
    const sidebar = document.getElementById('sidebar');
    const main    = document.getElementById('mainContent');
    if (!sidebar) return;
    if (this._collapsed) {
      sidebar.classList.add('collapsed');
      main?.classList.add('sidebar-collapsed');
    }
    // 設定使用者資訊
    const nameEl  = document.getElementById('sidebarUserName');
    const tagEl   = document.getElementById('sidebarUserTag');
    const avatarEl = document.getElementById('sidebarAvatar');
    if (nameEl)   nameEl.textContent  = Auth.getName() || '使用者';
    if (tagEl)    tagEl.textContent   = this._roleLabel(Auth.getRole());
    if (avatarEl) avatarEl.textContent = (Auth.getName() || 'U')[0].toUpperCase();

    // 設定 active nav item
    const page = window.location.pathname.split('/').pop().replace('.html','');
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.page === page);
    });

    // 隱藏無權限的 nav items
    if (!Auth.isAdmin()) {
      document.querySelectorAll('[data-role="admin"]').forEach(el => el.style.display = 'none');
    }
    if (!Auth.isSuperAdmin()) {
      document.querySelectorAll('[data-role="super_admin"]').forEach(el => el.style.display = 'none');
    }
  },

  toggle() {
    this._collapsed = !this._collapsed;
    localStorage.setItem('sidebar_collapsed', this._collapsed ? '1' : '0');
    document.getElementById('sidebar')?.classList.toggle('collapsed', this._collapsed);
    document.getElementById('mainContent')?.classList.toggle('sidebar-collapsed', this._collapsed);
  },

  navigate(page) {
    window.location.href = page + '.html';
  },

  _roleLabel(role) {
    const map = { super_admin:'最高管理員', admin:'管理員', staff:'幕僚' };
    return map[role] || role;
  }
};

/* ══════════════════════════════
   5. Modal 工廠
══════════════════════════════ */
const Modal = {
  open(id) {
    const el = document.getElementById(id);
    if (el) { el.classList.add('open'); document.body.style.overflow = 'hidden'; }
  },
  close(id) {
    const el = document.getElementById(id);
    if (el) { el.classList.remove('open'); document.body.style.overflow = ''; }
  },
  confirm(title, desc, onConfirm) {
    const id = '_confirmModal';
    let modal = document.getElementById(id);
    if (!modal) {
      modal = document.createElement('div');
      modal.id = id;
      modal.className = 'modal-backdrop';
      modal.innerHTML = `
        <div class="modal" style="max-width:400px;">
          <div class="modal-header">
            <span class="modal-title" id="${id}_title"></span>
            <button class="modal-close" onclick="Modal.close('${id}')">✕</button>
          </div>
          <div class="modal-body">
            <p style="font-size:14px;color:var(--text-muted);line-height:1.8;" id="${id}_desc"></p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-sm" onclick="Modal.close('${id}')">取消</button>
            <button class="btn btn-danger btn-sm" id="${id}_confirm">確認</button>
          </div>
        </div>`;
      document.body.appendChild(modal);
    }
    document.getElementById(`${id}_title`).textContent = title;
    document.getElementById(`${id}_desc`).textContent  = desc;
    const confirmBtn = document.getElementById(`${id}_confirm`);
    confirmBtn.onclick = () => { Modal.close(id); onConfirm(); };
    this.open(id);
  }
};

/* ══════════════════════════════
   6. 表格分頁工具
══════════════════════════════ */
class TablePager {
  constructor({ containerId, paginationId, perPage = 20 }) {
    this.container   = document.getElementById(containerId);
    this.pagination  = document.getElementById(paginationId);
    this.perPage     = perPage;
    this.currentPage = 1;
    this.total       = 0;
    this.totalPages  = 0;
    this.onPageChange = null;
  }

  render(total, totalPages) {
    this.total      = total;
    this.totalPages = totalPages;
    if (!this.pagination) return;
    if (totalPages <= 1) {
      this.pagination.innerHTML = `<span style="font-size:12px;color:var(--text-muted)">共 ${total} 筆</span>`;
      return;
    }
    let html = `<button class="page-btn" onclick="_pagerGo(${this.currentPage - 1})" ${this.currentPage <= 1 ? 'disabled' : ''}>‹</button>`;
    for (let i = 1; i <= totalPages; i++) {
      if (totalPages > 7 && i > 2 && i < totalPages - 1 && Math.abs(i - this.currentPage) > 1) {
        if (i === 3 || i === totalPages - 2) html += `<span style="color:var(--text-light);padding:0 4px;">…</span>`;
        continue;
      }
      html += `<button class="page-btn ${i === this.currentPage ? 'active' : ''}" onclick="_pagerGo(${i})">${i}</button>`;
    }
    html += `<button class="page-btn" onclick="_pagerGo(${this.currentPage + 1})" ${this.currentPage >= totalPages ? 'disabled' : ''}>›</button>`;
    html += `<span style="font-size:12px;color:var(--text-muted);margin-left:8px;">共 ${total} 筆</span>`;
    this.pagination.innerHTML = html;
    window._pagerGo = (p) => { this.currentPage = p; this.onPageChange?.(p); };
  }
}

/* ══════════════════════════════
   7. 狀態工具
══════════════════════════════ */
const Status = {
  label: { '待受理':'待受理', '處理中':'處理中', '追蹤中':'追蹤中', '已結案':'已結案' },
  cls:   { '待受理':'pending', '處理中':'processing', '追蹤中':'tracking', '已結案':'closed' },

  badge(status) {
    const cls = this.cls[status] || 'pending';
    return `<span class="badge badge-${cls}">${status || '—'}</span>`;
  },

  options(current = '') {
    return Object.keys(this.label).map(s =>
      `<option value="${s}" ${s === current ? 'selected' : ''}>${s}</option>`
    ).join('');
  }
};

/* ══════════════════════════════
   8. 日期工具
══════════════════════════════ */
const DateUtil = {
  fmt(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    return `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}`;
  },
  fmtFull(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    return `${this.fmt(iso)} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  },
  diffDays(from, to = new Date()) {
    const a = new Date(from), b = new Date(to);
    return Math.max(0, Math.floor((b - a) / 86400000));
  }
};

/* ══════════════════════════════
   9. 圖片上傳元件
══════════════════════════════ */
class ImageUploader {
  constructor({ zoneId, previewId, caseId, type }) {
    this.zone    = document.getElementById(zoneId);
    this.preview = document.getElementById(previewId);
    this.caseId  = caseId;
    this.type    = type;  // 'before' | 'after'
    this.images  = [];
    this._bind();
  }

  _bind() {
    if (!this.zone) return;
    this.zone.addEventListener('click', () => this._pickFile());
    this.zone.addEventListener('dragover',  e => { e.preventDefault(); this.zone.classList.add('dragover'); });
    this.zone.addEventListener('dragleave', () => this.zone.classList.remove('dragover'));
    this.zone.addEventListener('drop',      e => { e.preventDefault(); this.zone.classList.remove('dragover'); this._handleFiles(e.dataTransfer.files); });
  }

  _pickFile() {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'image/*'; input.multiple = true;
    input.onchange = e => this._handleFiles(e.target.files);
    input.click();
  }

  async _handleFiles(files) {
    for (const file of files) {
      if (!['image/jpeg','image/png','image/webp'].includes(file.type)) {
        toast.warn(`不支援的格式：${file.name}`); continue;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.warn(`檔案過大（限 10MB）：${file.name}`); continue;
      }
      await this._upload(file);
    }
  }

  async _upload(file) {
    const idx = this.images.length;
    this.images.push({ url: null, loading: true });
    this._renderPreview();

    const result = await API.uploadImage(this.caseId, this.type, file);
    if (result?.success) {
      this.images[idx] = { url: result.secure_url, loading: false };
      toast.success('圖片上傳成功');
    } else {
      this.images.splice(idx, 1);
      toast.error('圖片上傳失敗，請重試');
    }
    this._renderPreview();
  }

  _renderPreview() {
    if (!this.preview) return;
    this.preview.innerHTML = this.images.map((img, i) => img.loading
      ? `<div class="img-preview-item" style="display:flex;align-items:center;justify-content:center;background:var(--bg-dark)"><div class="spinner"></div></div>`
      : `<div class="img-preview-item">
           <img src="${img.url}" alt="圖片">
           <div class="img-preview-del" onclick="_imgDel(${i})">✕</div>
         </div>`
    ).join('');
    window._imgDel = (i) => { this.images.splice(i, 1); this._renderPreview(); };
  }

  getUrls() { return this.images.filter(i => !i.loading).map(i => i.url); }
}

/* ══════════════════════════════
   10. 初始化（頁面 load）
══════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  Sidebar.init();
  // ESC 關閉 modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.querySelectorAll('.modal-backdrop.open').forEach(el => el.classList.remove('open'));
  });
  // 背景點擊關閉 modal
  document.querySelectorAll('.modal-backdrop').forEach(el => {
    el.addEventListener('click', function(e) { if (e.target === this) { this.classList.remove('open'); document.body.style.overflow = ''; } });
  });
});
