# SteelCalc redesign foundation — Phase 0 audit

**Branch:** `redesign/foundation`  
**Baseline:** `main` at `e090e1f9994e6db6a3f9b4f620e42d71ddb423cd`  
**Audit mode:** GitHub source inspection only. No source files changed.

## Important verification limitation

This audit is **not a completed visual/browser audit**. The connected environment can inspect repository text and create Git branches/commits, but it cannot clone the repository into a runnable workspace, install npm dependencies, launch Astro, or run Playwright/headless Chromium. Therefore no honest full-page screenshots, viewport measurements, runtime overflow checks, rendered contrast measurements, or tap-target measurements could be produced here. The screenshot files requested for Phase 0 have **not** been captured. See [screenshots/before/README.md](screenshots/before/README.md). Do not treat the items below as visual QA sign-off.

## 1. Typography: source-confirmed values below 14px

The codebase contains extensive sub-14px text styling. The list below records high-impact source locations and representative declarations; declarations in compressed one-line styles may contain additional selectors on the same line. All line numbers refer to the baseline commit above.

### `src/components/Welcome.astro`

- L269: brand micro-label 6.5px.
- L275: navigation 10px.
- L280: search input 8px.
- L286: primary navigation CTA 9px.
- L290: eyebrow 7px.
- L293: hero body copy 11px.
- L295: hero action labels 8px.
- L306: hero image label 6px.
- L308: specification caption 7px.
- L313: benefit icon 12px.
- L315: benefit title 8.5px; supporting text 7px.
- L321–322: section description 9px; link 8px.
- L328–329: tool-card title 11px; description 7.8px.
- L331: tool number 7px and tag 5.5px.
- L347: card action label 6.5px (same compressed declaration).
- L353–360: how-it-works copy, footer description, footer labels and legal line use 6.5–9px.
- L378–382: mobile CTA and other compact text remain below 14px.
- L396–403: dark-theme override block changes colors/backgrounds but leaves most of the small type scale intact.

### `src/components/CalculatorShell.astro`

- L1137–1166: skip link, breadcrumbs, eyebrow, form kicker, session bar, labels, result details and footer/FAQ styles include values from 7px through 13px.
- L1162: field labels 9px.
- L1165: footer typography includes compact text.
- L1175–1185 and L1204: print styles use small type; these are print-specific but still part of the source audit.
- The component has three separate `<style>` blocks (confirmed by source scan); inspect their cascade together before changing any rule.

### `src/components/GuideLayout.astro`

- L42–47: brand micro-label 6px; nav 10px; CTA 9px; breadcrumbs 8px; eyebrow 7px; guide intro 11px; hero chip 7–11px; article paragraphs/list items 10px; table cells 9px; callout 10px; link 9px; footer copy/links 7–8px.

### `src/components/ToolLauncher.astro`

- L208–241: launcher description 9.5px; shortcut 8px; search input 10px; recent label 6px; recent rows 8–9px; card tag 5.5px; card title 10px; card description 7.3px; footer 8px.

### `src/layouts/Layout.astro`

- L104 sets several global body-copy selectors to 13px with `!important`.
- L106 sets tags, crumbs and eyebrow labels to 10px with `!important`.
- L107 sets nav/CTA text to 12px with `!important`.
- L109 sets inputs to 16px.
- L73–123 is a global style block that changes the appearance of nested page components.

### `src/pages/calculators/index.astro`

- L357: brand micro-label 6.5px.
- L363: nav 10px.
- L368: search input 8px.
- L374: CTA 9px.
- L377: breadcrumbs 8px.
- L383: eyebrow 7px.
- L386: directory intro 11px.
- L390–391: hero panel label 10px and caption 7px.
- L396: search input 9px.
- L399–410: stats, tool numbers and tags 5.5–8px.
- L436–437: card title 11px and body 7.8px.
- L439–446: card action, section description and related copy 6.5–9px.
- L481–495: guide steps, note, footer copy and labels 6.5–10px.
- L515–519: mobile CTA and supporting text remain below 14px.

### `src/pages/guides/index.astro`

- L39–40: header/nav/eyebrow styles are compressed into one-line CSS; the eyebrow is 7px and navigation uses 10px (inspect full declaration on those lines).

### `src/pages/tools/unit-converter.astro`

- L136–138: compressed CSS includes 9px breadcrumb and compact field styles; inspect the complete declarations on these lines.

### `src/pages/workbench.astro`

- L449–455: compressed page styles include 7–9px breadcrumbs, eyebrow, field labels, buttons and notes.
- L469–485: print sheet contains 7–11px metadata/table/summary/footnote text.

### `src/pages/calculators/bbs.astro`

- L268–274: compressed CSS includes 7–9px eyebrow, breadcrumbs, notes and labels.

### `src/pages/404.astro`

- L27–29: brand and eyebrow styles are 9px; primary heading is appropriately large.

### Inherited calculator routes

The following route files are thin wrappers around `CalculatorShell.astro`, so their visible typography is largely inherited from that component: `brick-block.astro`, `concrete.astro`, `earthwork.astro`, `flooring.astro`, `plaster.astro`, `steel-cost.astro`, `steel-pipe.astro`, `steel-plate.astro`, `steel-weight.astro`, `tmt-rebar.astro`, and `structural-steel.astro`. Their wrapper files contain no independent font-size declarations in the inspected source.

**Conclusion:** the current system materially violates the proposed minimums (16px body, 14px secondary, 12px absolute minimum except uppercase labels). The violations are not isolated to metadata; several body paragraphs, calculator controls, navigation items and card descriptions are below 12px.

## 2. `!important` and stylesheet cascade

### Confirmed `!important` usage

- `src/components/Welcome.astro` L396, L398, L400–403: the later dark-theme style block overrides the earlier light-theme rules. It forces hero button colors, benefits strip, tool cards, banners, footer colors and borders.
- `src/components/CalculatorShell.astro` L1175–1185 and L1204: print stylesheet uses `!important` to hide screen UI and restyle the print result. This is a legitimate print-cascade use, but should be isolated and documented.
- `src/layouts/Layout.astro` L76, L78–81, L84–85, L93–95, L99, L102, L104–107, L110–117, L122: global dark-theme overrides use `!important` across body, headers, cards, typography, controls, CTA and reduced-motion declarations.
- `src/pages/workbench.astro` L463–467: print-specific visibility/layout declarations use `!important`.

### Stacked and cross-component overrides

- `Welcome.astro` has two `<style>` blocks. The second begins at L389 and restyles the first block's light surface into a dark navy presentation; many declarations use `!important`.
- `CalculatorShell.astro` has three `<style>` blocks. The final block beginning around L1193 adds another hero treatment after the main component styles; print overrides are also present near the end. These blocks must be consolidated deliberately, not blindly concatenated.
- `Layout.astro` has a global style block at L73–123. It applies broad selectors to descendants of pages using the layout and relies on `!important` to beat component-local declarations. This makes page appearance dependent on selector specificity and component nesting.
- `workbench.astro` has page-local styles plus a print block; it also inherits the global `Layout.astro` overrides.
- `GuideLayout.astro` and page-local styles in guides/tools/calculator directory coexist with the global `Layout.astro` theme layer.

## 3. Duplicated navigation, header and footer markup

The same SteelCalc brand mark and navigation concept is independently authored in multiple places:

- `src/components/Welcome.astro` L117–144 (header) and L246 onward (footer).
- `src/pages/calculators/index.astro` L120–144 (header) and L270 onward (footer).
- `src/components/CalculatorShell.astro` L177 (header) and L446 (footer).
- `src/components/GuideLayout.astro` L8–19 (header) and L30–34 (footer).
- `src/pages/guides/index.astro` L13 (header); no footer tag found in this file.
- `src/pages/tools/index.astro` L6 (header).
- `src/pages/tools/unit-converter.astro` L9–20 (header).
- `src/pages/workbench.astro` L9–20 (header).
- `src/pages/calculators/bbs.astro` L9 (header).
- `src/pages/404.astro` contains a separate brand/header treatment.

The navigation differs by route (different link sets, labels, CTAs, search controls and active-state behavior). Footer structures also differ. The shared Header/Footer work should define one consistent navigation model and active-route behavior, then migrate each page family without changing calculator hooks.

## 4. Contrast and color risks (source-level only)

- The site intentionally uses dark navy surfaces (#06101c and #0b1929), amber (#f6b51b) and pale text. These are the intended brand colors.
- `Welcome.astro` L390–403 and `Layout.astro` L73–123 both implement dark themes, but by different mechanisms. Broad global color overrides can mask local component colors, making contrast hard to reason about.
- `Welcome.astro` L403 sets footer secondary copy to #7e93a8 on a dark footer; verify WCAG AA at actual rendered font sizes.
- `Layout.astro` L84 uses #71869a for breadcrumb text on navy; this is a likely contrast risk, especially at small sizes.
- `ToolLauncher.astro` L222 and L233 uses very muted #a0a8ae tags in its base styling; the inherited dark theme may override some but not all.
- The reported light-on-light heading issue near “How it works” on `/calculators/` cannot be confirmed or rejected from the source text alone. Inspect the actual rendered page at all target widths. The section heading is authored at `src/pages/calculators/index.astro` L208–215 and its styling is around L444–446 / L481–482.
- No contrast ratio is claimed in this source-only audit. A browser-based WCAG contrast check is required after rendering.

## 5. Responsive layout, overflow and wrapping

**Not visually measured.** No Playwright screenshots or browser layout metrics were available in this environment. Source-level risks worth prioritizing in the requested 1440/768/390px pass:

- `Welcome.astro` L349: `.how-section` uses `gap:8%`; this is a percentage flex/grid gap and directly conflicts with the redesign constraint. Replace with fixed rem/px tokens during the approved redesign phase.
- `Welcome.astro` L404: mobile rules hide nav/search/tools, but no replacement menu is visible in the inspected markup. Confirm navigation remains usable at 390px.
- `Welcome.astro` L404: hero and card grid switch at 820/540px; verify card text and buttons wrap without clipping at 390px.
- `src/pages/workbench.astro` L452: `.project-head` declares seven grid columns with fixed-width columns mixed into fractional columns; it only collapses under max-width:900px. Test at 1024, 768 and 390px.
- `workbench.astro` L453: item table has `min-width:980px` inside an overflow container. This is deliberate internal table scrolling, but check it does not create document-level horizontal scroll.
- `CalculatorShell.astro` L1169: mobile breakpoint at 540px; test form/result stacking and button wrapping at 390px.
- `GuideLayout.astro` L48: tables are set to block/overflow-x:auto under 760px; verify only the table scrolls, not the page.
- `src/pages/calculators/bbs.astro` L273–274: summary and FAQ use multi-column grids; inspect their mobile breakpoints and content wrapping.
- `src/pages/calculators/index.astro` L515–519 and `Welcome.astro` L404: multiple responsive breakpoints are independently maintained and can drift.

No claim is made that any specific page definitely overflows or overlaps; that requires browser measurements.

## 6. Mobile tap targets

**Not measured.** Source-level concerns:
- `Welcome.astro` L275, L286 and L295: navigation, CTA and action labels use small text and compact padding; actual rendered boxes must be measured against 44×44 CSS px.
- `ToolLauncher.astro` L216: search clear button has only 2px 4px padding; likely undersized unless its parent provides sufficient hit area.
- `CalculatorShell.astro` L1137 and L1162: skip link and labels need review, and all form controls/action buttons should be measured.
- `workbench.astro` L453: remove buttons are explicitly 26×26px; this is below the 44×44px target. Increase the hit area without changing the visible icon or script selectors.
- `Welcome.astro` L404 hides the desktop nav on mobile; confirm the replacement route access.

## 7. External image/font URLs

- External image URLs are present despite the stated no-external-images requirement:
  - `src/components/Welcome.astro` L12, L21, L30, L39, L48, L57, L66, L75, L84, L93, L102, L111: 12 remote image URLs in the tool catalogue.
  - `Welcome.astro` L395 and L397: two additional Unsplash background-image URLs.
- No external font stylesheet or font-file URL was found in the inspected Astro/CSS source. The CSS names Inter first but falls back to system fonts; there is no visible @import or Google Fonts URL in the inspected files.
- `https://schema.org` values in `Layout.astro` and calculator structured data are JSON-LD vocabulary identifiers, not image/font hotlinks.

## 8. Repository and build configuration observations

- `package.json` declares Astro `^7.3.4`, Node `>=22.12.0`, and no application dependencies besides Astro.
- `astro.config.mjs` currently sets only `site`; it does not explicitly set `trailingSlash: 'ignore'`. This audit does not change it. Confirm the intended deployed behavior before any configuration edit; the redesign instructions explicitly prohibit changing this setting.
- `.github/workflows/build.yml` uses Node 22 and `npm ci`, runs `npm run build`, then checks generated route files including calculators, guides, tools, workbench, 404, robots and sitemap.
- No source files, formulas, calculator IDs or data attributes were changed during this audit.

## 9. Required browser pass still outstanding

Capture full-page screenshots for each route at 1440px, 768px and 390px:

`/`, `/calculators/`, `/calculators/steel-weight/`, `/calculators/concrete/`, `/calculators/bbs/`, `/guides/`, `/workbench/`, `/tools/unit-converter/`, and a nonexistent URL (404).

Save as `docs/screenshots/before/<page>-<width>.png` (27 screenshots total). Then record actual horizontal overflow, overlapping/wrapping defects, contrast, and 44×44px hit-target measurements. Until those checks are run, Phase 0 remains partially complete and visual claims remain unverified.
