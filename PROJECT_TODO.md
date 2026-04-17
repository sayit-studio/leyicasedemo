# PROJECT TODO

本文件只保留目前仍有執行價值的待辦。已完成事項不再展開細節，詳細開發紀錄請看 `進度專案.md`。

## 專案定位

這不是單一 SaaS，而是可快速複製的客戶 Demo 模板。

每個客戶應具備：

1. 獨立品牌與視覺設定
2. 獨立 Notion 資料庫
3. 獨立 n8n webhook 路徑
4. 可替換前台內容與頁面
5. 可展示陳情、政績、公開成果與後台管理流程

## 已完成

1. 前台首頁基礎 UI 與手機版主要 RWD
2. Hero CTA 手機版比例修正
3. 首頁「如何提出陳情？」流程卡片手機版修正
4. 公開案件列表讀取 n8n `/list`
5. 案件查詢讀取 n8n `/query`
6. 陳情送出流程對應 n8n `/submit`
7. 首頁統計與儀錶板基礎資料讀取
8. 首頁「案件趨勢」改為「近期公開回覆」
9. 政績牆頁面基礎 UI
10. 政績牆串接 n8n `/achievements`
11. demo logo 支援 `leyi/assets/brand/logo.png`
12. Super Admin demo 登入 fallback
13. 後台 CSS 路徑修正
14. Notion 8 個 demoDB 資料庫規劃與 ID 對應文件
15. demoDB_case 已建立擬真測試資料

## 進行中

### 1. 前台頁面管理

目標：前台導覽與頁面可由設定資料驅動。

目前狀態：

1. 已有 `site_pages` 第一版資料模型
2. 已有後台頁面管理雛形
3. 已有前台導覽設定化的初步基礎

待處理：

1. 串接 `demoDB_site_pages`
2. 建立 n8n `/pages` workflow
3. 建立 n8n `/pages/:slug` 或等效查詢流程
4. 前台導覽正式改為讀取頁面資料
5. 最多只支援 2 層頁面，不做任意深度樹

### 2. Site Settings 與第二套風格

目標：同一套模板可以依客戶切換品牌與風格。

待處理：

1. 串接 `demoDB_site_settings`
2. 建立 n8n `/settings` workflow
3. 設定可控制 logo、品牌名稱、首頁文案、LINE 連結
4. 設定可控制 theme key
5. 建立第二套前台視覺風格

### 3. 政績牆補強

目標：政績牆能展示具體成果，讓民眾理解服務成果。

目前狀態：

1. 已改為成果卡片呈現
2. 已支援標籤、圖片、內容與詳情基礎資料
3. 已串接 `/achievements`

待處理：

1. 詳情 modal 補完整過程文字
2. 支援多張圖片輪播
3. 支援影片連結
4. 支援標籤篩選
5. 補齊成果資料的 n8n 欄位對應文件

### 4. 後台管理

目標：Demo 能展示「前台可由後台管理」的可信流程。

目前狀態：

1. Super Admin demo 登入可用
2. 後台頁面已修正 CSS 載入
3. 有客戶管理與頁面管理雛形

待處理：

1. 後台頁面管理串接真實資料
2. 後台站台設定串接真實資料
3. 客戶管理補「新增客戶」流程
4. Webhook 端點管理補對應資訊
5. 權限系統目前仍是 demo fallback，正式版需另行設計

## 下一步建議

### 優先順序 1：整理 n8n workflow 實際狀態

目的：確認 GitHub 內 workflow JSON 與 n8n 線上版本一致。

目前狀態：

1. 已新增 `N8N_WORKFLOW_STATUS.md`
2. 已確認正式 webhook 可用：`/stats`、`/list`、`/query`、`/dashboard`、`/achievements`
3. 已確認正式 webhook 尚未存在或未啟用：`/inspections`、`/interpellations`、`/proposals`、`/pages`、`/settings`
4. 尚未測試 POST：`/submit`、`/achievements/like`

待補：

1. `/stats`
2. `/list`
3. `/query`
4. `/dashboard`
5. `/submit`
6. `/achievements`
7. `/achievements/like`
8. 尚未完成的 `/pages`
9. 尚未完成的 `/settings`
10. 匯出線上可用 workflow JSON 至 `n8n/`

### 優先順序 2：完成 `site_settings`

目的：讓第二套風格與品牌設定可以由資料庫控制。

預期成果：

1. 前台讀取品牌設定
2. 可切換 theme key
3. 可切換 logo、文案與 CTA
4. 後台可看到設定資料

### 優先順序 3：完成 `site_pages`

目的：讓前台導覽不再寫死。

預期成果：

1. 前台導覽讀取 page data
2. 支援顯示 / 隱藏
3. 支援最多 2 層
4. 後台可看到頁面列表與排序

### 優先順序 4：整理交付 SOP

目的：讓每次複製新客戶 Demo 時可照表操作。

需要文件：

1. Notion 建表 SOP
2. n8n 匯入 workflow SOP
3. GitHub Pages 部署 SOP
4. 新客戶初始化 SOP
5. 圖片與媒體素材命名 SOP

## 暫緩

以下項目先不做，避免 Demo 第一版範圍過大：

1. 任務派工系統
2. 任意深度頁面樹
3. Block-level page builder
4. 正式多租戶 SaaS 架構
5. 完整權限 RBAC
6. Cloudinary 正式上傳流程
7. CSV 匯入 / 匯出
8. GitHub PR 自動化流程

## Notion DB 清單

正式 ID 與欄位請以 `NOTION_DB_MAPPING.md` 為準。

1. `demoDB_site_settings`
2. `demoDB_site_pages`
3. `demoDB_case`
4. `demoDB_inspections`
5. `demoDB_interpellations`
6. `demoDB_proposals`
7. `demoDB_achievement`
8. `demoDB_media_assets`

## n8n Webhook 清單

目前命名原則：`leyicasedemo/xxxx`

正式路徑範例：

`https://drwu.zeabur.app/webhook/leyicasedemo/stats`

已使用或規劃中的路徑：

1. `leyicasedemo/stats`
2. `leyicasedemo/list`
3. `leyicasedemo/query`
4. `leyicasedemo/dashboard`
5. `leyicasedemo/submit`
6. `leyicasedemo/inspections`
7. `leyicasedemo/interpellations`
8. `leyicasedemo/proposals`
9. `leyicasedemo/achievements`
10. `leyicasedemo/achievements/like`
11. `leyicasedemo/pages`
12. `leyicasedemo/settings`

## 判斷原則

後續開發優先順序：

1. 先讓前後台流程跑得通
2. 再讓資料來源可替換
3. 再做 UI 細節
4. 最後才做自動化與正式權限

不為 Demo 第一版增加過重架構。
