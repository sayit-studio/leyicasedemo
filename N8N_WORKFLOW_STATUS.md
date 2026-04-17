# n8n Workflow Status

Last checked: 2026-04-17

Base URL:

`https://drwu.zeabur.app/webhook/leyicasedemo`

## Status Summary

| Feature | Path | Method | Live status | Repo JSON | Data source | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| Stats | `/stats` | GET | 200 OK | Missing | `demoDB_case` | Export current n8n workflow JSON into repo. |
| Case list | `/list?page=1` | GET | 200 OK | Missing | `demoDB_case` | Export current n8n workflow JSON into repo. |
| Case query | `/query?caseId=...` | GET | 200 OK | Missing | `demoDB_case` | Export current n8n workflow JSON into repo. |
| Dashboard | `/dashboard?period=7d` | GET | 200 OK | `n8n/WF-04_dashboard.json` | `demoDB_case` | Keep synced after n8n UI edits. |
| Case submit | `/submit` | POST | Not tested this pass | Missing | `demoDB_case`, LINE | Test with safe payload or confirm in n8n UI, then export JSON. |
| Inspections | `/inspections` | GET | 404 | Missing | `demoDB_inspections` | Build workflow or hide frontend entry until ready. |
| Interpellations | `/interpellations` | GET | 404 | Missing | `demoDB_interpellations` | Build workflow or hide frontend entry until ready. |
| Proposals | `/proposals` | GET | 404 | Missing | `demoDB_proposals` | Build workflow or hide frontend entry until ready. |
| Achievements | `/achievements` | GET | 200 OK, empty items | `n8n/WF-11_achievements_list.json` | `demoDB_achievement` | Verify Notion public/filter data and field mapping. |
| Achievement like | `/achievements/like` | POST | Not tested this pass | `n8n/WF-12_achievements_like.json` | `demoDB_achievement` | Test manually with one safe achievement id. |
| Pages | `/pages` | GET | 404 | `n8n/WF-14_pages.json` | `demoDB_site_pages` | Import workflow into n8n and enable production webhook. |
| Settings | `/settings` | GET | 404 | `n8n/WF-13_settings.json` | `demoDB_site_settings` | Import workflow into n8n and enable production webhook. |

## Current Gap

The production n8n instance already has working endpoints for the core petition flow (`stats`, `list`, `query`, `dashboard`), but the repository only stores JSON for `dashboard`, `achievements`, and `achievements/like`.

Before expanding more frontend features, the repo should contain the exported workflow JSON for every live endpoint. Otherwise future rebuilds or client-copy demos can drift from the working n8n instance.

## Recommended Order

1. Export live `stats`, `list`, `query`, and `submit` workflow JSON into `n8n/`.
2. Import and activate `n8n/WF-13_settings.json` for `demoDB_site_settings`.
3. Import and activate `n8n/WF-14_pages.json` for `demoDB_site_pages`.
4. Decide whether `inspections`, `interpellations`, and `proposals` should be implemented now or temporarily hidden from frontend navigation.
5. Fix `achievements` data source/filter so the wall returns real Notion rows instead of an empty list.

## Response Shape Rule

All public GET workflows should return a stable JSON envelope:

```json
{
  "success": true,
  "items": []
}
```

Single-record query workflows may return:

```json
{
  "found": true
}
```

Failed or unavailable workflows should still return JSON with `success: false` or `found: false` where possible, instead of relying on a frontend 404.
