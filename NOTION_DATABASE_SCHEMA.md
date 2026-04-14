# Notion Database Schema

## 目的

本文件定義本 demo 模板第一版 Notion 資料庫。命名統一使用 `demoDB_` 開頭，方便複製到不同客戶專案。

## 總數

第一版共需要 8 個 Notion DB：

1. `demoDB_site_settings`
2. `demoDB_site_pages`
3. `demoDB_case`
4. `demoDB_inspection`
5. `demoDB_interpellation`
6. `demoDB_proposal`
7. `demoDB_achievement`
8. `demoDB_media_asset`

## 建立順序

1. 先建立 `demoDB_site_settings`
2. 再建立 `demoDB_site_pages`
3. 再建立 `demoDB_case`
4. 再建立 `demoDB_media_asset`
5. 最後建立政績相關 DB：`demoDB_inspection`、`demoDB_interpellation`、`demoDB_proposal`、`demoDB_achievement`

第一版先避免跨 DB Relation，改用 `related_*_id` 或 `owner_record_id` 文字欄位保存關聯，降低 Notion schema 建立複雜度。等資料流穩定後再升級為 Relation / Rollup。

---

## 1. `demoDB_site_settings`

用途：每個客戶 demo 的品牌、模式與 webhook 基礎設定。

| 欄位 | Notion 型別 | 說明 |
| --- | --- | --- |
| `Name` | Title | 設定名稱，例如 `default` |
| `site_key` | Rich text | 客戶或 demo 的唯一代碼 |
| `customer_name` | Rich text | 客戶名稱 |
| `brand_name` | Rich text | 前台完整品牌名稱 |
| `brand_short_name` | Rich text | 短品牌名稱 |
| `admin_name` | Rich text | 後台顯示名稱 |
| `system_mode` | Select | `petition`、`achievement`、`mixed` |
| `primary_color` | Rich text | 主色 HEX |
| `accent_color` | Rich text | 強調色 HEX |
| `logo_url` | URL | Logo 圖片網址 |
| `line_url` | URL | LINE 官方帳號或群組連結 |
| `webhook_base` | URL | n8n base URL |
| `webhook_prefix` | Rich text | webhook prefix |
| `is_active` | Checkbox | 是否啟用 |
| `notes` | Rich text | 備註 |

---

## 2. `demoDB_site_pages`

用途：前台導覽、頁面階層、顯示狀態與 SEO 基礎資料。

| 欄位 | Notion 型別 | 說明 |
| --- | --- | --- |
| `title` | Title | 頁面名稱 |
| `slug` | Rich text | 前台 section key / 路由鍵，需唯一 |
| `parent_id` | Rich text | 父頁 ID，空值代表頂層 |
| `sort_order` | Number | 同層排序 |
| `is_visible` | Checkbox | 是否顯示於前台導覽 |
| `page_type` | Select | `section`、`group`、`external` |
| `template_key` | Rich text | 對應模板或 section 類型 |
| `nav_label` | Rich text | 導覽顯示文字 |
| `nav_icon` | Rich text | 導覽 icon / emoji |
| `seo_title` | Rich text | SEO 標題 |
| `seo_description` | Rich text | SEO 描述 |
| `external_url` | URL | `page_type=external` 時使用 |
| `content_status` | Select | `draft`、`published`、`hidden` |
| `updated_note` | Rich text | 更新備註 |

---

## 3. `demoDB_case`

用途：民眾陳情案件主資料。

| 欄位 | Notion 型別 | 說明 |
| --- | --- | --- |
| `case_id` | Title | 案件編號，例如 `SVC-20260415-0001` |
| `title` | Rich text | 案件標題 |
| `case_type` | Select | 案件分類 |
| `case_area` | Select | 行政區 / 地區 |
| `status` | Status | `待處理`、`處理中`、`追蹤中`、`已結案` |
| `priority` | Select | `low`、`normal`、`high`、`urgent` |
| `source_channel` | Select | `web`、`line`、`phone`、`manual` |
| `petitioner_name` | Rich text | 陳情人姓名 |
| `petitioner_phone` | Phone number | 陳情人電話 |
| `petitioner_email` | Email | 陳情人 Email |
| `summary` | Rich text | 案件摘要 |
| `reply` | Rich text | 回覆內容 |
| `public_summary` | Rich text | 前台可公開摘要 |
| `created_date` | Date | 建案日期 |
| `closed_date` | Date | 結案日期 |
| `assigned_to` | Rich text | 承辦或負責人 |
| `before_media_ids` | Rich text | 關聯 media id，第一版用文字保存 |
| `after_media_ids` | Rich text | 關聯 media id，第一版用文字保存 |
| `is_public` | Checkbox | 是否可在前台公開 |
| `internal_note` | Rich text | 內部備註 |

---

## 4. `demoDB_inspection`

用途：會勘、現勘、地方行程紀錄。

| 欄位 | Notion 型別 | 說明 |
| --- | --- | --- |
| `title` | Title | 會勘標題 |
| `inspection_date` | Date | 會勘日期 |
| `location` | Rich text | 地點 |
| `district` | Select | 行政區 |
| `inspection_type` | Select | `會勘`、`現勘`、`協調會`、`拜會` |
| `status` | Select | `draft`、`published`、`archived` |
| `summary` | Rich text | 摘要 |
| `result` | Rich text | 會勘結果 |
| `participants` | Rich text | 參與單位或人員 |
| `media_ids` | Rich text | 關聯 media id |
| `source_url` | URL | 原始貼文或資料連結 |
| `is_public` | Checkbox | 是否前台公開 |
| `sort_order` | Number | 前台排序 |

---

## 5. `demoDB_interpellation`

用途：質詢紀錄與影片資料。

| 欄位 | Notion 型別 | 說明 |
| --- | --- | --- |
| `title` | Title | 質詢標題 |
| `interpellation_date` | Date | 質詢日期 |
| `session` | Rich text | 會期 / 場次 |
| `target_agency` | Rich text | 質詢對象或機關 |
| `topic` | Select | 主題分類 |
| `status` | Select | `draft`、`published`、`archived` |
| `summary` | Rich text | 摘要 |
| `video_url` | URL | 影片連結 |
| `document_url` | URL | 書面資料連結 |
| `transcript` | Rich text | 逐字稿摘要或重點 |
| `media_ids` | Rich text | 關聯 media id |
| `is_public` | Checkbox | 是否前台公開 |
| `sort_order` | Number | 前台排序 |

---

## 6. `demoDB_proposal`

用途：提案、建議案、預算或政策追蹤資料。

| 欄位 | Notion 型別 | 說明 |
| --- | --- | --- |
| `title` | Title | 提案名稱 |
| `proposal_date` | Date | 提案日期 |
| `proposal_no` | Rich text | 提案編號 |
| `category` | Select | 類別 |
| `status` | Status | `提案中`、`審議中`、`執行中`、`已完成` |
| `target_agency` | Rich text | 對應機關 |
| `summary` | Rich text | 提案摘要 |
| `progress_note` | Rich text | 進度說明 |
| `budget` | Number | 相關預算，無則空白 |
| `source_url` | URL | 議會或公開資料連結 |
| `media_ids` | Rich text | 關聯 media id |
| `is_public` | Checkbox | 是否前台公開 |
| `sort_order` | Number | 前台排序 |

---

## 7. `demoDB_achievement`

用途：政績專區統一展示資料，可彙整案件、會勘、質詢與提案成果。

| 欄位 | Notion 型別 | 說明 |
| --- | --- | --- |
| `title` | Title | 政績標題 |
| `category` | Select | 類別，例如 `交通`、`教育`、`建設` |
| `status` | Select | `draft`、`published`、`archived` |
| `summary` | Rich text | 卡片摘要 |
| `content` | Rich text | 詳細內容摘要 |
| `cover_image_url` | URL | 封面圖 |
| `published_date` | Date | 發布日期 |
| `related_case_id` | Rich text | 關聯案件 ID |
| `related_inspection_id` | Rich text | 關聯會勘 ID |
| `related_interpellation_id` | Rich text | 關聯質詢 ID |
| `related_proposal_id` | Rich text | 關聯提案 ID |
| `media_ids` | Rich text | 關聯 media id |
| `is_featured` | Checkbox | 是否精選 |
| `is_public` | Checkbox | 是否前台公開 |
| `sort_order` | Number | 前台排序 |

---

## 8. `demoDB_media_asset`

用途：集中管理圖片、影片、附件與前台可用素材。

| 欄位 | Notion 型別 | 說明 |
| --- | --- | --- |
| `title` | Title | 素材名稱 |
| `media_type` | Select | `image`、`video`、`document`、`external_url` |
| `file_url` | URL | Cloudinary、YouTube、Google Drive 等連結 |
| `file` | Files | Notion 檔案，若直接上傳使用 |
| `alt_text` | Rich text | 圖片替代文字 |
| `caption` | Rich text | 圖說 |
| `owner_db` | Select | `case`、`inspection`、`interpellation`、`proposal`、`achievement`、`site` |
| `owner_record_id` | Rich text | 關聯資料 ID |
| `usage_context` | Select | `cover`、`before`、`after`、`gallery`、`attachment` |
| `is_public` | Checkbox | 是否可前台公開 |
| `sort_order` | Number | 排序 |
| `created_date` | Date | 建立日期 |

---

## 下一階段 Notion 建立需求

要實際建立 Notion DB，需要提供：

1. Notion 父頁 URL 或 page ID
2. 是否要先建立全部 8 個 DB，或先建立核心 4 個 DB：`demoDB_site_settings`、`demoDB_site_pages`、`demoDB_case`、`demoDB_media_asset`
3. 各 Select / Status 欄位是否使用上述預設選項

