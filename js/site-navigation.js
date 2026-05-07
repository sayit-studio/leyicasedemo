(function () {
  const MOBILE_BREAKPOINT = 768;

  function canShowPage(page) {
    if (page.id === 'achievement-wall' || page.slug === 'achievement-wall') return false;
    return page.page_type === 'section' && document.getElementById(`page-${page.slug}`);
  }

  function externalHrefForPage(page) {
    if (page.id === 'achievement-wall' || page.slug === 'achievement-wall') {
      return 'leyi/achievements.html';
    }
    return page.slug;
  }

  function canLinkExternalPage(page) {
    return (page.page_type === 'external' && page.slug) || page.id === 'achievement-wall' || page.slug === 'achievement-wall';
  }

  function navLinkMarkup(page, extraClass = '') {
    if (canShowPage(page)) {
      return `<a class="nav-link ${extraClass}" href="#" data-page-slug="${page.slug}" onclick="showPage('${page.slug}');return false;">${page.nav_label}</a>`;
    }

    if (canLinkExternalPage(page)) {
      return `<a class="nav-link ${extraClass}" href="${externalHrefForPage(page)}" data-page-slug="${page.slug}">${page.nav_label}</a>`;
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
            return `<a class="nav-link nav-link-child" href="${externalHrefForPage(child)}" data-page-slug="${child.slug}">${child.nav_icon ? `${child.nav_icon} ` : ''}${child.nav_label}</a>`;
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
        return `<a class="nav-link" href="${externalHrefForPage(page)}" data-page-slug="${page.slug}">${page.nav_icon ? `${page.nav_icon} ` : ''}${page.nav_label}</a>`;
      }

      return `<span class="nav-link nav-link-muted" data-page-slug="${page.slug}">${page.nav_icon ? `${page.nav_icon} ` : ''}${page.nav_label}</span>`;
    }).join('');
  }

  function renderSiteNavigation() {
    const tree = SITE_PAGE_STORE.buildTree(SITE_PAGE_STORE.read(), { visibleOnly: true });
    const navTree = tree.filter(page => page.slug !== 'case-study' && page.id !== 'case-study');
    const desktop = document.querySelector('.nav-links');
    const mobile = document.getElementById('mobileNav');

    if (desktop) {
      desktop.innerHTML = `${renderDesktopNav(navTree)}<a class="nav-link nav-cta" href="#" data-page-slug="case-study" onclick="showPage('case-study');return false;">案例展示</a>`;
    }

    if (mobile) {
      mobile.innerHTML = `${renderMobileNav(navTree)}<a class="nav-link nav-cta" href="#" data-page-slug="case-study" onclick="showPage('case-study');return false;">案例展示</a>`;
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
