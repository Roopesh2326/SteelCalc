# SteelCalc redesign foundation — Design plan

**Status:** Proposal only. No implementation work is authorized until the owner approves this plan.  
**Branch:** `redesign/foundation`

## Product direction

Keep SteelCalc recognizable: dark engineering navy (#06101c), warm amber (#f6b51b), clean sans-serif typography, and a restrained italic serif accent for selected headline words. The redesign should feel like a reliable engineering utility, not a generic SaaS dashboard: high legibility, measured density, clear units, strong result hierarchy, and predictable navigation.

The present source contains many very small text styles and multiple page-specific themes. The primary design correction is not decoration; it is readable type, a consistent shell, and reliable responsive behavior.

## Design tokens

Initial token proposal (values are starting points; confirm contrast and rendering during implementation):

### Color

| Token | Value | Use |
|---|---|---|
| `--sc-navy-950` | `#06101c` | Main page background |
| `--sc-navy-900` | `#0b1929` | Elevated panels / cards |
| `--sc-navy-850` | `#102238` | Inputs, hover surfaces |
| `--sc-navy-800` | `#172b40` | Secondary elevated surface |
| `--sc-amber-500` | `#f6b51b` | Primary accent / actions |
| `--sc-amber-400` | `#ffc83d` | Accent hover / headline accent |
| `--sc-text-primary` | `#f4f8fb` | Main text on dark surfaces |
| `--sc-text-secondary` | `#b3c1ce` | Body/supporting copy |
| `--sc-text-muted` | `#91a5b9` | Metadata, tertiary text (only after contrast validation) |
| `--sc-border` | `rgba(148,163,184,.18)` | Borders and separators |
| `--sc-success` | `#4ade80` | Valid/success feedback |
| `--sc-danger` | `#fb7185` | Errors and destructive actions |

Amber buttons should use a dark foreground. Do not use muted text for essential instructions, form labels, calculator outputs or actionable controls. Verify all text/background pairs against WCAG AA rather than assuming token names guarantee contrast.

### Typography

Use the existing system sans-serif stack (no external font request) and Georgia as the italic serif accent.

| Token | Size | Intended use |
|---|---:|---|
| `--sc-text-xs` | 12px | Uppercase micro-labels only |
| `--sc-text-sm` | 14px | Secondary metadata, helper copy |
| `--sc-text-base` | 16px | All body copy, form labels, controls, navigation |
| `--sc-text-lg` | 18px | Lead/supporting emphasis |
| `--sc-heading-sm` | 22px | Card/section subheads |
| `--sc-heading-md` | 30px | Section headings |
| `--sc-heading-lg` | clamp(36px, 5vw, 56px) | Page/hero headings |

Rules:
- Body text is at least 16px.
- Secondary text is at least 14px.
- Nothing is smaller than 12px; 12px is reserved for uppercase labels and compact nonessential metadata.
- Calculator input values and labels should be 16px minimum.
- Use one h1 per page. Preserve semantic heading order.
- Use italic Georgia only for short accent phrases, not paragraphs or data.

### Spacing

Use a 4px base scale; avoid percentage gaps in grid/flex layouts.

| Token | Value |
|---|---:|
| `--sc-space-1` | 4px |
| `--sc-space-2` | 8px |
| `--sc-space-3` | 12px |
| `--sc-space-4` | 16px |
| `--sc-space-5` | 20px |
| `--sc-space-6` | 24px |
| `--sc-space-8` | 32px |
| `--sc-space-10` | 40px |
| `--sc-space-12` | 48px |
| `--sc-space-16` | 64px |

Use rem or px for grid/flex gaps. No percentage-valued `gap` or `column-gap`.

### Radii, borders and elevation

- `--sc-radius-sm`: 6px (inputs, small controls)
- `--sc-radius-md`: 10px (cards, panels)
- `--sc-radius-lg`: 16px (hero panels, major surfaces)
- `--sc-radius-pill`: 999px (chips only)
- Borders: 1px solid `--sc-border`
- Elevation: subtle, layered navy shadows; avoid glow-heavy or decorative shadow treatments.
- Focus ring: 2px solid `--sc-amber-400`, 3px offset.
- Interactive hit targets: minimum 44×44px on touch layouts.

## Shared component architecture

Build one global stylesheet and shared page shell. Avoid parallel theme systems or stacked override blocks.

1. **Global stylesheet** — CSS custom properties, reset, typography, color roles, focus states, button/input primitives, responsive containers, motion preferences. Imported once through `Layout.astro`.
2. **Header** — brand mark, responsive primary navigation, current-page state, one consistent CTA, mobile navigation affordance. No decorative/inert controls. Search only if it remains functional and consistent.
3. **Footer** — one canonical set of link groups, descriptive copy and copyright line; responsive columns.
4. **PageContainer** — shared max-width and horizontal gutters.
5. **PageHero** — eyebrow, one h1, short description and optional right-side stat/chip.
6. **SectionHeading** — consistent heading, supporting copy and optional action.
7. **ToolCard / ToolGrid** — shared card anatomy, clear title/description/action, predictable responsive grid.
8. **ToolLauncher** — search, categories/recent tools and cards using the global primitives.
9. **CalculatorShell** — preserve all existing calculation logic, DOM hooks, IDs, data attributes and script selectors. Restyle only through existing or additive presentation classes.
10. **CalculatorFormField** — consistent label, input, unit suffix, hint and validation message.
11. **ResultPanel** — high-contrast primary result, secondary values, detail rows and action controls.
12. **FAQ / RelatedTools / Callout** — consistent content blocks.
13. **WorkbenchTable / SummaryCard** — desktop table with contained horizontal scrolling where necessary; mobile-friendly editing and 44px action hit areas.
14. **NotFoundContent** — shared page shell and clear routes back into the product.

## Page-by-page order of work

Work only after approval, in small reviewable commits.

### Phase 1 — Foundation

- Add global tokens and base stylesheet.
- Consolidate and remove stacked local override blocks as each component migrates.
- Create shared Header and Footer components.
- Wire shared shell into all page families without changing calculator script hooks.
- Preserve SEO in `src/layouts/Layout.astro`, JSON-LD, sitemap, robots, headers, OG image and favicon assets.
- Preserve `astro.config.mjs` trailing-slash behavior; do not modify it.

### Phase 2 — Home page

- Rework hero, benefits strip, launcher, calculator catalogue, how-it-works and project banners.
- Remove remote image hotlinks; use local SVG/CSS/available public assets only. Do not add third-party scripts or dependencies.
- Improve navigation and tool discovery at mobile widths.

### Phase 3 — Calculator pages

- Restyle `CalculatorShell.astro` header/hero, form fields, result panel, validation, FAQ and related tools.
- Keep every existing ID, data attribute, class name queried by scripts, and all formulas/calculation logic.
- Recheck all four known-good calculation cases after this phase:
  - Round bar: 16mm × 12m × 10 pcs, density 7850 → 189.4kg.
  - TMT rebar: 16mm × 12m × 10 pcs → 189.4kg.
  - Concrete slab: 5m × 4m × 0.15m → 3.00m³ wet and 4.62m³ dry.
  - Flooring: 5m × 4m, 600×600mm tiles, 10% wastage → 62 tiles.

### Phase 4 — Remaining product pages

- Calculator directory.
- Guides index and guide article layouts.
- Tools index and unit converter.
- Workbench, including responsive table, summary, save/load, CSV and print behavior.
- 404 page.
- Verify shared header/footer parity across all routes.

### Phase 5 — Final QA

- Test 1440, 1024, 768 and 390px.
- Confirm no document-level horizontal scroll, clipped content or overlapping controls.
- Verify 44×44px touch targets, keyboard navigation, visible focus, semantic headings, input labels, reduced-motion behavior and WCAG AA contrast.
- Run `npm run build`.
- Verify every path in `.github/workflows/build.yml` exists in `dist/`.
- Capture after-phase screenshots in `docs/screenshots/after-phaseN/`.
- Re-run the known-good calculator cases and compare exact displayed results.

## Guardrails and review gates

- Never commit to `main`; never force-push.
- Do not alter formulas, calculation logic, IDs, data attributes or script-query class names.
- Keep `astro.config.mjs` trailingSlash setting unchanged.
- No external images, image hotlinks, font URLs or third-party scripts.
- No new runtime dependencies beyond Astro.
- No percentage values for flex/grid gaps.
- One page/component per small commit; build, route smoke test and screenshot review after each phase.
- Ask before making any change outside this approved plan.
- **No Phase 1 implementation begins until the user explicitly approves this plan.**

## Owner-approved additions (2026-11-16)

These are required deliverables, not optional polish:

1. **Mobile navigation on every page.** At both 768px and 390px, navigation must remain available through a consistent, accessible mobile menu. Do not simply hide the desktop navigation without a replacement. The menu must have a 44×44px minimum trigger, an accessible name, keyboard operation, visible focus, correct expanded state, Escape/selection dismissal, and no horizontal overflow. Verify it on every page family, including the 404 and calculator routes.
2. **Workbench theme reconciliation.** Treat the workbench's mixed light/dark panels as a dedicated fix, not an incidental side effect of global tokens. Establish one coherent dark-surface hierarchy (or a deliberately documented contrasting result panel) for header, workspace, cards, table, inputs, summary, dialogs/overlays and print view. Ensure labels, values, borders and states remain legible; print styling may remain light but must be explicitly scoped to print.
3. **Real-browser contrast checks after every phase.** Use an actual browser after each phase to inspect rendered foreground/background pairs and calculate WCAG contrast ratios. Record the tested selector/text, foreground, background, ratio, required threshold, viewport and pass/fail in `docs/QA/contrast-phaseN.md` (or an equivalent per-phase report). Check normal text at 4.5:1 and large text/UI components as applicable; do not infer contrast compliance from token names or source declarations alone. Run these checks alongside build, route smoke tests and after-phase screenshots.

### Updated phase gates

- **Phase 1:** Global tokens + shared Header/Footer must include the mobile menu and be verified at 768px and 390px on representative routes; check focus, keyboard and expanded/collapsed states.
- **Phase 2:** Home page contrast report and screenshots at the phase's required viewports.
- **Phase 3:** Calculator-shell contrast report, mobile menu parity and known-good calculator results.
- **Phase 4:** Dedicated workbench theme reconciliation, then remaining pages; verify menu and contrast on every route family.
- **Phase 5:** Final all-route contrast report and QA matrix at 1440, 1024, 768 and 390px.

No phase is complete until its browser contrast report, build, route smoke test and screenshots are recorded.
