# Demo Template Architecture

## 目標

這個專案不是單一 SaaS，而是「可快速複製的客戶站點母版」。

核心要求：

1. 每個客戶是獨立系統、獨立品牌、獨立資料來源。
2. 前台、後台、政績專區可以依需求開關或擴充。
3. 新客戶版本應優先透過設定調整，而不是直接散改 HTML。

## 目前第一輪整理結果

### 1. 單一設定入口

主要設定集中在 [js/config.js](C:/dev/陳情系統/leyicasedemo/js/config.js)。

這份設定分成：

- `brand`: 品牌名稱、後台名稱、icon、footer 文案
- `integrations`: webhook base、prefix、LINE 連結
- `features`: 功能開關
- `content`: hero、FAQ、流程文案
- `navigation`: 前台導覽
- `petitions`: 案件類型、地區、靜態統計
- `seo`: 首頁、政績頁、表單、登入頁標題與描述

同時保留了原本的 `CONFIG` 結構，降低既有頁面改動成本。

### 2. 共用 webhook helper

`SITE_UTILS.webhook(path)` 負責組裝 webhook URL。

不要再在頁面內直接寫死：

```js
https://drwu.zeabur.app/webhook/leyidemo/...
```

改由設定驅動，客戶複製時只改 `webhookBase` 與 `webhookPrefix`。

### 3. 已經開始吃共用設定的頁面

- 前台首頁：[index.html](C:/dev/陳情系統/leyicasedemo/index.html) + [js/main.js](C:/dev/陳情系統/leyicasedemo/js/main.js)
- 表單頁：[form.html](C:/dev/陳情系統/leyicasedemo/form.html)
- 登入頁：[login.html](C:/dev/陳情系統/leyicasedemo/login.html)
- 政績前台：[leyi/achievements.html](C:/dev/陳情系統/leyicasedemo/leyi/achievements.html)
- 後台共用 shell：[admin.js](C:/dev/陳情系統/leyicasedemo/admin.js)

## 新客戶複製 SOP

### 最小步驟

1. 複製整個專案資料夾。
2. 修改 [js/config.js](C:/dev/陳情系統/leyicasedemo/js/config.js)：
   - `siteKey`
   - `brand.*`
   - `integrations.*`
   - `content.*`
   - `petitions.caseTypes`
   - `petitions.caseAreas`
3. 匯入對應的 n8n workflow，調整 webhook path prefix。
4. 建立或複製 Notion database schema。
5. 檢查首頁、表單、登入頁、政績頁是否符合該客戶品牌。

### 建議不要直接改的地方

- 不要優先散改各頁品牌名稱
- 不要在頁面內再新增寫死的 webhook URL
- 不要在不同頁面各自維護案件類型與地區清單

## 接下來應該繼續做的事

### 第二輪

1. 把 `form.html` 的案件類型與地區選項也改成由設定生成。
2. 把首頁導覽、分類 tab、流程區塊完全改成由設定生成。
3. 把後台頁面的標題與品牌文案收斂成共用 helper。

### 第三輪

1. 抽出「客戶 profile」與「方案模式」兩層設定。
2. 建立 `clients/<client-key>` 或等效資料夾結構。
3. 建立 clone / deploy script。

## 你需要建立的技能

### 直接對這個專案有用的技能

1. Config-driven frontend architecture
2. Notion schema 設計
3. n8n workflow 標準化
4. 設計 token / style system
5. clone / deploy automation
6. 將客戶需求拆成「品牌差異 / 功能差異 / 資料差異」的能力

### 實作優先順序

1. 設定驅動
2. 樣式系統
3. 資料模型標準化
4. 交付流程自動化
