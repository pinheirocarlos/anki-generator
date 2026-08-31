# Quickstart Guide: AnkiWeb E2E Automation & Visual Layout Guardrails

**Feature Branch**: `004-ankiweb-e2e-automation`  
**Date**: 2026-08-30  

---

## 1. Overview

This quickstart guides you through setting up and running both the **Fast Local Component Runner** (< 3 seconds, offline) and the **Full Cloud AnkiWeb E2E Runner** (Playwright + Anki Desktop + Anki-Connect).

---

## 2. Prerequisites

### 2.1 Node.js & Dependencies
- Node.js v18.0.0 or higher.
- Install project dependencies and Playwright Chromium:
  ```bash
  npm install
  npx playwright install chromium
  ```

### 2.2 Local Anki Desktop Setup (for Full E2E Cloud Suite only)
1. Launch **Anki Desktop** on your machine.
2. Ensure the **Anki-Connect** add-on (code `2055492159`) is installed:
   - In Anki Desktop: `Tools` → `Add-ons` → `Get Add-ons...` → Enter `2055492159`.
   - Verify Anki-Connect is listening on `http://127.0.0.1:8765`.
3. Ensure Anki Desktop is linked to your **AnkiWeb account** (`https://ankiweb.net/`).

### 2.3 Environment Secrets Configuration
Create a local `.env` file in the root directory from `.env.example`:
```bash
cp .env.example .env
```
Populate `.env` with your AnkiWeb credentials:
```env
ANKIWEB_USER=your_email@example.com
ANKIWEB_PASSWORD=your_secure_password
```
*(Note: `.env` and `.auth/` are strictly ignored in `.gitignore`)*

---

## 3. Fast Local Component Runner (Instant Feedback)

Use this command during local development for sub-3-second verification of DOM, CSS layout, horizontal scroll at 360px, KaTeX rendering, and touch targets:

```bash
npm run test:e2e:local
```

### Expected Output:
```text
🚀 Starting Local E2E Component Runner (Headless Chromium)...
🔍 Sampled 8 representative cards covering 100% of typologies.
   ✔ [L2_FUNDAMENTAL] CS-ARCH-CACHE-001 (0 overflow @ 360px)
   ✔ [L3_JUNIOR] DSA-ARRAY-TWOPTR-001 (0 overflow @ 360px)
   ✔ [L4_PLENO_CODE] DSA-TREE-BST-001 (Dark Modern code tokens verified)
   ✔ [MICRO_VIDEO] SYS-NET-TCP-001 (Autoplay/loop/playsinline verified)
   ✔ [RESPONSIVE_SVG] SYS-CONS-RAFT-001 (viewBox verified)
   ✔ [COMPACT_TABLE] CS-DB-ISOLATION-001 (<= 3 cols verified)
   ✔ [KATEX_MATH] DSA-COMPLEXITY-MASTER-001 (0 katex errors)
   ✔ [DETAILS_ACCORDION] HLD-KAFKA-PARTITION-001 (Summary height >= 44px)

✨ Local E2E Validation PASSED in 1.84s (0 failures, 8/8 cards compliant).
```

---

## 4. Full AnkiWeb E2E Pipeline (Cloud Verification)

Run the full end-to-end pipeline:
1. Dynamic card sampling & compilation (`MAANG_E2E_Sanity.apkg`).
2. Anki-Connect local import & sync to AnkiWeb.
3. Playwright browser navigation, study session, layout assertions, and visual snapshot comparison.
4. Structured report generation in `reports/e2e/e2e-report.json`.

```bash
npm run test:e2e
```

### Options & Flags:

- **Clean up test deck after completion**:
  ```bash
  npm run test:e2e -- --cleanup
  ```
- **Run in headed browser mode (observe automated clicks & navigation)**:
  ```bash
  npm run test:e2e -- --headed
  ```
- **Update golden baseline snapshots**:
  ```bash
  npm run test:e2e -- --update-snapshots
  ```
- **Filter sampling to a specific phase**:
  ```bash
  npm run test:e2e -- --phase 01-dsa
  ```

---

## 5. Troubleshooting & Diagnostics

### Fail-Fast Diagnostic: Anki-Connect Connection Refused
If Anki Desktop is not running, the runner immediately halts with:
```text
❌ Anki-Connect Connection Error (ECONNREFUSED)
   Unable to connect to Anki-Connect at http://127.0.0.1:8765.

Resolution Steps:
   1. Ensure Anki Desktop is running on this machine.
   2. Verify that add-on 'Anki-Connect' (code 2055492159) is enabled.
   3. Check that no firewall or antivirus is blocking port 8765.
```

### AnkiWeb Authentication Expired
If session cookies become invalid, the runner automatically re-authenticates using `.env` credentials and updates `.auth/ankiweb-session.json`.
