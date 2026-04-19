/* ════════════════════════════════════════
   數位服務處 — main.js
   ════════════════════════════════════════ */

/* ── Webhook 端點（從 config.js 讀取）*/
const WEBHOOK  = {
  STATS:     SITE_UTILS.webhook('stats'),
  LIST:      SITE_UTILS.webhook('list'),
  QUERY:     SITE_UTILS.webhook('query'),
  DASH:      SITE_UTILS.webhook('dashboard'),
  SUBMIT:    SITE_UTILS.webhook('submit'),
  INSPECTIONS: SITE_UTILS.webhook('inspections'),
  INTERPELLATIONS: SITE_UTILS.webhook('interpellations'),
  PROPOSALS: SITE_UTILS.webhook('proposals'),
};

function refreshWebhookEndpoints() {
  WEBHOOK.STATS = SITE_UTILS.webhook('stats');
  WEBHOOK.LIST = SITE_UTILS.webhook('list');
  WEBHOOK.QUERY = SITE_UTILS.webhook('query');
  WEBHOOK.DASH = SITE_UTILS.webhook('dashboard');
  WEBHOOK.SUBMIT = SITE_UTILS.webhook('submit');
  WEBHOOK.INSPECTIONS = SITE_UTILS.webhook('inspections');
  WEBHOOK.INTERPELLATIONS = SITE_UTILS.webhook('interpellations');
  WEBHOOK.PROPOSALS = SITE_UTILS.webhook('proposals');
}

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el && value !== undefined) el.textContent = value;
}

function setHtml(selector, value) {
  const el = document.querySelector(selector);
  if (el && value !== undefined) el.innerHTML = value;
}

function setHref(selector, value) {
  document.querySelectorAll(selector).forEach(el => {
    el.href = value;
  });
}

function setBrandLogo(selector, src = CONFIG.LOGO_URL || 'leyi/assets/brand/logo.png') {
  document.querySelectorAll(selector).forEach(el => {
    el.innerHTML = `<img src="${src}" alt="${SITE_TEMPLATE_CONFIG.brand.name}">`;
  });
}

function hydrateSiteShell() {
  document.title = SITE_TEMPLATE_CONFIG.seo.homeTitle;
  document.querySelector('meta[name="description"]')?.setAttribute('content', SITE_TEMPLATE_CONFIG.seo.homeDescription);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', SITE_TEMPLATE_CONFIG.seo.homeTitle);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', SITE_TEMPLATE_CONFIG.seo.homeDescription);
  document.querySelector('meta[property="og:image"]')?.setAttribute('content', SITE_TEMPLATE_CONFIG.seo.ogImage);

  setBrandLogo('.nav-brand-icon');
  setText('.nav-brand-name', SITE_TEMPLATE_CONFIG.brand.name);
  setHtml('.hero-title', `${CONFIG.HERO_TITLE[0]}<br><span class="accent">${CONFIG.HERO_TITLE[1]}</span>`);
  setText('.hero-sub', CONFIG.HERO_SUB);
  setText('.footer-brand', `${SITE_TEMPLATE_CONFIG.brand.icon} ${SITE_TEMPLATE_CONFIG.brand.name}`);
  setText('.footer-sub', SITE_TEMPLATE_CONFIG.brand.footerTagline);
  setText('.footer-copy', SITE_UTILS.footerCopyright());
  setHref('.footer-social-card', CONFIG.LINE_URL);
  setHref('.flow-line-btn', CONFIG.LINE_URL);

  const faqList = document.querySelector('#page-faq .faq-list');
  if (faqList && Array.isArray(CONFIG.FAQ_ITEMS)) {
    faqList.innerHTML = CONFIG.FAQ_ITEMS.map(item => `
      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">
          <span>${item.q}</span>
          <span class="arrow">▾</span>
        </div>
        <div class="faq-a">${item.a}${item.q.includes('LINE') ? `<br><br><a href="${CONFIG.LINE_URL}" target="_blank" style="color:#06C755;font-weight:700;">💬 ${SITE_TEMPLATE_CONFIG.content.lineLinkLabel}</a>` : ''}</div>
      </div>
    `).join('');
  }
}

/* ══════════════════════════════
   1. 導覽 & 漢堡選單
══════════════════════════════ */
function toggleMenu() {
  document.getElementById('mobileNav')?.classList.toggle('open');
}

function showPage(name) {
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const target = document.getElementById('page-' + name);
  if (target) target.classList.add('active');
  document.querySelectorAll('.nav-link').forEach(l => {
    if ((l.getAttribute('onclick') || '').includes(`'${name}'`)) l.classList.add('active');
  });
  document.getElementById('mobileNav')?.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (name === 'list')            loadList();
  if (name === 'inspections')     loadInspections();
  if (name === 'interpellations') loadInterpellations();
  if (name === 'proposals')       loadProposals();
}

/* ══════════════════════════════
   2. 首頁統計
══════════════════════════════ */
let _statsCache = null;

async function loadStats() {
  if (_statsCache) { renderStats(_statsCache); return; }
  try {
    const res  = await fetch(WEBHOOK.STATS);
    const data = await res.json();
    if (data.success) { _statsCache = data; renderStats(data); }
  } catch(e) {
    ['stat-total','stat-insp','stat-inter','stat-prop','stat-avg','stat-top']
      .forEach(id => { const el = document.getElementById(id); if(el){ el.classList.remove('skeleton'); el.textContent='—'; } });
  }
}

function renderStats(data) {
  // 動態
  animateNum('stat-total', data.totalPetitions);
  animateNum('stat-avg',   data.avgDays);

  // 靜態（從 config 讀）
  animateNum('stat-insp',  CONFIG.STAT_STATIC.inspections);
  animateNum('stat-inter', CONFIG.STAT_STATIC.interpellations);
  animateNum('stat-prop',  CONFIG.STAT_STATIC.proposals);

  // 最多類別（文字）
  const topEl = document.getElementById('stat-top');
  if (topEl && data.topType) {
    topEl.classList.remove('skeleton');
    topEl.textContent = data.topType;
    const rateEl = document.getElementById('stat-top-rate');
    if (rateEl) rateEl.textContent = data.topTypeRate + '%';
  }

  // 主角卡說明
  const descEl = document.getElementById('stat-total-desc');
  if (descEl && data.totalPetitions) {
    descEl.textContent = `截至今日，已累積協助處理 ${data.totalPetitions.toLocaleString()} 件市民陳情，持續為民服務中。`;
  }

  window._statsData = { ...data };
}

function animateNum(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('skeleton');
  if (!target && target !== 0) { el.textContent = '0'; return; }
  const isNum = typeof target === 'number';
  if (!isNum) { el.textContent = target; return; }
  const dur = 1400, start = performance.now();
  const step = (now) => {
    const p    = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(ease * target).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  };
  requestAnimationFrame(step);
}

/* ══════════════════════════════
   3. 彈窗
══════════════════════════════ */
const _modalContent = {
  totalPetitions: () => {
    const d = window._statsData || {};
    return { num: (d.totalPetitions||0).toLocaleString() + '件', title: '累積服務件數', desc: `自平台成立以來，已累積協助 ${(d.totalPetitions||0).toLocaleString()} 件市民陳情，每一件都有專人跟進處理。` };
  },
  inspections: () => ({ num: CONFIG.STAT_STATIC.inspections + '次', title: '現場會勘次數', desc: '親赴現場實地了解問題，以第一手資訊為民眾發聲，確保每個問題都被認真對待。' }),
  interpellations: () => ({ num: CONFIG.STAT_STATIC.interpellations + '次', title: '國會質詢次數', desc: '在立法院積極質詢各部會，將市民的聲音帶上最高立法殿堂，督促政府改善施政。' }),
  proposals: () => ({ num: CONFIG.STAT_STATIC.proposals + '次', title: '國會提案次數', desc: '積極推動立法，以制度化方式解決市民問題，讓每一項訴求都有機會成為保障民眾的法律。' }),
  avgDays: () => {
    const d = window._statsData || {};
    return { num: (d.avgDays||0) + '天', title: '平均回覆天數', desc: `從案件登錄到回覆，平均僅需 ${d.avgDays||0} 天。我們致力縮短處理時程，讓您的問題盡快得到解答。` };
  },
  topType: () => {
    const d = window._statsData || {};
    return { num: d.topType || '—', title: '最多陳情類型', desc: `「${d.topType||'—'}」是目前最常見的陳情類型，佔所有案件的 ${d.topTypeRate||0}%。如您有相關問題，歡迎立即提出陳情。` };
  },
};

function openModal(key) {
  const fn = _modalContent[key];
  if (!fn) return;
  const { num, title, desc } = fn();
  document.getElementById('modalNum').textContent   = num;
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalDesc').textContent  = desc;
  document.getElementById('modalBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modalBackdrop')?.classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function updateScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
  bar.style.width = Math.max(0, Math.min(100, progress)) + '%';
}

function initHeroBubbles() {
  const hero = document.querySelector('.hero-unit');
  if (!hero) return;
  const move = (clientX, clientY) => {
    const rect = hero.getBoundingClientRect();
    const x = clientX - rect.left - rect.width / 2;
    const y = clientY - rect.top - rect.height / 2;
    hero.style.setProperty('--bubble-x', `${x}px`);
    hero.style.setProperty('--bubble-y', `${y}px`);
  };
  hero.addEventListener('pointermove', event => move(event.clientX, event.clientY));
  hero.addEventListener('pointerleave', () => {
    hero.style.setProperty('--bubble-x', '0px');
    hero.style.setProperty('--bubble-y', '0px');
  });
}

function initHeroMediaCarousel() {
  const hero = document.querySelector('.hero-unit');
  const slides = Array.from(document.querySelectorAll('.hero-media-slide'));
  if (!hero || slides.length === 0) return;

  let current = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
  let timer = null;

  const show = nextIndex => {
    current = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => slide.classList.toggle('is-active', index === current));
  };

  const start = () => {
    if (timer) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = window.setInterval(() => show(current + 1), 5200);
  };
  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };
  hero.addEventListener('pointerenter', stop);
  hero.addEventListener('pointerleave', start);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  show(current);
  start();
}

/* ══════════════════════════════
   4. 儀表板
══════════════════════════════ */
let _dashCache = {}, _currentPeriod = '7d';

async function loadDashboard(period) {
  _currentPeriod = period;
  document.querySelectorAll('.dash-tab').forEach(btn => btn.classList.toggle('active', btn.dataset.period === period));
  if (_dashCache[period]) { renderDashboard(_dashCache[period]); return; }
  try {
    const res  = await fetch(WEBHOOK.DASH + '?period=' + period);
    if (!res.ok) throw new Error(`Dashboard webhook HTTP ${res.status}`);
    const data = await res.json();
    if (!data.success) throw new Error('Dashboard webhook returned success=false');
    _dashCache[period] = data;
    renderDashboard(data);
  } catch(e) {
    console.warn('[dashboard] load failed:', e);
    renderDashboardError();
  }
}

function renderDashboard(data) {
  renderMonthStats(data);
  renderPieChart(data);
}

async function loadRecentReplies() {
  const wrap = document.getElementById('recentReplies');
  if (!wrap) return;
  wrap.innerHTML = '<div class="chart-loading">載入近期公開回覆中...</div>';
  try {
    const res = await fetch(WEBHOOK.LIST + '?page=1');
    if (!res.ok) throw new Error('List webhook HTTP ' + res.status);
    const data = await res.json();
    if (!data.success) throw new Error('List webhook returned success=false');
    const items = (data.items || [])
      .filter(item => item && (item.reply || item.summary || item.title))
      .slice(0, 4);
    renderRecentReplies(items);
  } catch (e) {
    console.warn('[recent replies] load failed:', e);
    wrap.innerHTML = '<div class="chart-loading">近期公開回覆暫時無法載入</div>';
  }
}

function renderRecentReplies(items) {
  const wrap = document.getElementById('recentReplies');
  if (!wrap) return;
  if (!items.length) {
    wrap.innerHTML = '<div class="chart-loading">目前尚無公開回覆案件</div>';
    return;
  }
  wrap.innerHTML = items.map(item => {
    const text = item.reply || item.summary || '案件已收件，相關單位處理中。';
    const clipped = escHtml(text).slice(0, 72) + (text.length > 72 ? '...' : '');
    return '<article class="recent-reply-item">'
      + '<div class="recent-reply-meta">'
      + '<span class="recent-reply-type">' + escHtml(item.caseType || '未分類') + '</span>'
      + '<span class="recent-reply-status">' + escHtml(item.status || '處理中') + '</span>'
      + '</div>'
      + '<h4>' + escHtml(item.title || '未命名案件') + '</h4>'
      + '<p>' + clipped + '</p>'
      + '<div class="recent-reply-foot">'
      + '<span>' + escHtml(item.date || '') + '</span>'
      + '<span>' + escHtml(item.caseId || '') + '</span>'
      + '</div>'
      + '</article>';
  }).join('');
}

function renderDashboardError() {
  const chart = document.getElementById('barChart');
  if (chart) chart.innerHTML = '<div class="chart-loading">儀錶板資料暫時無法載入，請確認 n8n dashboard webhook 是否啟用。</div>';
  ['ms-new','ms-closed','ms-progress'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '—';
  });
  const bar = document.getElementById('msProgressBar');
  if (bar) bar.style.width = '0%';
  const lbl = document.getElementById('msProgressLabel');
  if (lbl) lbl.textContent = '結案率 —';
  const legend = document.getElementById('pieLegend');
  if (legend) legend.innerHTML = '<div style="color:var(--color-text-muted);font-size:13px;">類別資料暫時無法載入</div>';
}

function renderStackedBar(data) {
  const chart = document.getElementById('barChart');
  if (!chart) return;
  const items = data.chart || [];
  const normalize = i => ({ label:i.label||'', newCount:i.newCount??i.count??0, closedCount:i.closedCount??i.closed??0 });
  const norm = items.map(normalize);
  const hasData = norm.some(i => i.newCount + i.closedCount > 0);
  if (!items.length || !hasData) { chart.innerHTML = '<div class="chart-loading">???????????</div>'; return; }
  const maxVal = Math.max(...norm.map(i => i.newCount + i.closedCount), 1);
  chart.innerHTML = norm.map(item => {
    const nC = item.newCount, cC = item.closedCount, total = nC + cC;
    const totalPct = Math.round((total / maxVal) * 100);
    const newH    = total > 0 ? Math.round((nC / total) * 100) : 0;
    const closedH = total > 0 ? Math.round((cC / total) * 100) : 0;
    return `
      <div class="bar-col">
        <div class="bar-track">
          <div class="bar-stacked" style="height:${Math.max(totalPct, 2)}%" title="?? ${nC} ? / ?? ${cC} ?" aria-label="${item.label} ?? ${nC} ???? ${cC} ?">
            <div class="bar-seg-new" style="height:${newH}%"></div>
            <div class="bar-seg-closed" style="height:${closedH}%"></div>
          </div>
        </div>
        <div class="bar-label">${item.label}</div>
      </div>`;
  }).join('');
}
function renderMonthStats(data) {
  const ms = data.monthStats || {};
  const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
  set('ms-new',      ms.newCount      || 0);
  set('ms-closed',   ms.closedCount   || 0);
  set('ms-progress', ms.progressCount || 0);
  const rate = ms.newCount > 0 ? Math.round((ms.closedCount / ms.newCount) * 100) : 0;
  const bar  = document.getElementById('msProgressBar');
  if (bar) setTimeout(() => bar.style.width = rate + '%', 100);
  const lbl = document.getElementById('msProgressLabel');
  if (lbl) lbl.textContent = '結案率 ' + rate + '%';
}

const PIE_COLORS = ['#E87F24','#FFC81E','#73A5CA','#F0A060','#A0C8E8','#D4A040','#9FBCCC','#E8A878'];
let _pieSlices = [];

function renderPieChart(data) {
  const canvas = document.getElementById('pieChart');
  const legend = document.getElementById('pieLegend');
  if (!canvas || !legend) return;
  const types   = data.typeCounts || {};
  const entries = Object.entries(types).sort((a,b) => b[1]-a[1]);
  const total   = entries.reduce((s,[,v]) => s+v, 0);
  if (!total) { legend.innerHTML = '<div style="color:var(--color-text-muted);font-size:13px;">暫無資料</div>'; return; }
  const SIZE = 220;
  canvas.width = SIZE; canvas.height = SIZE;
  const ctx = canvas.getContext('2d');
  const cx = SIZE/2, cy = SIZE/2, r = SIZE/2-10, inner = r*0.48;
  ctx.clearRect(0, 0, SIZE, SIZE);
  _pieSlices = [];
  let angle = -Math.PI / 2;
  entries.forEach(([name, count], i) => {
    const slice = (count / total) * Math.PI * 2;
    const pct   = Math.round((count / total) * 100);
    const color = PIE_COLORS[i % PIE_COLORS.length];
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,angle,angle+slice); ctx.closePath();
    ctx.fillStyle = color; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.5; ctx.stroke();
    const midAngle = angle + slice/2, labelR = r*0.68;
    const lx = cx + Math.cos(midAngle)*labelR, ly = cy + Math.sin(midAngle)*labelR;
    if (pct >= 8) { ctx.fillStyle='rgba(255,255,255,0.95)'; ctx.font=`bold 12px "Noto Sans TC",sans-serif`; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(pct+'%', lx, ly); }
    _pieSlices.push({ name, count, pct, color, startAngle:angle, endAngle:angle+slice });
    angle += slice;
  });
  ctx.beginPath(); ctx.arc(cx,cy,inner,0,Math.PI*2); ctx.fillStyle='rgba(254,253,223,0.90)'; ctx.fill();
  ctx.fillStyle='#E87F24'; ctx.font=`900 20px "Playfair Display",serif`; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(total, cx, cy-8);
  ctx.font=`500 11px "Noto Sans TC",sans-serif`; ctx.fillStyle='var(--color-text-muted)'; ctx.fillStyle='#7A5C3A'; ctx.fillText('件', cx, cy+12);
  setupPieTooltip(canvas, cx, cy, r, inner);
  legend.innerHTML = entries.map(([name, count], i) => {
    const pct = Math.round((count/total)*100);
    return `<div class="pie-legend-item"><span class="pie-legend-dot" style="background:${PIE_COLORS[i%PIE_COLORS.length]}"></span><span>${name}</span><span class="pie-legend-pct">${pct}%</span></div>`;
  }).join('');
}

function setupPieTooltip(canvas, cx, cy, r, inner) {
  const old = canvas.parentElement?.querySelector('.pie-tooltip');
  if (old) old.remove();
  const tip = document.createElement('div'); tip.className = 'pie-tooltip';
  canvas.parentElement.appendChild(tip);
  function getSlice(mx, my) {
    const rect = canvas.getBoundingClientRect();
    const x = (mx-rect.left)*(canvas.width/rect.width)-cx;
    const y = (my-rect.top)*(canvas.height/rect.height)-cy;
    const dist = Math.sqrt(x*x+y*y);
    if (dist<inner||dist>r) return null;
    let angle = Math.atan2(y,x); if(angle<-Math.PI/2) angle+=Math.PI*2;
    return _pieSlices.find(s=>angle>=s.startAngle&&angle<s.endAngle)||null;
  }
  canvas.addEventListener('mousemove', e => {
    const s=getSlice(e.clientX,e.clientY);
    if(!s){tip.classList.remove('show');return;}
    tip.textContent=`${s.name}　${s.pct}%（${s.count} 件）`;tip.classList.add('show');
    const rect=canvas.getBoundingClientRect();tip.style.left=(e.clientX-rect.left+12)+'px';tip.style.top=(e.clientY-rect.top-18)+'px';
  });
  canvas.addEventListener('mouseleave', ()=>tip.classList.remove('show'));
  canvas.addEventListener('click', e=>{const s=getSlice(e.clientX,e.clientY);if(!s){tip.classList.remove('show');return;}tip.textContent=`${s.name}　${s.pct}%（${s.count} 件）`;tip.classList.toggle('show');});
}

/* ══════════════════════════════
   5. 案件列表
══════════════════════════════ */
let _cat='',_status='',_page=1;

async function loadList() {
  const tbody=document.getElementById('petitionTbody');
  if(!tbody)return;
  tbody.innerHTML='<tr><td colspan="5"><div class="loading-row"><div class="loading-spinner"></div>載入中…</div></td></tr>';
  const params=new URLSearchParams({page:_page});
  if(_cat)    params.append('category',_cat);
  if(_status) params.append('status',_status);
  try {
    const res=await fetch(WEBHOOK.LIST+'?'+params);
    const data=await res.json();
    if(!data.success)throw new Error();
    renderTable(data.items);
    renderPagination(data.page,data.totalPages,data.total);
  } catch(e) { tbody.innerHTML='<tr><td colspan="5"><div class="empty-row">⚠️ 載入失敗，請稍後再試</div></td></tr>'; }
}
function renderTable(items) {
  const tbody=document.getElementById('petitionTbody');
  if(!items||!items.length){tbody.innerHTML='<tr><td colspan="5"><div class="empty-row">📭 目前沒有符合條件的案件</div></td></tr>';return;}
  tbody.innerHTML=items.map(item=>`<tr><td style="font-family:monospace;font-size:12px;color:var(--color-text-muted)">${item.caseId||'—'}</td><td><span class="type-badge">${item.caseType||'—'}</span></td><td style="max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600;">${escHtml(item.title||'—')}</td><td style="font-size:12px;color:var(--color-text-muted);white-space:nowrap">${item.date||'—'}</td><td><span class="badge badge-${item.status}">${item.status||'—'}</span></td></tr>`).join('');
}
function renderPagination(page,totalPages,total) {
  const el=document.getElementById('pagination');if(!el)return;
  if(totalPages<=1){el.innerHTML=`<span style="font-size:12px;color:var(--color-text-muted)">共 ${total} 筆</span>`;return;}
  let html=`<button class="page-btn" onclick="goPage(${page-1})" ${page<=1?'disabled':''}>‹</button>`;
  for(let i=1;i<=totalPages;i++){if(totalPages>7&&i>2&&i<totalPages-1&&Math.abs(i-page)>1){if(i===3||i===totalPages-2)html+=`<span style="color:var(--color-text-light);padding:0 4px;">…</span>`;continue;}html+=`<button class="page-btn ${i===page?'active':''}" onclick="goPage(${i})">${i}</button>`;}
  html+=`<button class="page-btn" onclick="goPage(${page+1})" ${page>=totalPages?'disabled':''}>›</button><span style="font-size:12px;color:var(--color-text-muted);margin-left:8px;">共 ${total} 筆</span>`;
  el.innerHTML=html;
}
function goPage(p){_page=p;loadList();window.scrollTo({top:400,behavior:'smooth'});}
function setCat(btn,cat){document.querySelectorAll('.cat-tab').forEach(b=>b.classList.remove('active'));btn.classList.add('active');_cat=cat;_page=1;loadList();}
function setStatus(){_status=document.getElementById('statusFilter').value;_page=1;loadList();}
function escHtml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

/* ══════════════════════════════
   6. 案件查詢
══════════════════════════════ */
async function queryCase() {
  const input=document.getElementById('queryInput').value.trim().toUpperCase();
  const errEl=document.getElementById('queryError');
  const resEl=document.getElementById('queryResult');
  errEl.classList.remove('show'); resEl.classList.remove('show');
  if(!input){errEl.textContent='請輸入案件編號';errEl.classList.add('show');return;}
  const btn=document.getElementById('queryBtn');
  btn.classList.add('is-loading');btn.disabled=true;
  try {
    const res=await fetch(WEBHOOK.QUERY+'?caseId='+encodeURIComponent(input));
    const data=await res.json();
    if(!data.found){errEl.textContent='查無此案件編號，請確認格式是否正確（例：SVC-20250101-0001）';errEl.classList.add('show');return;}
    document.getElementById('qr-id').textContent    =data.caseId   ||'—';
    document.getElementById('qr-title').textContent =data.title    ||'—';
    document.getElementById('qr-type').textContent  =data.caseType ||'—';
    document.getElementById('qr-area').textContent  =data.caseArea ||'—';
    document.getElementById('qr-date').textContent  =data.date     ||'—';
    const sEl=document.getElementById('qr-status');sEl.textContent=data.status||'—';sEl.className='badge badge-'+(data.status||'');
    const sumEl=document.getElementById('qr-summary');sumEl.textContent=data.summary||'辦理說明更新中，請耐心等候';sumEl.className='qr-text'+(data.summary?'':' empty');
    const repWrap=document.getElementById('qr-reply-wrap');const repEl=document.getElementById('qr-reply');
    if(data.reply){repEl.textContent=data.reply;repEl.className='qr-text';repWrap.style.display='block';}else{repWrap.style.display='none';}
    const allImgs=[...(data.beforeImages||[]),...(data.afterImages||[])];
    const imgWrap=document.getElementById('qr-images-wrap');const imgCont=document.getElementById('qr-images');
    if(allImgs.length){imgCont.innerHTML=allImgs.map(url=>`<img src="${url}" alt="案件圖片" loading="lazy">`).join('');imgWrap.style.display='block';}else{imgWrap.style.display='none';}
    resEl.classList.add('show');resEl.scrollIntoView({behavior:'smooth',block:'nearest'});
  } catch(e){errEl.textContent='查詢失敗，請稍後再試';errEl.classList.add('show');}
  finally{btn.classList.remove('is-loading');btn.disabled=false;}
}

/* ══════════════════════════════
   7. 政績版頁面（從 Notion 撈）
══════════════════════════════ */
async function loadInspections() {
  const grid=document.getElementById('inspGrid');
  if(!grid)return;
  grid.innerHTML='<div class="loading-row"><div class="loading-spinner"></div>載入中…</div>';
  try {
    const res=await fetch(WEBHOOK.INSPECTIONS);
    const data=await res.json();
    if(!data.success||!data.items?.length){grid.innerHTML='<div class="empty-row">📭 目前尚無會勘紀錄</div>';return;}
    grid.innerHTML=data.items.map(item=>`
      <div class="record-card">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <span class="record-tag">${item.type||'其他'}</span>
          <span class="record-date">${item.date||''}</span>
        </div>
        <div class="record-title">${escHtml(item.title||'—')}</div>
        ${item.location?`<div style="font-size:12px;color:var(--color-text-light);">📍 ${escHtml(item.location)}</div>`:''}
        ${item.summary?`<div class="record-desc">${escHtml(item.summary)}</div>`:''}
      </div>`).join('');
  } catch(e){grid.innerHTML='<div class="empty-row">⚠️ 載入失敗，請稍後再試</div>';}
}

async function loadInterpellations() {
  const grid=document.getElementById('interGrid');
  if(!grid)return;
  grid.innerHTML='<div class="loading-row"><div class="loading-spinner"></div>載入中…</div>';
  try {
    const res=await fetch(WEBHOOK.INTERPELLATIONS);
    const data=await res.json();
    if(!data.success||!data.items?.length){grid.innerHTML='<div class="empty-row">📭 目前尚無質詢紀錄</div>';return;}
    grid.innerHTML=data.items.map(item=>`
      <div class="record-card">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <span class="record-tag blue">${item.target||'行政院'}</span>
          <span class="record-date">${item.date||''}</span>
        </div>
        <div class="record-title">${escHtml(item.title||'—')}</div>
        ${item.summary?`<div class="record-desc">${escHtml(item.summary)}</div>`:''}
        ${item.videoUrl?`<a href="${item.videoUrl}" target="_blank" class="btn-video">▶ 觀看質詢影片</a>`:''}
      </div>`).join('');
  } catch(e){grid.innerHTML='<div class="empty-row">⚠️ 載入失敗，請稍後再試</div>';}
}

async function loadProposals() {
  const grid=document.getElementById('propGrid');
  if(!grid)return;
  grid.innerHTML='<div class="loading-row"><div class="loading-spinner"></div>載入中…</div>';
  try {
    const res=await fetch(WEBHOOK.PROPOSALS);
    const data=await res.json();
    if(!data.success||!data.items?.length){grid.innerHTML='<div class="empty-row">📭 目前尚無提案紀錄</div>';return;}
    grid.innerHTML=data.items.map(item=>`
      <div class="record-card">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <span class="record-tag">${item.type||'法律案'}</span>
          <span class="record-progress progress-${item.status||'提案中'}">${item.status||'提案中'}</span>
          <span class="record-date">${item.date||''}</span>
        </div>
        <div class="record-title">${escHtml(item.title||'—')}</div>
        ${item.summary?`<div class="record-desc">${escHtml(item.summary)}</div>`:''}
      </div>`).join('');
  } catch(e){grid.innerHTML='<div class="empty-row">⚠️ 載入失敗，請稍後再試</div>';}
}

/* ══════════════════════════════
   8. FAQ 手風琴
══════════════════════════════ */
function toggleFaq(el) {
  const item=el.closest('.faq-item');
  const isOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
  if(!isOpen)item.classList.add('open');
}

/* ══════════════════════════════
   9. Enter 鍵查詢
══════════════════════════════ */
document.addEventListener('DOMContentLoaded', async () => {
  const siteSettings = await SITE_SETTINGS_STORE.loadRemote();
  SITE_SETTINGS_STORE.apply(siteSettings);
  refreshWebhookEndpoints();
  hydrateSiteShell();
  const qi=document.getElementById('queryInput');
  if(qi) qi.addEventListener('keydown',e=>{if(e.key==='Enter')queryCase();});
  document.querySelectorAll('.dash-tab').forEach(btn=>{btn.addEventListener('click',()=>loadDashboard(btn.dataset.period));});
  const initialPage = (location.hash || '').replace(/^#/, '');
  if (initialPage && document.getElementById('page-' + initialPage)) showPage(initialPage);
  initHeroBubbles();
  initHeroMediaCarousel();
  updateScrollProgress();
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('resize', updateScrollProgress);
  loadStats();
  loadDashboard('7d');
  loadRecentReplies();
});
