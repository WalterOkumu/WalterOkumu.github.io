# Repository Guidelines

## Project Structure & Module Organization
- Root `index.html` is the production landing page; `blog-details.html` handles long-form content. Add new pages alongside them or under `docs/`.
- Author styles in `assets/sass` and commit the compiled output in `assets/css`.
- `assets/js/main.js` contains bespoke behaviour; keep third-party libraries in the same folder for CDN parity.
- Media lives in `assets/img`; optimize size and keep lowercase-hyphenated names.
- CI flows reside in `.github/workflows`; update them when commands or deployment paths shift.

## Build, Test, and Development Commands
- `npx serve .` – quick static preview at `http://localhost:3000`.
- `npx sass assets/sass:assets/css --style=compressed` – regenerate CSS after editing SASS partials.
- `npx htmlhint "**/*.html"` – base HTML lint; fix warnings before committing.

## Coding Style & Naming Conventions
- HTML prefers tab indentation, double-quoted attributes, and grouped meta tags for SEO, social, and analytics blocks.
- Use kebab-case, BEM-leaning classes (e.g., `st-hero__title`) and mirror the structure in SASS.
- JavaScript stays inside the existing IIFE with `"use strict"`; indent functions by two spaces and use single quotes for selectors/events.
- Assets and file names stay lowercase with hyphens; update references across HTML, CSS, and manifests in one commit.

## Testing Guidelines
- Smoke test locally in Chrome, Firefox, and a mobile viewport after layout or script changes.
- Exercise forms, navigation toggles, and animations with DevTools console open; resolve any `main.js` errors before pushing.
- Run `npx htmlhint` after structural HTML edits and record Lighthouse targets (Performance ≥ 90, Accessibility ≥ 90) for significant UI updates.
- Verify the GitHub Pages deploy workflow succeeds on the pull request before merge.

## Commit & Pull Request Guidelines
- Use imperative, scoped commit subjects (`feat: add speaking engagements section`) rather than generic “Updates”.
- Group related source files and generated assets together to keep reviews coherent.
- Pull requests should include a concise summary, manual test notes (browsers/viewports), relevant screenshots or GIFs, and linked issues.
- Request reviewers responsible for the affected area and wait for the deploy workflow to report ✅ before merging.

## Deployment & Configuration Notes
- GitHub Pages deploys automatically from `main`; avoid force pushes to preserve workflow history.
- Coordinate any analytics, verification, or social metadata changes in `index.html` with the SEO owner.
- Refresh `robots.txt` and `sitemap.xml` whenever adding or retiring top-level pages.
