/* ════════════════════════════════════════
   Demo Site Template Config
   所有客戶可複製設定從這裡開始
   ════════════════════════════════════════ */

const SITE_TEMPLATE_CONFIG = {
  siteKey: 'leyicasedemo',
  systemMode: 'achievement',

  brand: {
    name: '數位服務處',
    shortName: '數位服務處',
    adminName: '市民服務平台',
    icon: '🏛️',
    tagline: '數位透明・為民服務',
    footerTagline: '數位透明 · 為民服務 · 每件問題都有人跟進',
    adminSubtitle: 'Admin Console',
    copyrightName: '數位服務處',
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
    heroTitle: ['數位時代的', '市民服務新標準'],
    heroSub: '透過數位化陳情平台，每一件市民的問題都將被看見、被追蹤、被解決。',
    heroFigure: false,
    lineLinkLabel: 'LINE 官方帳號',
    flowSteps: [
      { num: '01', icon: '📝', title: '填寫陳情表單', desc: '說明問題地點、類型與詳細內容，留下聯絡資料方便後續溝通。' },
      { num: '02', icon: '🎫', title: '取得案件編號', desc: '送出後系統自動產生專屬案件編號，請截圖保存以便查詢進度。' },
      { num: '03', icon: '⚙️', title: '幕僚受理追蹤', desc: '專人審核案件並轉交相關單位，每個處理階段都會更新紀錄。' },
      { num: '04', icon: '✅', title: '結果通知回覆', desc: '案件處理完成後，公開說明及結果回覆將同步更新在查詢頁面。' },
    ],
    faqItems: [
      { q: '什麼是數位服務處？', a: '這是一個公開透明的市民陳情服務平台，讓每一件市民的問題都能被看見、被追蹤、被解決。' },
      { q: '如何提出陳情？', a: '點選「我要陳情」按鈕，填寫問題類型、標題與詳細內容，留下聯絡資料後送出即可。' },
      { q: '如何查詢陳情進度？', a: '點選「案件查詢」，輸入您的案件編號（格式：SVC-YYYYMMDD-XXXX）即可查看目前辦理狀態。' },
      { q: '案件一般需要多久處理？', a: '視案件性質及主管機關時程而定，一般案件約 7–14 個工作天，緊急案件會優先處理。' },
      { q: '我的個人資料會被保護嗎？', a: '是的。您的個人資料依《個人資料保護法》嚴格保管，不會外流或用於其他用途。' },
      { q: '可以透過 LINE 聯繫嗎？', a: '可以。加入我們的 LINE 官方帳號，服務團隊將在工作時間內盡速回覆您的問題。' },
    ],
  },

  navigation: {
    publicItems: [
      { id: 'home', label: '首頁', icon: '🏠' },
      { id: 'list', label: '陳情登錄', icon: '📋' },
      { id: 'query', label: '案件查詢', icon: '🔍' },
      { id: 'inspections', label: '現場會勘', icon: '🏗️' },
      { id: 'interpellations', label: '國會質詢', icon: '🎤' },
      { id: 'proposals', label: '國會提案', icon: '📜' },
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
    homeTitle: '數位服務處｜市民陳情服務平台',
    homeDescription: '公開透明的市民陳情平台，線上登錄陳情、即時查詢案件進度，每件問題都有人跟進處理。',
    ogImage: './og-image.png',
    achievementsTitle: '政績專區 — 數位服務處',
    achievementsDescription: '數位服務處政績一覽，公開透明呈現每一項服務成果。',
    formTitle: '填寫陳情表單 — 數位服務處',
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
    return {
      ...fallback,
      siteKey: String(source.siteKey || source.siteCode || fallback.siteKey),
      brandName: String(source.brandName || source.name || fallback.brandName),
      brandShortName: String(source.brandShortName || source.shortName || source.brandName || fallback.brandShortName),
      adminName: String(source.adminName || fallback.adminName),
      systemMode: String(source.systemMode || fallback.systemMode),
      primaryColor: String(source.primaryColor || fallback.primaryColor),
      accentColor: String(source.accentColor || fallback.accentColor),
      logoUrl: String(source.logoUrl || fallback.logoUrl),
      heroTitleLine1: String(source.heroTitleLine1 || fallback.heroTitleLine1),
      heroTitleLine2: String(source.heroTitleLine2 || fallback.heroTitleLine2),
      heroSubtitle: String(source.heroSubtitle || source.heroSub || fallback.heroSubtitle),
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
    id: 'list',
    title: '案件列表',
    slug: 'list',
    parent_id: null,
    sort_order: 20,
    is_visible: true,
    page_type: 'section',
    template_key: 'petition_list',
    nav_label: '案件列表',
    nav_icon: '📋',
    seo_title: '案件列表',
    seo_description: '查看案件公開列表',
  },
  {
    id: 'query',
    title: '案件查詢',
    slug: 'query',
    parent_id: null,
    sort_order: 30,
    is_visible: true,
    page_type: 'section',
    template_key: 'petition_query',
    nav_label: '案件查詢',
    nav_icon: '🔎',
    seo_title: '案件查詢',
    seo_description: '依案件編號查詢處理進度',
  },
  {
    id: 'records',
    title: '問政成果',
    slug: 'records',
    parent_id: null,
    sort_order: 40,
    is_visible: true,
    page_type: 'group',
    template_key: 'nav_group',
    nav_label: '問政成果',
    nav_icon: '🗂️',
    seo_title: '問政成果',
    seo_description: '問政成果導覽群組',
  },
  {
    id: 'inspections',
    title: '會勘紀錄',
    slug: 'inspections',
    parent_id: 'records',
    sort_order: 10,
    is_visible: true,
    page_type: 'section',
    template_key: 'inspections',
    nav_label: '會勘紀錄',
    nav_icon: '🧭',
    seo_title: '會勘紀錄',
    seo_description: '查看會勘紀錄',
  },
  {
    id: 'interpellations',
    title: '質詢紀錄',
    slug: 'interpellations',
    parent_id: 'records',
    sort_order: 20,
    is_visible: true,
    page_type: 'section',
    template_key: 'interpellations',
    nav_label: '質詢紀錄',
    nav_icon: '🎙️',
    seo_title: '質詢紀錄',
    seo_description: '查看質詢紀錄',
  },
  {
    id: 'proposals',
    title: '提案紀錄',
    slug: 'proposals',
    parent_id: 'records',
    sort_order: 30,
    is_visible: true,
    page_type: 'section',
    template_key: 'proposals',
    nav_label: '提案紀錄',
    nav_icon: '📝',
    seo_title: '提案紀錄',
    seo_description: '查看提案紀錄',
  },
  {
    id: 'achievement-wall',
    title: '政績牆',
    slug: 'leyi/achievements.html',
    parent_id: null,
    sort_order: 50,
    is_visible: true,
    page_type: 'external',
    template_key: 'achievement_wall',
    nav_label: '政績牆',
    nav_icon: '🏆',
    seo_title: '政績牆',
    seo_description: '查看政績成果展示牆',
  },
  {
    id: 'faq',
    title: '常見問題',
    slug: 'faq',
    parent_id: null,
    sort_order: 60,
    is_visible: true,
    page_type: 'section',
    template_key: 'faq',
    nav_label: '常見問題',
    nav_icon: '❓',
    seo_title: '常見問題',
    seo_description: '常見問題說明',
  },
];

const SITE_PAGE_STORE = {
  storageKey: `${SITE_TEMPLATE_CONFIG.siteKey}:site_pages:v1`,
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
