# Gates: six 3D app icons

OWNS: index.html, assets/**

Scope: crop six owner-approved source images into canonical 512x512 PNG icons and wire them into eum-lab cards.

- [x] G1: six canonical icon files exist and are exactly 512x512 PNG images
  CHECK: powershell -NoProfile -Command "$p=(Resolve-Path 'D:\\HONG\\09*\\01*\\*\\_*\\icons\\app-icons').Path; Add-Type -AssemblyName System.Drawing; $n=@('school','camp','play','talentroad','photo','card'); foreach($x in $n){$f=Join-Path $p ($x+'.png'); if(!(Test-Path -LiteralPath $f)){exit 1}; $i=[Drawing.Image]::FromFile($f); try{if($i.Width -ne 512 -or $i.Height -ne 512){exit 1}}finally{$i.Dispose()}}; Write-Output 'ICONS_6_512_PASS'"
  EXPECT: ICONS_6_512_PASS
  EVIDENCE: javis-gate-check PASS; six files measured 512x512 PNG; output fingerprint sha256=3f7cfbf5fa267b792f2e27f2e55ba7b6bfe42b1dbc74a5ab7083fc61976e9a94.

- [x] G2: eum-lab contains six copied icon assets and index.html references each asset instead of text badges
  CHECK: powershell -NoProfile -Command "$r=(Resolve-Path 'D:\\HONG\\09*\\02*\\Web\\eum-lab').Path; $h=Get-Content -LiteralPath (Join-Path $r 'index.html') -Raw; $ok=(Test-Path -LiteralPath (Join-Path $r 'assets\\school.png')) -and (Test-Path -LiteralPath (Join-Path $r 'assets\\camp.png')) -and (Test-Path -LiteralPath (Join-Path $r 'assets\\play.png')) -and (Test-Path -LiteralPath (Join-Path $r 'assets\\talentroad.png')) -and (Test-Path -LiteralPath (Join-Path $r 'assets\\photo.png')) -and (Test-Path -LiteralPath (Join-Path $r 'assets\\card.png')) -and $h.Contains('assets/school.png') -and $h.Contains('assets/camp.png') -and $h.Contains('assets/play.png') -and $h.Contains('assets/talentroad.png') -and $h.Contains('assets/photo.png') -and $h.Contains('assets/card.png') -and !$h.Contains('<span class="app-icon">'); if($ok){Write-Output 'WEB_ICON_WIRING_PASS'}else{exit 1}"
  EXPECT: WEB_ICON_WIRING_PASS
  EVIDENCE: javis-gate-check PASS; six assets exist, six image references present, old badge span count 0; output fingerprint sha256=ac6a0af68d28f5be785ca178371d2a7eced8e921cdfb32a153b505b13baac1d1.

- [x] G3: rendered eum-lab screenshot visibly shows all six icon images inside cards without clipping
  EVIDENCE: Edge headless desktop screenshot `evidence/icon-render/desktop.png` (1440x1200, 140651 bytes) visually inspected; all six cards show their icon within the card bounds. A separate 390x844 headless attempt was blocked by Edge `Multiple targets are not supported in headless mode`; mobile screenshot remains unavailable.

- [x] G4: post-deletion render confirms the public education-materials section is absent
  EVIDENCE: 2026-09-04 Edge headless (`--headless=new --dump-dom` + `--screenshot`, 1440x1600) on `index.html`: rendered DOM contains exactly one `<section>` (`aria-labelledby="apps-title"`) and one `<h2>` (`이음 앱`); no `materials/` reference, no `class="materials"` element, and the only remaining `교육자료` string is the invisible `<meta name="description">`. Screenshot `evidence/icon-render/post-deletion.png` (129809 bytes) visually inspected: hero, `이음 앱` heading, six app cards, footer — no education-materials section. Earlier skip-reason (Edge `Multiple targets` loop) superseded by this single-target capture.

- [x] G5: hero uses the E:UM brand logo and exact owner tagline in a readable layout
  EVIDENCE: Edge headless screenshot `evidence/icon-render/hero-logo.png` (1440x900, 113521 bytes) visually inspected; gold E:UM logo appears at an appropriate size beside the title and the exact tagline is readable below the title.

- [x] G6: obsolete hero introduction paragraph is absent while logo, title, and tagline remain
  EVIDENCE: Edge headless screenshot `evidence/icon-render/hero-without-intro.png` (1440x700, 77846 bytes) visually inspected; hero contains only the brand logo, title, and exact tagline, followed by the app section.

- [x] G7: app-section subtitle is absent while the app heading and six cards remain
  EVIDENCE: Edge headless screenshot `evidence/icon-render/apps-without-subtitle.png` (1440x900, 113827 bytes) visually inspected; `이음 앱` heading remains, the subtitle is absent, and all six app cards remain visible.

- [x] G8: owner-approved intro paragraph and curated education-materials section are present, every material link resolves, and no owner contact info is in `materials/` (supersedes G4/G6 — owner approval 2026-09-04 "준비해둔 후보 그대로 진행")
  CHECK: runtime python `pack/round/evidence/eum-lab-publish-20260904/verify_render.py` (Playwright file:// desktop 1280 + mobile 390)
  EXPECT: VERDICT: PASS — h2 == [이음 앱, 교육자료], app cards 6 (hrefs unchanged), material cards 10 in 3 groups, material links 16/16 exist, phone/email hits in materials 0, nested anchors 0, badges/draft banner 0, broken images 0, console errors 0, no horizontal scroll on mobile, app-section subtitle still absent (G7 kept)
  EVIDENCE: 2026-09-04 run → VERDICT: PASS; `render-check.json`, `after-desktop.png` (1280×2517), `after-mobile.png` (390×4302), sub-page screenshots (pre-lecture-guide, camp guide, card example, church template) visually inspected. Build script `build_materials.py` + `materials/manifest.json` (source/output SHA-256, authorship, confidence). Held (not published): 달란트로드 종합보고서.docx — content is a development report, not a form (owner confirmation requested).
