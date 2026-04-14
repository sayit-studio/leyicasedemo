# Notion DB Mapping

## 用途

這份文件是 Notion DB 與 n8n workflow 的對應表。

建立或調整 n8n 時，優先查這份文件：

1. 對應 Notion DB 名稱
2. 補上 Notion Database ID
3. 確認 n8n 使用的欄位名稱
4. 避免 workflow 內硬寫錯誤欄位

## 使用規則

1. 不要任意改 Notion 欄位名稱，n8n 會直接依欄位名稱讀寫
2. 若 Notion 欄位改名，必須同步更新本文件與 n8n workflow
3. `Database ID` 建立後由人工補上
4. 第一版以 DEMO、前台展示、民眾查詢、資料整理為主，不放任務派工欄位

---

## DB ID 對應總表

| DB 名稱 | 用途 | Notion Database ID | n8n 變數建議 |
| --- | --- | --- | --- |
| `demoDB_site_settings` | 網站 / 客戶設定 | `344b3ad1d1cd8015a7abf91dfb965033` | `NOTION_DB_SITE_SETTINGS` |
| `demoDB_site_pages` | 前台頁面 / 導覽 | `343b3ad1d1cd80079903dfd6c5592c9f` | `NOTION_DB_SITE_PAGES` |
| `demoDB_case` | 民眾陳情案件 | `343b3ad1d1cd800391f1ff4907635829` | `NOTION_DB_CASE` |
| `demoDB_inspection` | 會勘 / 現勘紀錄 | `343b3ad1d1cd81b089b1f63021bf47a0` | `NOTION_DB_INSPECTION` |
| `demoDB_interpellation` | 質詢紀錄 | `343b3ad1d1cd81fe86c6fee911681d3b` | `NOTION_DB_INTERPELLATION` |
| `demoDB_proposal` | 提案 / 建議案 | `343b3ad1d1cd81818a10e1b43e6fb120` | `NOTION_DB_PROPOSAL` |
| `demoDB_achievement` | 政績展示 | `344b3ad1d1cd80dfb8dad1099b9e0e6a` | `NOTION_DB_ACHIEVEMENT` |
| `demoDB_media_asset` | 圖片 / 影片 / 附件素材 | `344b3ad1d1cd80899ebffc481ef732b1` | `NOTION_DB_MEDIA_ASSET` |

---

## 1. `demoDB_site_settings`

用途：網站品牌、前台顯示設定、首頁統計、外部連結、webhook 基礎設定。

| 欄位名稱 | Notion 型別 | n8n 用途 |
| --- | --- | --- |
| `設定名稱` | Title | 讀取指定設定列，例如 `default` |
| `網站代碼` | Rich text | 專案 / 客戶識別 |
| `品牌名稱` | Rich text | 前台品牌顯示 |
| `品牌簡稱` | Rich text | 短名稱 |
| `後台名稱` | Rich text | 後台顯示 |
| `系統模式` | Select | `民眾陳情`、`政績展示`、`混合模式` |
| `主色` | Rich text | 前台主色 |
| `輔助色` | Rich text | 前台輔助色 |
| `Logo圖片` | URL | Logo |
| `首頁標題` | Rich text | 首頁 hero title |
| `首頁副標` | Rich text | 首頁 hero subtitle |
| `LINE連結` | URL | 前台 LINE CTA |
| `WebhookBase` | URL | n8n base URL |
| `WebhookPrefix` | Rich text | webhook prefix |
| `地方會勘數量` | Number | 首頁統計 |
| `國會質詢數量` | Number | 首頁統計 |
| `國會提案數量` | Number | 首頁統計 |
| `是否啟用` | Checkbox | 是否為目前啟用設定 |
| `備註` | Rich text | 備註 |

---

## 2. `demoDB_site_pages`

用途：前台頁面、導覽、父子層、顯示控制、SEO。

| 欄位名稱 | Notion 型別 | n8n 用途 |
| --- | --- | --- |
| `頁面名稱` | Title | 頁面管理主名稱 |
| `頁面代碼` | Rich text | slug，例如 `home`、`case-query` |
| `父層頁面ID` | Rich text | 第一版用文字 ID，空白代表頂層 |
| `排序` | Number | 同層排序 |
| `是否顯示` | Checkbox | 是否顯示在前台導覽 |
| `頁面類型` | Select | `section`、`group`、`external` |
| `模板代碼` | Rich text | 對應前端 template key |
| `導覽名稱` | Rich text | 前台導覽文字 |
| `導覽圖示` | Rich text | emoji 或 icon key |
| `SEO標題` | Rich text | SEO title |
| `SEO描述` | Rich text | SEO description |
| `外部連結` | URL | 外部頁面使用 |
| `內容狀態` | Select | `草稿`、`已發布`、`隱藏` |
| `最後更新說明` | Rich text | 管理備註 |

---

## 3. `demoDB_case`

用途：民眾陳情案件。第一版重點是前台查詢、公開展示、資料整理，不做任務派工。

| 欄位名稱 | Notion 型別 | n8n 用途 |
| --- | --- | --- |
| `案件標題` | Title | 案件主標題 |
| `案件編號` | Rich text | 查詢主 key，例如 `SVC-20260409-5193` |
| `案件類型` | Select | 前台分類 / 查詢篩選 |
| `案件區域` | Select | 前台區域篩選 |
| `案件狀態` | Status / Select | 前台查詢狀態 |
| `公開摘要` | Rich text | 前台列表摘要 |
| `回覆內容` | Rich text | 前台查詢回覆內容 |
| `改善前圖片` | Files / URL | 前台改善前圖片 |
| `改善後圖片` | Files / URL | 前台改善後圖片 |
| `結案日期` | Date | 結案顯示與排序 |
| `建立時間` | Created time | 時間排序 |
| `上次編輯時間` | Last edited time | 同步判斷 |
| `陳情人姓名` | Rich text | 表單資料 |
| `聯絡手機` | Phone number | 表單資料 / 查詢輔助 |
| `聯絡地址` | Rich text | 表單資料 |
| `聯絡Email` | Email | 表單資料 |
| `案件原始內容` | Rich text | 民眾送出的原始內容 |
| `是否公開` | Checkbox | 是否可前台公開 |
| `案件來源` | Select | `前台表單`、`LINE`、`人工匯入`、`其他` |
| `緊急程度` | Select | `一般`、`較急`、`緊急` |
| `標籤` | Multi-select | 前台查詢 / 篩選 |
| `公開詳情` | Rich text | 前台詳情內容 |
| `精選案件` | Checkbox | 首頁或精選案例 |
| `顯示排序` | Number | 前台手動排序 |
| `最後更新說明` | Rich text | 給前台看的更新摘要 |
| `查詢關鍵字` | Rich text | n8n 查詢輔助 |
| `資料狀態` | Select | `正常`、`測試資料`、`隱藏` |

排序 / 查詢優先欄位：

```text
緊急程度
建立時間
案件類型
案件區域
標籤
案件狀態
是否公開
```

---

## 4. `demoDB_inspection`

用途：地方會勘、現勘、協調會等前台展示資料。

| 欄位名稱 | Notion 型別 | n8n 用途 |
| --- | --- | --- |
| `會勘標題` | Title | 前台卡片標題 |
| `會勘日期` | Date | 排序 |
| `地點` | Rich text | 地點 |
| `行政區` | Select | 區域篩選 |
| `會勘類型` | Select | `會勘`、`現勘`、`協調會`、`地方行程` |
| `標籤` | Multi-select | 前台篩選 |
| `摘要` | Rich text | 卡片摘要 |
| `成果說明` | Rich text | 詳細說明 |
| `封面圖片` | Files / URL | 卡片圖 |
| `相關圖片` | Files | 多圖 |
| `是否公開` | Checkbox | 前台顯示 |
| `是否精選` | Checkbox | 精選展示 |
| `顯示排序` | Number | 手動排序 |
| `資料狀態` | Select | `草稿`、`已發布`、`隱藏` |
| `來源連結` | URL | 原始資料 |

---

## 5. `demoDB_interpellation`

用途：質詢紀錄、影片、議題整理。

| 欄位名稱 | Notion 型別 | n8n 用途 |
| --- | --- | --- |
| `質詢標題` | Title | 前台卡片標題 |
| `質詢日期` | Date | 排序 |
| `會期場次` | Rich text | 會期 / 場次 |
| `質詢對象` | Rich text | 機關 / 部會 / 單位 |
| `議題類型` | Select | 主題分類 |
| `標籤` | Multi-select | 前台篩選 |
| `摘要` | Rich text | 卡片摘要 |
| `重點內容` | Rich text | 詳細內容 |
| `影片連結` | URL | 影片 |
| `文件連結` | URL | 書面資料 |
| `封面圖片` | Files / URL | 卡片圖 |
| `是否公開` | Checkbox | 前台顯示 |
| `是否精選` | Checkbox | 精選展示 |
| `顯示排序` | Number | 手動排序 |
| `資料狀態` | Select | `草稿`、`已發布`、`隱藏` |

---

## 6. `demoDB_proposal`

用途：提案、建議案、政策主張展示。

| 欄位名稱 | Notion 型別 | n8n 用途 |
| --- | --- | --- |
| `提案標題` | Title | 前台卡片標題 |
| `提案日期` | Date | 排序 |
| `提案編號` | Rich text | 正式編號 |
| `提案類型` | Select | `建議案`、`預算案`、`政策提案`、`其他` |
| `議題類型` | Select | 主題分類 |
| `標籤` | Multi-select | 前台篩選 |
| `提案狀態` | Select | `提出`、`審議中`、`通過`、`持續關注` |
| `摘要` | Rich text | 卡片摘要 |
| `內容說明` | Rich text | 詳細內容 |
| `成果說明` | Rich text | 成果描述 |
| `相關預算` | Number | 如有預算可填 |
| `來源連結` | URL | 官方資料 |
| `封面圖片` | Files / URL | 卡片圖 |
| `是否公開` | Checkbox | 前台顯示 |
| `是否精選` | Checkbox | 精選展示 |
| `顯示排序` | Number | 手動排序 |
| `資料狀態` | Select | `草稿`、`已發布`、`隱藏` |

---

## 7. `demoDB_achievement`

用途：政績專區統一展示資料，可彙整案件、會勘、質詢、提案。

| 欄位名稱 | Notion 型別 | n8n 用途 |
| --- | --- | --- |
| `政績標題` | Title | 前台卡片標題 |
| `政績類型` | Select | `案件改善`、`會勘成果`、`質詢成果`、`提案成果`、`其他` |
| `議題類型` | Select | 主題分類 |
| `標籤` | Multi-select | 前台篩選 |
| `發布日期` | Date | 排序 |
| `摘要` | Rich text | 卡片摘要 |
| `詳細內容` | Rich text | 詳情頁內容 |
| `封面圖片` | Files / URL | 卡片圖 |
| `成果前圖片` | Files / URL | 前後對比 |
| `成果後圖片` | Files / URL | 前後對比 |
| `相關案件編號` | Rich text | 對應 `demoDB_case.案件編號` |
| `相關會勘ID` | Rich text | 第一版文字保存 |
| `相關質詢ID` | Rich text | 第一版文字保存 |
| `相關提案ID` | Rich text | 第一版文字保存 |
| `是否公開` | Checkbox | 前台顯示 |
| `是否精選` | Checkbox | 精選展示 |
| `顯示排序` | Number | 手動排序 |
| `資料狀態` | Select | `草稿`、`已發布`、`隱藏` |
| `來源連結` | URL | 文章 / 新聞 / 影片 |

---

## 8. `demoDB_media_asset`

用途：圖片、影片、附件素材庫。

| 欄位名稱 | Notion 型別 | n8n 用途 |
| --- | --- | --- |
| `素材名稱` | Title | 素材名稱 |
| `素材類型` | Select | `圖片`、`影片`、`文件`、`外部連結` |
| `檔案` | Files | Notion 檔案 |
| `檔案連結` | URL | Cloudinary / YouTube / Drive |
| `替代文字` | Rich text | 圖片 alt text |
| `圖說` | Rich text | caption |
| `用途` | Select | `封面`、`改善前`、`改善後`、`相簿`、`附件` |
| `關聯資料類型` | Select | `case`、`inspection`、`interpellation`、`proposal`、`achievement`、`site` |
| `關聯資料ID` | Rich text | 案件編號或其他資料 ID |
| `標籤` | Multi-select | 素材分類 |
| `是否公開` | Checkbox | 是否前台可用 |
| `顯示排序` | Number | 多圖排序 |
| `建立日期` | Date | 建立日期 |
| `資料狀態` | Select | `可用`、`待整理`、`隱藏` |

---

## n8n 讀取注意事項

1. 案件查詢優先使用 `demoDB_case.案件編號`
2. 前台公開列表必須過濾 `是否公開 = true`
3. 展示型 DB 建議過濾 `資料狀態 = 已發布`
4. 排序建議優先使用 `是否精選`、`顯示排序`、日期欄位
5. `demoDB_media_asset` 第一版可選用，不必強迫取代 `demoDB_case` 內的圖片欄位
