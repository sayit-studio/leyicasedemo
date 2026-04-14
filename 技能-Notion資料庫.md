# 技能-Notion資料庫

## 目的

定義 Notion 作為內容資料源時需要的資料庫與欄位規格。

## 建議資料庫

1. `demoDB_site_settings`
2. `demoDB_site_pages`
3. `demoDB_case`
4. `demoDB_inspection`
5. `demoDB_interpellation`
6. `demoDB_proposal`
7. `demoDB_achievement`
8. `demoDB_media_asset`

## 規則

1. 欄位名稱先定清楚再開發
2. 不要中途頻繁改欄位中文名稱
3. 頁面結構與內容資料分開
4. 圖片資源建議集中索引
5. 第一版詳細欄位規格記錄在 `NOTION_DATABASE_SCHEMA.md`
6. 第一版先避免跨 DB Relation，使用文字 ID 欄位降低建立成本，穩定後再升級 Relation / Rollup
