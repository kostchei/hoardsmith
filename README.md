# Ledger of Wonders

Static item generation web app built from `Draft.md`, using the 2024 D&D rules chassis first and 2014 SRD-era reference items where 2024 open content leaves gaps.

## What it does

- Generates magic or mundane items from a chosen chassis: weapon, armor, shield, staff, wand, rod, ring, potion, scroll, wondrous item, or tool.
- Lets you stay in standard 2024 category-based generation by default, with an optional switch to the 2024 DMG random-item table families: `Arcana`, `Armaments`, `Implements`, and `Relics`.
- Lets you name the base item directly or roll from a 2024 equipment-driven list.
- Anchors mechanics to 2024 rarity, attunement, crafting, sentient-item, and equipment rules.
- Pulls from official 2024-added SRD items where possible, with 2014 SRD reference items as fallback anchors.
- Exports full item records as Markdown or JSON.
- Calls a local LM Studio model for a concise player-facing summary.

## Rules stance

This project is designed to be 2024-compatible in structure and terminology, but it does not attempt to reproduce closed-book DMG content. The implementation uses:

- `SRD v5.2.1` first for 2024/5.5e-compatible open rules content.
- `SRD v5.1` / 2014-era open reference items where the 2024 open corpus only provides category examples or partial coverage.
- Original flavor tables and custom generation logic for gaps such as quirks, burdens, staged discovery details, and campaign hooks.

That means the chassis is rules-aligned, while some flavor and custom mechanics are original content built to fit that chassis.

Important distinction:

- The open 2024 rules still use the nine official magic-item categories such as `Armor`, `Potion`, `Ring`, `Rod`, `Scroll`, `Staff`, `Wand`, `Weapon`, and `Wondrous Item`.
- The app now exposes the 2024 DMG-style four-family lens, `Arcana`, `Armaments`, `Implements`, and `Relics`, as an optional generation bias and filtering layer above those chassis categories.

## Run locally

```bash
npm start
```

Then open `http://localhost:4173`.

You can also run any other static server against the repo root if you prefer.

## Check syntax

```bash
npm run check
```

## LM Studio setup

1. Load a model in LM Studio.
2. Start the LM Studio local server.
3. If you are running this repo locally with `npm start`, leave the app's default LM Studio URL at `/api/lmstudio/v1`.
4. Click `Detect Models`.
5. Pick the loaded model and click `Generate Summary`.

The app uses LM Studio's OpenAI-compatible `GET /v1/models` and `POST /v1/chat/completions` endpoints.

When running locally through this repo's Node server, the browser talks to a same-origin proxy and does not need LM Studio CORS headers.
If you host the UI somewhere else, switch the field to the direct LM Studio URL, such as `http://localhost:1234/v1`, and then CORS does matter.

### Recommended models under 16 GB RAM

- `qwen/qwen3-4b-2507`
  - Fast default.
  - LM Studio Hub lists `2 GB minimum system memory`.
  - Good fit for short descriptive summaries.
- `google/gemma-3-12b`
  - Better prose quality.
  - LM Studio Hub lists `11 GB minimum system memory`.
  - Still within a 16 GB ceiling.

## Azure Static Web Apps

This repo is static and does not require a front-end build step.

Typical deployment shape:

- App location: repo root
- Output location: blank
- API location: blank

The LM Studio integration is browser-side. That means the hosted site can still work, but the end user's browser must be able to reach the LM Studio server and that server must allow CORS.

## Primary source links

- SRD v5.2.1: https://www.dndbeyond.com/srd
- 2024 Equipment rules: https://www.dndbeyond.com/sources/dnd/br-2024/equipment
- 2024 Magic Items rules: https://www.dndbeyond.com/sources/dnd/br-2024/magic-items
- Azure Static Web Apps docs: https://learn.microsoft.com/en-us/azure/static-web-apps/
- LM Studio OpenAI compatibility: https://lmstudio.ai/docs/developer/openai-compat
- LM Studio server CLI docs: https://lmstudio.ai/docs/cli/serve/server-start
- LM Studio Qwen3 model hub: https://lmstudio.ai/models/qwen3
- LM Studio Gemma 3 12B page: https://lmstudio.ai/models/google/gemma-3-12b
