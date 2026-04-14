/* ════════════════════════════════════════
   數位服務處 — config.js
   系統模式：achievement（政績版）
   ════════════════════════════════════════ */

const CONFIG = {
  // ── 品牌
  BRAND_NAME:    '數位服務處',
  BRAND_SHORT:   '數位服務處',
  BRAND_ICON:    '🏛️',
  BRAND_TAGLINE: '數位透明・為民服務',
  SYSTEM_MODE:   'achievement',

  // ── Hero
  HERO_TITLE:  ['數位時代的', '市民服務新標準'],
  HERO_SUB:    '透過數位化陳情平台，每一件市民的問題都將被看見、被追蹤、被解決。',
  HERO_FIGURE: false,

  // ── 連結
  LINE_URL:    'https://lin.ee/Q9cWSP5',

  // ── Webhook
  WEBHOOK_BASE:   'https://drwu.zeabur.app',
  WEBHOOK_PREFIX: 'leyidemo',

  // ── 導覽項目
  NAV_ITEMS: [
    { id: 'home',             label: '首頁',     icon: '🏠' },
    { id: 'list',             label: '陳情登錄', icon: '📋' },
    { id: 'query',            label: '案件查詢', icon: '🔍' },
    { id: 'inspections',      label: '現場會勘', icon: '🏗️' },
    { id: 'interpellations',  label: '國會質詢', icon: '🎤' },
    { id: 'proposals',        label: '國會提案', icon: '📜' },
    { id: 'faq',              label: '常見問題', icon: '❓' },
  ],

  // ── 首頁統計卡（政績版）
  STAT_CARDS: [
    { id: 'totalPetitions',    label: '累積服務件數', unit: '件',  source: 'dynamic' },
    { id: 'inspections',       label: '現場會勘次數', unit: '次',  source: 'static'  },
    { id: 'interpellations',   label: '國會質詢次數', unit: '次',  source: 'static'  },
    { id: 'proposals',         label: '國會提案次數', unit: '次',  source: 'static'  },
    { id: 'avgDays',           label: '平均回覆天數', unit: '天',  source: 'dynamic' },
    { id: 'topType',           label: '最多陳情類型', unit: '',    source: 'dynamic' },
  ],

  // ── 靜態數字（幕僚手動維護）
  STAT_STATIC: {
    inspections:     156,
    interpellations:  83,
    proposals:        29,
  },

  // ── 案件類型
  CASE_TYPES: [
    '交通運輸', '公共設施', '衛福勞動', '文教科技',
    '環境建管', '警消政風', '市政議題', '里鄰事務', '其他服務',
  ],

  // ── 服務地區（台中市 29 區）
  CASE_AREAS: [
    '中區','東區','西區','南區','北區',
    '西屯區','南屯區','北屯區','豐原區','東勢區',
    '大甲區','清水區','沙鹿區','梧棲區','后里區',
    '神岡區','潭子區','大雅區','新社區','石岡區',
    '外埔區','大安區','烏日區','大肚區','龍井區',
    '霧峰區','太平區','大里區','和平區',
  ],

  // ── 陳情流程
  FLOW_STEPS: [
    { num:'01', icon:'📝', title:'填寫陳情表單', desc:'說明問題地點、類型與詳細內容，留下聯絡資料方便後續溝通。' },
    { num:'02', icon:'🎫', title:'取得案件編號', desc:'送出後系統自動產生專屬案件編號，請截圖保存以便查詢進度。' },
    { num:'03', icon:'⚙️', title:'幕僚受理追蹤', desc:'專人審核案件並轉交相關單位，每個處理階段都會更新紀錄。' },
    { num:'04', icon:'✅', title:'結果通知回覆', desc:'案件處理完成後，公開說明及結果回覆將同步更新在查詢頁面。' },
  ],

  // ── FAQ
  FAQ_ITEMS: [
    { q: '什麼是數位服務處？', a: '這是一個公開透明的市民陳情服務平台，讓每一件市民的問題都能被看見、被追蹤、被解決。' },
    { q: '如何提出陳情？', a: '點選「我要陳情」按鈕，填寫問題類型、標題與詳細內容，留下聯絡資料後送出即可。' },
    { q: '如何查詢陳情進度？', a: '點選「案件查詢」，輸入您的案件編號（格式：SVC-YYYYMMDD-XXXX）即可查看目前辦理狀態。' },
    { q: '案件一般需要多久處理？', a: '視案件性質及主管機關時程而定，一般案件約 7–14 個工作天，緊急案件會優先處理。' },
    { q: '我的個人資料會被保護嗎？', a: '是的。您的個人資料依《個人資料保護法》嚴格保管，不會外流或用於其他用途。' },
    { q: '可以透過 LINE 聯繫嗎？', a: '可以！加入我們的 LINE 官方帳號，服務團隊將在工作時間內盡速回覆您的問題。' },
  ],

  // ── SEO
  OG_TITLE:       '數位服務處｜市民陳情服務平台',
  OG_DESCRIPTION: '公開透明的市民陳情平台，線上登錄陳情、即時查詢案件進度，每件問題都有人跟進處理。',
  OG_IMAGE:       './og-image.png',
};
