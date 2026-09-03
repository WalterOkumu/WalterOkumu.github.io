# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The personal site of Walter Okumu Oriaro — integration architect and engineering
leader — served at <https://walterokumu.github.io/> by GitHub Pages.

It is **one hand-written HTML file**. There is no framework, no build step, no
package manager, no node_modules. `index.html` contains the markup, all of the
CSS in a single `<style>` block, an inline SVG schematic, and a JSON-LD `Person`
block. The only external request the page makes is to Google Fonts.

This is deliberate. A portfolio that cannot be opened and edited five years from
now is a liability, and a page that loads in one request over a slow connection
is the point.

## Files

| Path | Purpose |
|---|---|
| `index.html` | The entire site. Edit this. |
| `assets/favicon/` | Favicon set and web manifest. The only assets directory. |
| `robots.txt` · `sitemap.xml` | Single-page sitemap. Update `lastmod` when content changes materially. |
| `docs/` | Working notes. Not published content. |
| `.github/workflows/deploy.yml` | Deploys `main` to GitHub Pages on push. |
| `.github/workflows/claude*.yml` | Claude Code review and issue automation. |

## Rules for changes

1. **Keep it one file.** No CSS or JS split out, no bundler, no framework. If a
   change seems to need a build step, it is the wrong change.
2. **Every claim on the page must be true and defensible.** Figures come from
   the CV or from the systems themselves. Do not round up, do not add a metric
   without a source, and do not describe work as shipped when it is designed.
3. **No client or vendor names** for systems in private repositories. Describe
   them by category — "a CRM", "an ERP carrying HR and billing".
4. **Both themes.** Colours are CSS custom properties defined on bare `:root`,
   redefined under `prefers-color-scheme: dark` and under `[data-theme="dark"]`.
   Never define a colour only inside a media query.
5. **WCAG 2.1 AA.** Contrast holds in both themes; keyboard focus stays visible;
   `prefers-reduced-motion` is respected. Check before merging.
6. **Mobile first.** The layout collapses from a two-column drawing-sheet grid
   to a single column at 760px. The SVG scrolls inside its own container rather
   than forcing the body sideways.
7. **JSON-LD stays current.** The `Person` block at the bottom carries job
   title, employer and `knowsAbout`. Update it when the page's substance changes.

## Design

Instrument Serif for display, Public Sans for body, JetBrains Mono for
annotations and data. Deep ochre accent (`--accent`) used sparingly — on
indices, rules, figures and the schematic's hub. Layout is a drawing sheet: a
mono index column in the left margin, hairline rules between bands, no cards.

## Branches

`dev` for work, `main` is what Pages serves. Merge to `main` to deploy.
