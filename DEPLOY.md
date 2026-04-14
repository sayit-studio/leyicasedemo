# 市民服務平台管理後台 — 部署 SOP

## 目標時間：1.5 小時內完成

---

## Step 1｜準備環境變數（15 分鐘）

複製範本並填入實際值：

```bash
cp .env.local.example .env.local
```

必填項目：
- `NOTION_TOKEN` — Notion Integration 的 Secret Token
- `NOTION_DB_CASES` — 案件主資料庫的 32 碼 ID
- `NEXTAUTH_SECRET` — 隨機產生（執行 `openssl rand -base64 32`）
- `NEXTAUTH_URL` — 後台部署後的網址（Vercel 給的）

---

## Step 2｜部署到 Vercel（20 分鐘）

### 方式 A：GitHub 自動部署（推薦）

```bash
# 1. Fork 管理後台 Repository
# 2. 在 Vercel 匯入 GitHub Repo
# 3. 設定環境變數（貼入 .env.local 的內容）
# 4. Deploy
```

### 方式 B：Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

部署時選擇：
- Framework: Next.js
- Root Directory: ./（預設）
- Build Command: `npm run build`（預設）

---

## Step 3｜建立 Notion Integration（10 分鐘）

1. 前往 https://www.notion.so/my-integrations
2. 點「New integration」
3. 填寫名稱（如：市民服務後台）
4. 複製 Internal Integration Token → 填入 `NOTION_TOKEN`
5. 前往 Notion 資料庫頁面 → 右上角「...」→「Add connections」→ 選擇剛建立的 Integration

---

## Step 4｜建立 Super Admin 帳號（5 分鐘）

部署完成後，執行初始化 API：

```bash
curl -X POST https://your-admin.vercel.app/api/setup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your@email.com",
    "password": "your-secure-password",
    "name": "系統管理員"
  }'
```

或直接在 Vercel 環境變數設定 `SUPER_ADMIN_EMAIL` 和 `SUPER_ADMIN_PASSWORD`，系統會在首次啟動時自動建立。

---

## Step 5｜測試驗收（15 分鐘）

| 測試項目 | 預期結果 |
|---|---|
| 登入頁 `login.html` | 可正常顯示，無錯誤 |
| 使用 Super Admin 帳密登入 | 跳轉到儀表板 |
| 儀表板統計卡片 | 顯示 Notion 資料庫的案件數字 |
| 案件列表 | 顯示 Notion 資料庫的案件列表 |
| 新增案件 | 建立後 Notion 有新資料 |
| 更新案件狀態 | Notion 欄位同步更新 |
| LINE 通知 | 幕僚群組收到推播 |
| 圖片上傳 | Cloudinary 有圖片，Notion Files 有 URL |
| Super Admin → 新增客戶 | 可建立新客戶帳號 |

---

## Step 6｜政績版額外設定（僅政績版需要）

1. 在 Notion 建立三個額外資料庫：現場會勘、國會質詢、國會提案
2. 分別複製 Database ID
3. 填入環境變數：
   - `NOTION_DB_INSPECTIONS`
   - `NOTION_DB_INTERPELLATIONS`
   - `NOTION_DB_PROPOSALS`
4. 設定 `SYSTEM_MODE=achievement`
5. 重新部署 Vercel

---

## 常見問題

**Q：登入後立刻被踢回登入頁**
A：`NEXTAUTH_SECRET` 未設定或太短（需至少 32 字元）

**Q：儀表板數字全部是「—」**
A：Notion Token 未正確設定，或 Integration 未分享給資料庫

**Q：圖片上傳失敗**
A：Cloudinary 憑證錯誤，確認 Cloud Name / API Key / Secret 無誤

**Q：LINE 通知未發送**
A：`LINE_CHANNEL_TOKEN` 未設定，或 n8n `/notify` Webhook 路徑有誤

**Q：n8n 資料全部是 0 或空**
A：確認 n8n Notion 節點的 **Simplify 已關閉**（OFF）

---

## 檔案架構說明

```
admin/
├── login.html            登入頁
├── dashboard.html        儀表板
├── cases.html            案件列表
├── cases-detail.html     案件詳情
├── cases-new.html        新增案件
├── users.html            帳號管理
├── settings.html         系統設定
├── super-admin.html      Super Admin
├── inspections.html      現場會勘（政績版）
├── interpellations.html  國會質詢（政績版）
├── proposals.html        國會提案（政績版）
├── css/admin.css         設計系統
├── js/admin.js           核心邏輯
└── .env.local.example    環境變數範本
```

---

## API Routes 對應（Next.js）

| 路由 | 方法 | 功能 |
|---|---|---|
| `/api/auth/login` | POST | 帳密登入 |
| `/api/auth/google` | GET | Google SSO |
| `/api/setup` | POST | 初始化 Super Admin |
| `/api/cases` | GET/POST | 案件列表/新增 |
| `/api/cases/[id]` | GET/PATCH/DELETE | 案件詳情/更新/刪除 |
| `/api/cases/[id]/notify` | POST | 觸發 LINE 通知 |
| `/api/images/upload` | POST | 圖片上傳 Cloudinary |
| `/api/stats` | GET | 儀表板統計 |
| `/api/users` | GET/POST | 帳號列表/新增 |
| `/api/users/[id]` | PATCH/DELETE | 帳號編輯/刪除 |
| `/api/settings` | GET/PATCH | 系統設定 |
| `/api/inspections` | GET/POST | 現場會勘 |
| `/api/inspections/[id]` | GET/PATCH/DELETE | 會勘詳情 |
| `/api/interpellations` | GET/POST | 國會質詢 |
| `/api/interpellations/[id]` | GET/PATCH/DELETE | 質詢詳情 |
| `/api/proposals` | GET/POST | 國會提案 |
| `/api/proposals/[id]` | GET/PATCH/DELETE | 提案詳情 |
| `/api/super-admin/overview` | GET | 跨客戶統計 |
| `/api/super-admin/clients` | GET/POST | 客戶管理 |
| `/api/super-admin/clients/[id]` | DELETE | 刪除客戶 |
