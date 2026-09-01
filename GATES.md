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

- [ ] G4: post-deletion render confirms the public education-materials section is absent
  EVIDENCE: skip-reason: master stopped the repeated Edge `Multiple targets are not supported in headless mode` capture loop after the existing successful render; post-deletion screenshot was not retried. Static HTML/reference and filesystem checks are recorded in `evidence/icon-render/verification.md`.

- [x] G5: hero uses the E:UM brand logo and exact owner tagline in a readable layout
  EVIDENCE: Edge headless screenshot `evidence/icon-render/hero-logo.png` (1440x900, 113521 bytes) visually inspected; gold E:UM logo appears at an appropriate size beside the title and the exact tagline is readable below the title.
