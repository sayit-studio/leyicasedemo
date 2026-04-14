# Project TODO

## 目標

把目前的 demo site 整理成可複製的客戶模板，並補齊：

1. 前台頁面結構可由後台管理
2. Notion / n8n / Cloudinary / API 串接完成
3. 政績專區重新設計，能明確傳達「成果的重要性」
4. 建立可持續複製與交付的 SOP

## 一、架構決策

### A. 前台頁面管理方式

需求：前台頁面可以透過後台控制新增、顯示開關、父子層、排序。

建議做法：

1. 建立 `site_pages` 資料模型
2. 後台提供頁面樹狀管理介面
3. 支援拖曳排序、父子層設定、slug、顯示開關、頁面類型
4. 前台導覽與頁面區塊由頁面設定驅動

### B. 政績專區的內容模型

目前問題：

1. 呈現偏時間軸與列表，重要性層級不夠明確
2. 視覺上像資料羅列，不像「成果展示」
3. 沒有把「成果價值」與「社會感知」拉出來

建議重做成三層：

1. 旗艦成果：大圖 + 影響數據 + 成果摘要
2. 專題成果：依主題分類的成果卡群組
3. 完整成果庫：可篩選、可搜尋、可排序的資料列表

## 二、你手工要做的

### 1. 資料源規劃

1. 建立 Notion workspace 中要用的 databases
2. 確認每個 database 的欄位命名，不要中途頻繁更動
3. 建立 n8n 環境與 credentials
4. 建立 Cloudinary 帳號與上傳 preset
5. 準備每個客戶的品牌素材：
   - logo
   - 品牌色
   - 首頁主文案
   - 聯絡方式
   - LINE 連結
   - 政績內容樣本

### 2. 產品決策

1. 確定前台頁面是否允許「純連結頁」與「內容頁」共存
2. 確定頁面層級最多支援幾層，建議先限制 2 層
3. 確定政績專區的主軸是：
   - 服務成果
   - 政策推動
   - 地方建設
   - 綜合型
4. 決定第一版是否要做多語系，建議不要
5. 確定第一版是否支援多客戶共用後台，建議不要

### 3. 外部平台設定

1. 在 GitHub 建立正式 repo 或確認目前 repo 作為主 repo
2. 設定部署環境
3. 設定網域
4. 建立正式環境 secrets

## 三、Codex 可以完成的

### 1. 模板與前端架構

1. 繼續把前台頁面改成設定驅動
2. 建立 `site_pages` 的前端資料結構
3. 實作後台頁面管理 UI
4. 實作前台導覽樹與頁面顯示邏輯
5. 整理客戶模板設定結構
6. 建立 clone / handoff 文件

### 2. 政績專區重構

1. 重新設計政績專區資訊架構
2. 製作新的政績首頁版型
3. 調整政績卡片與視覺層級
4. 串接後台管理欄位到政績前台
5. 補上成果分類、置頂、精選、封面圖機制

### 3. Notion / n8n 相關產物

1. 幫你定義 Notion database schema
2. 幫你整理每個 schema 的欄位用途
3. 幫你產出 n8n workflow 規格文件
4. 幫你補齊 workflow JSON 範本
5. 幫你整理 webhook payload 規格

### 4. 工程交付文件

1. 建立專案初始化文件
2. 建立新客戶複製 SOP
3. 建立部署檢查清單
4. 建立待辦與里程碑文件

## 四、共同配合完成的

### 1. Notion database 建置

Codex 可完成：

1. schema 設計
2. 欄位命名規格
3. 關聯建議
4. demo 資料樣本格式

你要完成：

1. 實際在 Notion 建 database
2. 建 integration
3. 授權該 integration 存取資料庫
4. 提供 database IDs

### 2. n8n 建置

Codex 可完成：

1. workflow 設計
2. JSON 範本
3. 節點命名規範
4. webhook 路徑規劃

你要完成：

1. 匯入 workflow
2. 設定 n8n credentials
3. 連接 Notion / Cloudinary / LINE
4. 實際測試執行

### 3. GitHub / 部署

Codex 可完成：

1. 本地修改程式
2. 產出 commit 內容
3. 幫你整理 PR 說明
4. 如果 repo 已連上對應工具，可直接協助操作 GitHub

你要完成：

1. 確認 repo 權限
2. 確認是否允許直接 push / 開 PR
3. 確認部署目標平台與權限

## 五、Notion 待建項目

### 建議資料庫

1. `DB-01-site-settings`
   - 客戶品牌設定
   - LINE
   - CTA
   - 功能開關

2. `DB-02-site-pages`
   - 頁面名稱
   - slug
   - 父頁
   - 順序
   - 顯示開關
   - 頁面類型

3. `DB-03-petitions`
   - 陳情案件資料

4. `DB-04-inspections`
   - 會勘資料

5. `DB-05-interpellations`
   - 質詢資料

6. `DB-06-proposals`
   - 提案資料

7. `DB-07-achievements`
   - 政績成果資料

8. `DB-08-media-assets`
   - 圖片 / 封面 / 影音資源索引

## 六、n8n 待建項目

1. 首頁統計 `stats`
2. 案件列表 `list`
3. 案件查詢 `query`
4. 儀表板 `dashboard`
5. 表單送件 `submit`
6. 會勘清單 `inspections`
7. 質詢清單 `interpellations`
8. 提案清單 `proposals`
9. 政績列表 `achievements`
10. 政績按讚 `achievements/like`
11. 頁面結構 `pages`
12. 頁面詳細資料 `pages/:slug`

## 七、目前系統尚未完成的功能

### 高優先

1. 後台頁面樹狀管理
2. 前台導覽與頁面動態渲染
3. 表單欄位設定化
4. Notion / n8n 正式串接
5. 圖片上傳流程完整化
6. 政績專區改版

### 中優先

1. 客戶模板設定拆分
2. 新客戶 clone SOP
3. 後台欄位與權限收斂
4. 部署設定與 secrets 管理

### 低優先

1. 更多視覺主題
2. 更多分享機制
3. CSV / 匯出優化

## 八、下一輪建議執行項目

1. 定義 `site_pages` schema
2. 實作後台頁面管理 UI 雛形
3. 改首頁與導覽為頁面設定驅動
4. 重新設計政績專區 wireframe
5. 補 Notion / n8n 規格文件
