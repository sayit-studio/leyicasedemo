(function () {
  const MOBILE_BREAKPOINT = 768;

  function canShowPage(page) {
    return page.page_type === 'section' && document.getElementById(`page-${page.slug}`);
  }

  function canLinkExternalPage(page) {
    return page.page_type === 'external' && page.slug;
  }

  function navLinkMarkup(page, extraClass = '') {
    if (canShowPage(page)) {
      return `<a class="nav-link ${extraClass}" href="#" data-page-slug="${page.slug}" onclick="showPage('${page.slug}');return false;">${page.nav_label}</a>`;
    }

    if (canLinkExternalPage(page)) {
      return `<a class="nav-link ${extraClass}" href="${page.slug}" data-page-slug="${page.slug}">${page.nav_label}</a>`;
    }

    return `<span class="nav-link nav-link-muted ${extraClass}" data-page-slug="${page.slug}" title="第一版僅提供導覽結構">${page.nav_label}</span>`;
  }

  function renderDesktopNav(tree) {
    return tree.map(page => {
      if (page.children?.length) {
        const childLinks = page.children.map(child => navLinkMarkup(child, 'nav-child-link')).join('');
        return `
          <div class="nav-group" data-page-group="${page.id}">
            <button class="nav-link nav-parent" type="button" data-parent-slug="${page.slug}">
              <span>${page.nav_label}</span>
              <span class="nav-caret">▾</span>
            </button>
            <div class="nav-children">
              ${childLinks}
            </div>
          </div>
        `;
      }

      return navLinkMarkup(page);
    }).join('');
  }

  function renderMobileNav(tree) {
    return tree.map(page => {
      if (page.children?.length) {
        const children = page.children.map(child => {
          if (canShowPage(child)) {
            return `<a class="nav-link nav-link-child" href="#" data-page-slug="${child.slug}" onclick="showPage('${child.slug}');return false;">${child.nav_icon ? `${child.nav_icon} ` : ''}${child.nav_label}</a>`;
          }
          if (canLinkExternalPage(child)) {
            return `<a class="nav-link nav-link-child" href="${child.slug}" data-page-slug="${child.slug}">${child.nav_icon ? `${child.nav_icon} ` : ''}${child.nav_label}</a>`;
          }
          return `<span class="nav-link nav-link-child nav-link-muted" data-page-slug="${child.slug}">${child.nav_icon ? `${child.nav_icon} ` : ''}${child.nav_label}</span>`;
        }).join('');

        return `
          <div class="mobile-nav-group">
            <div class="mobile-nav-group-title">${page.nav_icon ? `${page.nav_icon} ` : ''}${page.nav_label}</div>
            ${children}
          </div>
        `;
      }

      if (canShowPage(page)) {
        return `<a class="nav-link" href="#" data-page-slug="${page.slug}" onclick="showPage('${page.slug}');return false;">${page.nav_icon ? `${page.nav_icon} ` : ''}${page.nav_label}</a>`;
      }

      if (canLinkExternalPage(page)) {
        return `<a class="nav-link" href="${page.slug}" data-page-slug="${page.slug}">${page.nav_icon ? `${page.nav_icon} ` : ''}${page.nav_label}</a>`;
      }

      return `<span class="nav-link nav-link-muted" data-page-slug="${page.slug}">${page.nav_icon ? `${page.nav_icon} ` : ''}${page.nav_label}</span>`;
    }).join('');
  }

  function renderSiteNavigation() {
    const tree = SITE_PAGE_STORE.buildTree(SITE_PAGE_STORE.read(), { visibleOnly: true });
    const desktop = document.querySelector('.nav-links');
    const mobile = document.getElementById('mobileNav');

    if (desktop) {
      desktop.innerHTML = `${renderDesktopNav(tree)}<a class="nav-link nav-cta" href="form.html">立即陳情</a>`;
    }

    if (mobile) {
      mobile.innerHTML = `${renderMobileNav(tree)}<a class="nav-link nav-cta" href="form.html">立即陳情</a>`;
    }
  }

  function syncNavigationActive(activeSlug) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.pageSlug === activeSlug);
    });

    document.querySelectorAll('.nav-group').forEach(group => {
      const activeChild = group.querySelector(`.nav-link[data-page-slug="${activeSlug}"]`);
      group.classList.toggle('is-active', Boolean(activeChild));
      const parentButton = group.querySelector('.nav-parent');
      if (parentButton) parentButton.classList.toggle('active', Boolean(activeChild));
    });
  }

  function bindDesktopGroupToggle() {
    document.querySelectorAll('.nav-parent').forEach(button => {
      button.addEventListener('click', () => {
        if (window.innerWidth <= MOBILE_BREAKPOINT) return;
        const group = button.closest('.nav-group');
        if (!group) return;
        const nextState = !group.classList.contains('is-open');
        document.querySelectorAll('.nav-group').forEach(item => item.classList.remove('is-open'));
        if (nextState) group.classList.add('is-open');
      });
    });

    document.addEventListener('click', event => {
      if (!event.target.closest('.nav-group')) {
        document.querySelectorAll('.nav-group').forEach(item => item.classList.remove('is-open'));
      }
    });
  }

  function wrapShowPage() {
    if (typeof window.showPage !== 'function') return;
    const originalShowPage = window.showPage;
    window.showPage = function wrappedShowPage(name) {
      originalShowPage(name);
      syncNavigationActive(name);
    };
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderSiteNavigation();
    bindDesktopGroupToggle();
    wrapShowPage();

    const activeSection = document.querySelector('.page-section.active');
    const activeSlug = activeSection?.id?.replace(/^page-/, '') || 'home';
    syncNavigationActive(activeSlug);
  });
})();
