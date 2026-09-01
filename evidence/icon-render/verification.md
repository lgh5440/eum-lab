# Eum-lab 3D icon verification

Date: 2026-09-01

## Canonical and web asset measurements

All six canonical files and their `eum-lab/assets/` copies measured 512x512 RGBA PNG. SHA-256 equality was verified for each canonical/web pair.

| icon | canonical/web | SHA-256 |
|---|---|---|
| school | 512x512 / 512x512, identical | 794159b53cdcae35d2f885e9d5f7d8cc4fecd69b0827a7ba70f4dab20cf81f83 |
| camp | 512x512 / 512x512, identical | 01e19ecdc6e9f9dc6c68d14a3bce89687e6ff275a94ed05007d394e17ea28a05 |
| play | 512x512 / 512x512, identical | c45377c6e2d464a447531a25df68614b3e6f2bfe74ff6cf6b5ed4ea31ed17b2e |
| talentroad | 512x512 / 512x512, identical | 5c965b4432490e798a6d5ad85059aa9e04234f1a36c47ccaea2fbd05cd9563b9 |
| photo | 512x512 / 512x512, identical | 1959c0421908973226b68d14a3bce30be497f93eab18d90117036213e952cf01a1 |
| card | 512x512 / 512x512, identical | 4e068e4bbbe9101f7862057acc9cfdf7530a9cabd70c18cb6268dcfbf128553e |

## HTML and render checks

- `index.html`: six `.app-icon` image elements reference the six `assets/*.png` files.
- Legacy text badge elements: 0.
- Desktop render: `icon-render/desktop.png`, Edge headless, 1440x1200; visually inspected and all six icons appear inside their cards without clipping.
- Mobile render: a 390x844 Edge headless attempt returned `Multiple targets are not supported in headless mode`; no mobile screenshot is claimed.

## Public education-materials removal

- Before deletion, `eum-lab/materials/` contained 30 files across the four requested categories.
- All 30 files were removed with `git rm -r -- materials`; no source or staging path was targeted.
- `index.html` no longer contains the public education-materials section or `materials/` references.
- `D:/HONG/01_AI_신학_교육` and `D:/HONG/09_이음/01_부서/경영조정실/_공개자료` were confirmed to remain present.
- Post-deletion render: `skip-reason` — master stopped further headless capture retries after the repeated Edge `Multiple targets are not supported in headless mode` error. No new render claim is made.
