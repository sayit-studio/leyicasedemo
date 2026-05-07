/* ════════════════════════════════════════
   Demo Site Template Config
   所有客戶可複製設定從這裡開始
   ════════════════════════════════════════ */

const SITE_TEMPLATE_CONFIG = {
  siteKey: 'leyicasedemo',
  systemMode: 'achievement',

  brand: {
    name: '樂藝數位服務處',
    shortName: '樂藝數位服務處',
    adminName: '市民服務平台',
    icon: '🏛️',
    tagline: '民代服務處數位化工具',
    footerTagline: '陳情 · LINE · 任務 · 政績，讓服務流程可追蹤',
    adminSubtitle: 'Admin Console',
    copyrightName: '樂藝數位服務處',
  },

  integrations: {
    webhookBase: 'https://drwu.zeabur.app',
    webhookMode: 'webhook',
    webhookPrefix: 'leyicasedemo',
    lineUrl: 'https://lin.ee/Q9cWSP5',
  },

  features: {
    achievements: true,
    inspections: true,
    interpellations: true,
    proposals: true,
    faq: true,
  },

  content: {
    heroTitle: ['民代服務處', '數位化工具展示'],
    heroSub: '把陳情、LINE、任務與政績整理成可追蹤的工作流程。',
    heroFigure: false,
    lineLinkLabel: 'LINE 官方帳號',
    flowSteps: [
      { num: '01', icon: '📝', title: '填寫陳情表單', desc: '說明問題地點、類型與詳細內容，留下聯絡資料方便後續溝通。' },
      { num: '02', icon: '🎫', title: '取得案件編號', desc: '送出後系統自動產生專屬案件編號，請截圖保存以便查詢進度。' },
      { num: '03', icon: '⚙️', title: '幕僚受理追蹤', desc: '專人審核案件並轉交相關單位，每個處理階段都會更新紀錄。' },
      { num: '04', icon: '✅', title: '結果通知回覆', desc: '案件處理完成後，公開說明及結果回覆將同步更新在查詢頁面。' },
    ],
    faqItems: [
      { q: '樂藝數位服務處想解決什麼問題？', a: '協助民代與里長把日常服務流程變得可追蹤、可分工、可呈現，讓民眾感受到問題有人接、進度查得到、成果看得見。' },
      { q: '一定需要官方 LINE 嗎？', a: '需要。官方 LINE 是服務處與民眾建立長期溝通的重要平台，可集中陳情提醒、活動推播、報名連結、成果分享與互動紀錄。' },
      { q: '一定要一次導入全部工具嗎？', a: '不一定。可先從最能讓民眾有感的一項開始，再逐步加入任務管理、會員經營與案件整合。' },
      { q: '民代任務管理系統包含哪些內容？', a: '包含活動管理、行程日曆、LINE會員管理、陳情案件管理與幕僚任務追蹤，讓每件事都知道誰負責、做到哪裡、下一步是什麼。' },
    ],
  },

  navigation: {
    publicItems: [
      { id: 'home', label: '首頁', icon: '🏠' },
      { id: 'petition-system', label: '陳情系統網站', icon: '📋' },
      { id: 'achievement-wall', label: '政績牆', icon: '🏆' },
      { id: 'line-forward', label: 'LINE訊息轉發工具', icon: '💬' },
      { id: 'office-task', label: '民代任務管理系統', icon: '🗓️' },
      { id: 'case-study', label: '案例展示', icon: '🖼️' },
      { id: 'faq', label: '常見問題', icon: '❓' },
    ],
  },

  petitions: {
    caseTypes: [
      '交通運輸', '公共設施', '衛福勞動', '文教科技',
      '環境建管', '警消政風', '市政議題', '里鄰事務', '其他服務',
    ],
    caseAreas: [
      '中區', '東區', '西區', '南區', '北區',
      '西屯區', '南屯區', '北屯區', '豐原區', '東勢區',
      '大甲區', '清水區', '沙鹿區', '梧棲區', '后里區',
      '神岡區', '潭子區', '大雅區', '新社區', '石岡區',
      '外埔區', '大安區', '烏日區', '大肚區', '龍井區',
      '霧峰區', '太平區', '大里區', '和平區',
    ],
    staticStats: {
      inspections: 156,
      interpellations: 83,
      proposals: 29,
    },
  },

  seo: {
    homeTitle: '樂藝數位服務處｜民代服務處數位化工具展示',
    homeDescription: '樂藝數位服務處提供民代與幕僚使用的陳情、政績、LINE訊息轉發與任務管理工具，協助服務處把民眾服務流程數位化。',
    ogImage: './leyi/assets/brand/logo.png',
    achievementsTitle: '政績專區 — 樂藝數位服務處',
    achievementsDescription: '樂藝數位服務處政績一覽，公開透明呈現每一項服務成果。',
    formTitle: '填寫陳情表單 — 樂藝數位服務處',
    loginTitle: '登入 — 市民服務平台管理後台',
  },
};

const SITE_UTILS = {
  webhook(path = '') {
    const base = SITE_TEMPLATE_CONFIG.integrations.webhookBase.replace(/\/$/, '');
    const mode = String(SITE_TEMPLATE_CONFIG.integrations.webhookMode || 'webhook').replace(/^\/|\/$/g, '');
    const prefix = SITE_TEMPLATE_CONFIG.integrations.webhookPrefix.replace(/^\/|\/$/g, '');
    const normalizedPath = String(path).replace(/^\/+/, '');
    return normalizedPath ? `${base}/${mode}/${prefix}/${normalizedPath}` : `${base}/${mode}/${prefix}`;
  },

  currentYear() {
    return new Date().getFullYear();
  },

  footerCopyright() {
    return `© ${this.currentYear()} ${SITE_TEMPLATE_CONFIG.brand.copyrightName} · All rights reserved.`;
  },
};

const SITE_SETTINGS_SCHEMA_V1 = [
  { key: 'siteKey', notion: '網站代碼', type: 'string' },
  { key: 'brandName', notion: '品牌名稱', type: 'string' },
  { key: 'brandShortName', notion: '品牌簡稱', type: 'string' },
  { key: 'adminName', notion: '後台名稱', type: 'string' },
  { key: 'systemMode', notion: '系統模式', type: 'string' },
  { key: 'primaryColor', notion: '主色', type: 'string' },
  { key: 'accentColor', notion: '輔助色', type: 'string' },
  { key: 'logoUrl', notion: 'Logo圖片', type: 'url' },
  { key: 'heroTitleLine1', notion: '首頁標題', type: 'string' },
  { key: 'heroTitleLine2', notion: '首頁標題', type: 'string' },
  { key: 'heroSubtitle', notion: '首頁副標', type: 'string' },
  { key: 'lineUrl', notion: 'LINE連結', type: 'url' },
  { key: 'webhookBase', notion: 'WebhookBase', type: 'url' },
  { key: 'webhookPrefix', notion: 'WebhookPrefix', type: 'string' },
  { key: 'inspectionsCount', notion: '地方會勘數量', type: 'number' },
  { key: 'interpellationsCount', notion: '國會質詢數量', type: 'number' },
  { key: 'proposalsCount', notion: '國會提案數量', type: 'number' },
  { key: 'isActive', notion: '是否啟用', type: 'boolean' },
];

const SITE_SETTINGS_STORE = {
  storageKey: `${SITE_TEMPLATE_CONFIG.siteKey}:site_settings:v1`,
  schema: SITE_SETTINGS_SCHEMA_V1,

  defaults() {
    return {
      siteKey: SITE_TEMPLATE_CONFIG.siteKey,
      brandName: SITE_TEMPLATE_CONFIG.brand.name,
      brandShortName: SITE_TEMPLATE_CONFIG.brand.shortName,
      adminName: SITE_TEMPLATE_CONFIG.brand.adminName,
      systemMode: SITE_TEMPLATE_CONFIG.systemMode,
      primaryColor: '#E87F24',
      accentColor: '#FFC81E',
      logoUrl: 'leyi/assets/brand/logo.png',
      heroTitleLine1: SITE_TEMPLATE_CONFIG.content.heroTitle[0],
      heroTitleLine2: SITE_TEMPLATE_CONFIG.content.heroTitle[1],
      heroSubtitle: SITE_TEMPLATE_CONFIG.content.heroSub,
      lineUrl: SITE_TEMPLATE_CONFIG.integrations.lineUrl,
      webhookBase: SITE_TEMPLATE_CONFIG.integrations.webhookBase,
      webhookMode: SITE_TEMPLATE_CONFIG.integrations.webhookMode,
      webhookPrefix: SITE_TEMPLATE_CONFIG.integrations.webhookPrefix,
      inspectionsCount: SITE_TEMPLATE_CONFIG.petitions.staticStats.inspections,
      interpellationsCount: SITE_TEMPLATE_CONFIG.petitions.staticStats.interpellations,
      proposalsCount: SITE_TEMPLATE_CONFIG.petitions.staticStats.proposals,
      isActive: true,
    };
  },

  normalize(input = {}) {
    const fallback = this.defaults();
    const source = input.settings || input;
    const requestedSiteKey = String(source.siteKey || source.siteCode || fallback.siteKey);
    const rawBrandName = String(source.brandName || source.name || fallback.brandName);
    const rawShortName = String(source.brandShortName || source.shortName || source.brandName || fallback.brandShortName);
    const rawHeroTitleLine1 = String(source.heroTitleLine1 || fallback.heroTitleLine1);
    const rawHeroTitleLine2 = String(source.heroTitleLine2 || fallback.heroTitleLine2);
    const rawHeroSubtitle = String(source.heroSubtitle || source.heroSub || fallback.heroSubtitle);
    const rawLogoUrl = String(source.logoUrl || fallback.logoUrl);
    const isLeyiDemo = requestedSiteKey === 'leyicasedemo';
    const brandName = isLeyiDemo && ['數位服務處', '數位服務處 Demo'].includes(rawBrandName)
      ? '樂藝數位服務處'
      : rawBrandName;
    const brandShortName = isLeyiDemo && ['數位服務處', '數位服務處 Demo'].includes(rawShortName)
      ? '樂藝數位服務處'
      : rawShortName;
    const heroTitleLine1 = isLeyiDemo && rawHeroTitleLine1.includes('數位時代')
      ? '民代服務處'
      : rawHeroTitleLine1;
    const heroTitleLine2 = isLeyiDemo && rawHeroTitleLine2.includes('市民服務')
      ? '數位化工具展示'
      : rawHeroTitleLine2;
    const heroSubtitle = isLeyiDemo && rawHeroSubtitle.includes('每一件')
      ? '把陳情、LINE、任務與政績整理成可追蹤的工作流程。'
      : rawHeroSubtitle;
    const logoUrl = isLeyiDemo && rawLogoUrl.includes('og-image')
      ? 'leyi/assets/brand/logo.png'
      : rawLogoUrl;
    return {
      ...fallback,
      siteKey: requestedSiteKey,
      brandName,
      brandShortName,
      adminName: String(source.adminName || fallback.adminName),
      systemMode: String(source.systemMode || fallback.systemMode),
      primaryColor: String(source.primaryColor || fallback.primaryColor),
      accentColor: String(source.accentColor || fallback.accentColor),
      logoUrl,
      heroTitleLine1,
      heroTitleLine2,
      heroSubtitle,
      lineUrl: String(source.lineUrl || fallback.lineUrl),
      webhookBase: String(source.webhookBase || source.n8nBase || fallback.webhookBase).replace(/\/$/, ''),
      webhookMode: String(source.webhookMode || fallback.webhookMode || 'webhook'),
      webhookPrefix: String(source.webhookPrefix || source.prefix || fallback.webhookPrefix).replace(/^\/|\/$/g, ''),
      inspectionsCount: Number(source.inspectionsCount ?? fallback.inspectionsCount) || 0,
      interpellationsCount: Number(source.interpellationsCount ?? fallback.interpellationsCount) || 0,
      proposalsCount: Number(source.proposalsCount ?? fallback.proposalsCount) || 0,
      isActive: source.isActive !== false,
    };
  },

  readLocal() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? this.normalize(JSON.parse(raw)) : this.defaults();
    } catch (error) {
      console.warn('[SITE_SETTINGS_STORE] Failed to read local settings.', error);
      return this.defaults();
    }
  },

  writeLocal(settings) {
    const normalized = this.normalize(settings);
    localStorage.setItem(this.storageKey, JSON.stringify(normalized));
    return normalized;
  },

  async loadRemote() {
    try {
      const url = SITE_UTILS.webhook('settings');
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error(`settings webhook HTTP ${res.status}`);
      const data = await res.json();
      if (!data?.success || !data.settings) throw new Error('settings webhook returned empty settings');
      const settings = this.normalize(data.settings);
      this.writeLocal(settings);
      return settings;
    } catch (error) {
      console.warn('[SITE_SETTINGS_STORE] Remote settings unavailable, using local/default settings.', error);
      return this.readLocal();
    }
  },

  apply(settings) {
    const s = this.normalize(settings);
    SITE_TEMPLATE_CONFIG.siteKey = s.siteKey;
    SITE_TEMPLATE_CONFIG.systemMode = s.systemMode;
    SITE_TEMPLATE_CONFIG.brand.name = s.brandName;
    SITE_TEMPLATE_CONFIG.brand.shortName = s.brandShortName;
    SITE_TEMPLATE_CONFIG.brand.adminName = s.adminName;
    SITE_TEMPLATE_CONFIG.brand.copyrightName = s.brandName;
    SITE_TEMPLATE_CONFIG.content.heroTitle = [s.heroTitleLine1, s.heroTitleLine2];
    SITE_TEMPLATE_CONFIG.content.heroSub = s.heroSubtitle;
    SITE_TEMPLATE_CONFIG.integrations.lineUrl = s.lineUrl;
    SITE_TEMPLATE_CONFIG.integrations.webhookBase = s.webhookBase;
    SITE_TEMPLATE_CONFIG.integrations.webhookMode = s.webhookMode;
    SITE_TEMPLATE_CONFIG.integrations.webhookPrefix = s.webhookPrefix;
    SITE_TEMPLATE_CONFIG.petitions.staticStats.inspections = s.inspectionsCount;
    SITE_TEMPLATE_CONFIG.petitions.staticStats.interpellations = s.interpellationsCount;
    SITE_TEMPLATE_CONFIG.petitions.staticStats.proposals = s.proposalsCount;

    CONFIG.BRAND_NAME = s.brandName;
    CONFIG.BRAND_SHORT = s.brandShortName;
    CONFIG.LOGO_URL = s.logoUrl;
    CONFIG.SYSTEM_MODE = s.systemMode;
    CONFIG.HERO_TITLE = SITE_TEMPLATE_CONFIG.content.heroTitle;
    CONFIG.HERO_SUB = s.heroSubtitle;
    CONFIG.LINE_URL = s.lineUrl;
    CONFIG.WEBHOOK_BASE = s.webhookBase;
    CONFIG.WEBHOOK_MODE = s.webhookMode;
    CONFIG.WEBHOOK_PREFIX = s.webhookPrefix;
    CONFIG.STAT_STATIC = SITE_TEMPLATE_CONFIG.petitions.staticStats;

    document.documentElement.style.setProperty('--brand-primary', s.primaryColor);
    document.documentElement.style.setProperty('--brand-accent', s.accentColor);
    document.documentElement.style.setProperty('--color-primary', s.primaryColor);
    document.documentElement.style.setProperty('--color-accent', s.accentColor);
    return s;
  },
};

const CONFIG = {
  BRAND_NAME: SITE_TEMPLATE_CONFIG.brand.name,
  BRAND_SHORT: SITE_TEMPLATE_CONFIG.brand.shortName,
  BRAND_ICON: SITE_TEMPLATE_CONFIG.brand.icon,
  LOGO_URL: 'leyi/assets/brand/logo.png',
  BRAND_TAGLINE: SITE_TEMPLATE_CONFIG.brand.tagline,
  SYSTEM_MODE: SITE_TEMPLATE_CONFIG.systemMode,
  HERO_TITLE: SITE_TEMPLATE_CONFIG.content.heroTitle,
  HERO_SUB: SITE_TEMPLATE_CONFIG.content.heroSub,
  HERO_FIGURE: SITE_TEMPLATE_CONFIG.content.heroFigure,
  LINE_URL: SITE_TEMPLATE_CONFIG.integrations.lineUrl,
  WEBHOOK_BASE: SITE_TEMPLATE_CONFIG.integrations.webhookBase,
  WEBHOOK_MODE: SITE_TEMPLATE_CONFIG.integrations.webhookMode,
  WEBHOOK_PREFIX: SITE_TEMPLATE_CONFIG.integrations.webhookPrefix,
  NAV_ITEMS: SITE_TEMPLATE_CONFIG.navigation.publicItems,
  STAT_CARDS: [
    { id: 'totalPetitions', label: '累積服務件數', unit: '件', source: 'dynamic' },
    { id: 'inspections', label: '現場會勘次數', unit: '次', source: 'static' },
    { id: 'interpellations', label: '國會質詢次數', unit: '次', source: 'static' },
    { id: 'proposals', label: '國會提案次數', unit: '次', source: 'static' },
    { id: 'avgDays', label: '平均回覆天數', unit: '天', source: 'dynamic' },
    { id: 'topType', label: '最多陳情類型', unit: '', source: 'dynamic' },
  ],
  STAT_STATIC: SITE_TEMPLATE_CONFIG.petitions.staticStats,
  CASE_TYPES: SITE_TEMPLATE_CONFIG.petitions.caseTypes,
  CASE_AREAS: SITE_TEMPLATE_CONFIG.petitions.caseAreas,
  FLOW_STEPS: SITE_TEMPLATE_CONFIG.content.flowSteps,
  FAQ_ITEMS: SITE_TEMPLATE_CONFIG.content.faqItems,
  OG_TITLE: SITE_TEMPLATE_CONFIG.seo.homeTitle,
  OG_DESCRIPTION: SITE_TEMPLATE_CONFIG.seo.homeDescription,
  OG_IMAGE: SITE_TEMPLATE_CONFIG.seo.ogImage,
};

const SITE_PAGE_SCHEMA_V1 = [
  { key: 'title', type: 'string', required: true, note: '頁面名稱，供後台辨識' },
  { key: 'slug', type: 'string', required: true, note: '前台 section key / 路由鍵，第一版需唯一' },
  { key: 'parent_id', type: 'string|null', required: false, note: '父頁 ID，第一版最多支援 2 層' },
  { key: 'sort_order', type: 'number', required: true, note: '同層排序值，越小越前面' },
  { key: 'is_visible', type: 'boolean', required: true, note: '是否出現在前台導覽' },
  { key: 'page_type', type: 'string', required: true, note: 'section / group / external' },
  { key: 'template_key', type: 'string', required: true, note: '對應模板鍵或 section 類型' },
  { key: 'nav_label', type: 'string', required: true, note: '導覽顯示名稱' },
  { key: 'nav_icon', type: 'string', required: false, note: '導覽圖示或 emoji' },
  { key: 'seo_title', type: 'string', required: false, note: '頁面 SEO 標題' },
  { key: 'seo_description', type: 'string', required: false, note: '頁面 SEO 描述' },
];

const SITE_PAGES_DEFAULT = [
  {
    id: 'home',
    title: '首頁',
    slug: 'home',
    parent_id: null,
    sort_order: 10,
    is_visible: true,
    page_type: 'section',
    template_key: 'home',
    nav_label: '首頁',
    nav_icon: '🏠',
    seo_title: '首頁',
    seo_description: '網站首頁與總覽',
  },
  {
    id: 'products',
    title: '產品服務',
    slug: 'products',
    parent_id: null,
    sort_order: 20,
    is_visible: true,
    page_type: 'group',
    template_key: 'nav_group',
    nav_label: '產品服務',
    nav_icon: '🧩',
    seo_title: '產品服務',
    seo_description: '樂藝數位服務處四大產品服務',
  },
  {
    id: 'petition-system',
    title: '陳情系統網站',
    slug: 'petition-system',
    parent_id: 'products',
    sort_order: 10,
    is_visible: true,
    page_type: 'section',
    template_key: 'petition_system',
    nav_label: '陳情系統網站',
    nav_icon: '📋',
    seo_title: '陳情系統網站',
    seo_description: '線上陳情、案件編號查詢與幕僚後台管理',
  },
  {
    id: 'achievement-wall',
    title: '政績牆',
    slug: 'leyi/achievements.html',
    parent_id: 'products',
    sort_order: 20,
    is_visible: true,
    page_type: 'external',
    template_key: 'achievement_wall_intro',
    nav_label: '政績牆',
    nav_icon: '🏆',
    seo_title: '政績牆',
    seo_description: '成果照片、問政紀錄與服務案例展示',
  },
  {
    id: 'line-forward',
    title: 'LINE訊息轉發工具',
    slug: 'line-forward',
    parent_id: 'products',
    sort_order: 30,
    is_visible: true,
    page_type: 'section',
    template_key: 'line_forward',
    nav_label: 'LINE訊息轉發工具',
    nav_icon: '💬',
    seo_title: 'LINE訊息轉發工具',
    seo_description: '把活動、政策與服務通知做成可轉發的 LINE 圖文卡',
  },
  {
    id: 'office-task',
    title: '民代任務管理系統',
    slug: 'office-task',
    parent_id: 'products',
    sort_order: 40,
    is_visible: true,
    page_type: 'section',
    template_key: 'office_task',
    nav_label: '民代任務管理系統',
    nav_icon: '🗓️',
    seo_title: '民代任務管理系統',
    seo_description: '活動、行程日曆、LINE會員管理與陳情案件管理',
  },
  {
    id: 'case-study',
    title: '案例展示',
    slug: 'case-study',
    parent_id: null,
    sort_order: 30,
    is_visible: true,
    page_type: 'section',
    template_key: 'case_study',
    nav_label: '案例展示',
    nav_icon: '🖼️',
    seo_title: '案例展示',
    seo_description: '查看已完成的陳情系統與政績牆服務入口',
  },
  {
    id: 'faq',
    title: '常見問題',
    slug: 'faq',
    parent_id: null,
    sort_order: 40,
    is_visible: true,
    page_type: 'section',
    template_key: 'faq',
    nav_label: '常見問題',
    nav_icon: '❓',
    seo_title: '常見問題',
    seo_description: '導入民代與里長數位服務工具前的常見問題',
  },
];

const SITE_PAGE_STORE = {
  storageKey: `${SITE_TEMPLATE_CONFIG.siteKey}:site_pages:v2`,
  schema: SITE_PAGE_SCHEMA_V1,
  defaults: SITE_PAGES_DEFAULT,

  defaultPages() {
    return this.defaults.map((page, index) => this.normalizePage(page, index));
  },

  normalizePage(page, index = 0) {
    return {
      id: String(page.id || `page_${index + 1}`),
      title: String(page.title || '').trim(),
      slug: String(page.slug || '').trim(),
      parent_id: page.parent_id ? String(page.parent_id) : null,
      sort_order: Number.isFinite(Number(page.sort_order)) ? Number(page.sort_order) : (index + 1) * 10,
      is_visible: page.is_visible !== false,
      page_type: String(page.page_type || 'section'),
      template_key: String(page.template_key || 'default'),
      nav_label: String(page.nav_label || page.title || '').trim(),
      nav_icon: String(page.nav_icon || '').trim(),
      seo_title: String(page.seo_title || '').trim(),
      seo_description: String(page.seo_description || '').trim(),
    };
  },

  sortPages(pages) {
    return [...pages].sort((a, b) => {
      if (a.parent_id === b.parent_id) {
        if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order;
        return a.title.localeCompare(b.title, 'zh-Hant');
      }
      return String(a.parent_id || '').localeCompare(String(b.parent_id || ''), 'zh-Hant');
    });
  },

  read() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return this.sortPages(this.defaultPages());
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || !parsed.length) {
        return this.sortPages(this.defaultPages());
      }
      const normalized = parsed.map((page, index) => this.normalizePage(page, index));
      const existingIds = new Set(normalized.map(page => page.id));
      const missingDefaults = this.defaultPages().filter(page => !existingIds.has(page.id));
      return this.sortPages([...normalized, ...missingDefaults]);
    } catch (error) {
      console.warn('[SITE_PAGE_STORE] Failed to read local pages, fallback to defaults.', error);
      return this.sortPages(this.defaultPages());
    }
  },

  write(pages) {
    const normalized = this.sortPages((pages || []).map((page, index) => this.normalizePage(page, index)));
    localStorage.setItem(this.storageKey, JSON.stringify(normalized));
    return normalized;
  },

  reset() {
    localStorage.removeItem(this.storageKey);
    return this.read();
  },

  nextId(pages) {
    const existing = new Set((pages || []).map(page => String(page.id)));
    let seed = existing.size + 1;
    while (existing.has(`page_${seed}`)) seed += 1;
    return `page_${seed}`;
  },

  buildTree(pages = this.read(), { visibleOnly = false } = {}) {
    const source = visibleOnly ? pages.filter(page => page.is_visible) : pages;
    const sorted = this.sortPages(source);
    const byId = new Map(sorted.map(page => [page.id, { ...page, children: [] }]));
    const roots = [];

    sorted.forEach(page => {
      const item = byId.get(page.id);
      if (!item) return;
      const parent = item.parent_id ? byId.get(item.parent_id) : null;
      if (parent && !parent.parent_id) parent.children.push(item);
      else {
        item.parent_id = null;
        roots.push(item);
      }
    });

    roots.forEach(root => {
      root.children = this.sortPages(root.children || []);
    });

    return this.sortPages(roots);
  },
};

Object.assign(window, {
  SITE_TEMPLATE_CONFIG,
  SITE_UTILS,
  CONFIG,
  SITE_SETTINGS_STORE,
  SITE_PAGE_STORE,
});
