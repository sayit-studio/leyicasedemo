const PageManager = {
  pages: [],
  editingId: null,

  init() {
    if (!Auth.require('admin')) return;
    this.pages = SITE_PAGE_STORE.read();
    this.render();
    this.bindForm();
  },

  render() {
    this.renderSummary();
    this.renderValidation();
    this.renderTable();
    this.renderTree();
    this.renderParentOptions();
  },

  renderSummary() {
    const wrap = document.getElementById('schemaSummary');
    if (!wrap) return;

    wrap.innerHTML = SITE_PAGE_SCHEMA_V1.map(field => `
      <div class="schema-item">
        <div class="schema-item-key">${field.key}</div>
        <div class="schema-item-meta">${field.type}${field.required ? ' · required' : ''}</div>
        <div class="schema-item-note">${field.note}</div>
      </div>
    `).join('');
  },

  validatePages() {
    const errors = [];
    const slugMap = new Map();
    const idMap = new Map(this.pages.map(page => [page.id, page]));

    this.pages.forEach(page => {
      if (!page.title) errors.push(`${page.id}: title 不可空白`);
      if (!page.slug) errors.push(`${page.id}: slug 不可空白`);
      if (!page.nav_label) errors.push(`${page.id}: nav_label 不可空白`);
      if (!page.template_key) errors.push(`${page.id}: template_key 不可空白`);

      if (slugMap.has(page.slug)) errors.push(`${page.id}: slug 與 ${slugMap.get(page.slug)} 重複`);
      else slugMap.set(page.slug, page.id);

      if (page.parent_id) {
        const parent = idMap.get(page.parent_id);
        if (!parent) errors.push(`${page.id}: parent_id 找不到對應父頁`);
        if (parent?.parent_id) errors.push(`${page.id}: 第一版只支援 2 層，父頁不可是子頁`);
      }
    });

    return errors;
  },

  renderValidation() {
    const wrap = document.getElementById('pageValidation');
    if (!wrap) return;

    const errors = this.validatePages();
    if (!errors.length) {
      wrap.className = 'validation-box is-ok';
      wrap.innerHTML = '<strong>資料檢查通過</strong><span>slug 唯一、必填欄位與 2 層限制目前都符合。</span>';
      return;
    }

    wrap.className = 'validation-box is-error';
    wrap.innerHTML = `<strong>資料檢查發現 ${errors.length} 個問題</strong>${errors.map(error => `<span>${error}</span>`).join('')}`;
  },

  renderTable() {
    const tbody = document.getElementById('pageTableBody');
    if (!tbody) return;

    if (!this.pages.length) {
      tbody.innerHTML = '<tr><td colspan="8"><div class="empty-state"><div class="empty-title">目前沒有頁面資料</div><div class="empty-desc">可以先重置為預設頁面，再開始調整。</div></div></td></tr>';
      return;
    }

    const parentMap = new Map(this.pages.map(page => [page.id, page]));

    tbody.innerHTML = this.pages.map(page => {
      const parent = page.parent_id ? parentMap.get(page.parent_id) : null;
      const depth = parent ? 1 : 0;
      return `
        <tr draggable="true" data-page-id="${page.id}" ondragstart="PageManager.onDragStart(event)" ondragover="PageManager.onDragOver(event)" ondrop="PageManager.onDrop(event)" ondragend="PageManager.onDragEnd(event)">
          <td>
            <div class="page-name-cell" style="padding-left:${depth * 20}px;">
              <button class="drag-handle" type="button" title="同層拖曳排序">⋮⋮</button>
              <span class="page-depth-badge">${depth === 0 ? 'L1' : 'L2'}</span>
              <div>
                <div class="page-title">${page.title}</div>
                <div class="page-slug">/${page.slug}</div>
              </div>
            </div>
          </td>
          <td>${page.nav_label}</td>
          <td>${parent ? parent.title : '頂層'}</td>
          <td><input class="table-input" type="number" min="0" step="10" value="${page.sort_order}" onchange="PageManager.updateSort('${page.id}', this.value)"></td>
          <td><span class="page-pill">${page.page_type}</span></td>
          <td><span class="page-pill">${page.template_key}</span></td>
          <td>
            <button class="neu-toggle ${page.is_visible ? 'on' : ''}" type="button" onclick="PageManager.toggleVisible('${page.id}')"></button>
          </td>
          <td>
            <button class="btn btn-sm" type="button" onclick="PageManager.openEditor('${page.id}')">編輯</button>
            <button class="btn btn-sm" type="button" onclick="PageManager.deletePage('${page.id}')">刪除</button>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderTree() {
    const wrap = document.getElementById('pageTreePreview');
    if (!wrap) return;

    const tree = SITE_PAGE_STORE.buildTree(this.pages);
    wrap.innerHTML = tree.map(page => {
      const children = (page.children || []).map(child => `
        <div class="tree-child">
          <span>${child.nav_label}</span>
          <span class="tree-meta">${child.is_visible ? '顯示' : '隱藏'} · /${child.slug}</span>
        </div>
      `).join('');

      return `
        <div class="tree-root">
          <div class="tree-root-row">
            <span>${page.nav_label}</span>
            <span class="tree-meta">${page.is_visible ? '顯示' : '隱藏'} · /${page.slug}</span>
          </div>
          ${children || '<div class="tree-empty">無子頁</div>'}
        </div>
      `;
    }).join('');
  },

  renderParentOptions(selectedId = '') {
    const parentSelect = document.getElementById('pageParentId');
    if (!parentSelect) return;

    const options = this.pages
      .filter(page => !page.parent_id && page.id !== this.editingId)
      .map(page => `<option value="${page.id}" ${selectedId === page.id ? 'selected' : ''}>${page.title}</option>`)
      .join('');

    parentSelect.innerHTML = `<option value="">頂層頁面</option>${options}`;
  },

  bindForm() {
    const form = document.getElementById('pageEditorForm');
    if (!form) return;

    form.addEventListener('submit', event => {
      event.preventDefault();
      this.saveEditor();
    });
  },

  persist() {
    this.pages = SITE_PAGE_STORE.write(this.pages);
    this.render();
  },

  updateSort(id, value) {
    const target = this.pages.find(page => page.id === id);
    if (!target) return;
    target.sort_order = Number(value) || 0;
    this.persist();
    toast.success('排序已更新');
  },

  reorderWithinParent(sourceId, targetId) {
    if (sourceId === targetId) return false;

    const source = this.pages.find(page => page.id === sourceId);
    const target = this.pages.find(page => page.id === targetId);
    if (!source || !target) return false;

    const sourceParent = source.parent_id || null;
    const targetParent = target.parent_id || null;
    if (sourceParent !== targetParent) {
      toast.warn('第一版拖曳排序只支援同一父層內調整');
      return false;
    }

    const siblings = SITE_PAGE_STORE.sortPages(this.pages.filter(page => (page.parent_id || null) === sourceParent));
    const otherSiblings = siblings.filter(page => page.id !== sourceId);
    const targetIndex = otherSiblings.findIndex(page => page.id === targetId);
    otherSiblings.splice(targetIndex, 0, source);

    otherSiblings.forEach((page, index) => {
      page.sort_order = (index + 1) * 10;
    });

    this.persist();
    return true;
  },

  onDragStart(event) {
    const row = event.currentTarget;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', row.dataset.pageId);
    row.classList.add('is-dragging');
  },

  onDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    event.currentTarget.classList.add('is-drop-target');
  },

  onDrop(event) {
    event.preventDefault();
    const sourceId = event.dataTransfer.getData('text/plain');
    const targetId = event.currentTarget.dataset.pageId;
    document.querySelectorAll('.is-drop-target').forEach(row => row.classList.remove('is-drop-target'));
    if (this.reorderWithinParent(sourceId, targetId)) toast.success('同層排序已更新');
  },

  onDragEnd() {
    document.querySelectorAll('.is-dragging, .is-drop-target').forEach(row => {
      row.classList.remove('is-dragging', 'is-drop-target');
    });
  },

  toggleVisible(id) {
    const target = this.pages.find(page => page.id === id);
    if (!target) return;

    target.is_visible = !target.is_visible;
    if (!target.is_visible) {
      this.pages.forEach(page => {
        if (page.parent_id === id) page.is_visible = false;
      });
    }
    this.persist();
    toast.success('顯示狀態已更新');
  },

  deletePage(id) {
    const target = this.pages.find(page => page.id === id);
    if (!target) return;

    const childCount = this.pages.filter(page => page.parent_id === id).length;
    const message = childCount
      ? `會同時刪除「${target.title}」與 ${childCount} 個子頁。此動作只影響目前瀏覽器的本地 mock。`
      : `會刪除「${target.title}」。此動作只影響目前瀏覽器的本地 mock。`;

    Modal.confirm('刪除頁面', message, () => {
      this.pages = this.pages.filter(page => page.id !== id && page.parent_id !== id);
      this.persist();
      toast.success('頁面已刪除');
    });
  },

  openCreate() {
    this.editingId = null;
    document.getElementById('pageEditorTitle').textContent = '新增頁面';
    document.getElementById('pageEditorForm').reset();
    document.getElementById('pagePageType').value = 'section';
    document.getElementById('pageVisible').checked = true;
    this.renderParentOptions('');
    Modal.open('pageEditorModal');
  },

  openEditor(id) {
    const page = this.pages.find(item => item.id === id);
    if (!page) return;

    this.editingId = id;
    document.getElementById('pageEditorTitle').textContent = '編輯頁面';
    document.getElementById('pageTitle').value = page.title;
    document.getElementById('pageSlug').value = page.slug;
    document.getElementById('pageSortOrder').value = page.sort_order;
    document.getElementById('pagePageType').value = page.page_type;
    document.getElementById('pageTemplateKey').value = page.template_key;
    document.getElementById('pageNavLabel').value = page.nav_label;
    document.getElementById('pageNavIcon').value = page.nav_icon;
    document.getElementById('pageSeoTitle').value = page.seo_title;
    document.getElementById('pageSeoDescription').value = page.seo_description;
    document.getElementById('pageVisible').checked = page.is_visible;
    this.renderParentOptions(page.parent_id || '');
    Modal.open('pageEditorModal');
  },

  saveEditor() {
    const title = document.getElementById('pageTitle').value.trim();
    const slug = document.getElementById('pageSlug').value.trim();
    const parentId = document.getElementById('pageParentId').value || null;
    const sortOrder = Number(document.getElementById('pageSortOrder').value || 0);
    const pageType = document.getElementById('pagePageType').value;
    const templateKey = document.getElementById('pageTemplateKey').value.trim();
    const navLabel = document.getElementById('pageNavLabel').value.trim();
    const navIcon = document.getElementById('pageNavIcon').value.trim();
    const seoTitle = document.getElementById('pageSeoTitle').value.trim();
    const seoDescription = document.getElementById('pageSeoDescription').value.trim();
    const isVisible = document.getElementById('pageVisible').checked;

    if (!title || !slug || !templateKey || !navLabel) {
      toast.warn('請先填完標題、slug、template_key 與導覽名稱');
      return;
    }

    const duplicateSlug = this.pages.find(page => page.slug === slug && page.id !== this.editingId);
    if (duplicateSlug) {
      toast.warn('slug 不可重複');
      return;
    }

    const parent = parentId ? this.pages.find(page => page.id === parentId) : null;
    if (parent?.parent_id) {
      toast.warn('第一版只支援 2 層，父頁不可再掛在子頁下');
      return;
    }

    const payload = {
      id: this.editingId || SITE_PAGE_STORE.nextId(this.pages),
      title,
      slug,
      parent_id: parentId,
      sort_order: sortOrder,
      is_visible: isVisible,
      page_type: pageType,
      template_key: templateKey,
      nav_label: navLabel,
      nav_icon: navIcon,
      seo_title: seoTitle,
      seo_description: seoDescription,
    };

    if (this.editingId) {
      this.pages = this.pages.map(page => page.id === this.editingId ? payload : page);
    } else {
      this.pages = [...this.pages, payload];
    }

    this.persist();
    Modal.close('pageEditorModal');
    toast.success('頁面設定已保存');
  },

  resetDefaults() {
    Modal.confirm('重置頁面設定', '會把目前本地 mock 的頁面設定還原為預設值，僅影響此瀏覽器。', () => {
      this.pages = SITE_PAGE_STORE.reset();
      this.render();
      toast.success('已重置為預設頁面');
    });
  },
};

document.addEventListener('DOMContentLoaded', () => PageManager.init());
