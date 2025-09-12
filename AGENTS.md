# Repository Guidelines

## Project Structure & Module Organization
- `src/app`: Next.js App Router (e.g., `page.js`, `layout.js`, API routes).
- `src/components/ui`: Reusable UI components (PascalCase files).
- `src/lib`: Utilities (analytics, env, SEO, sanitization, images).
- `public`: Static assets served at the site root.
- `tests/e2e`: Playwright end-to-end specs (e.g., `*.spec.js`).
- `src/docs` and `/docs`: Design notes, audits, and internal documentation.

## Build, Test, and Development Commands
- `npm run dev` — Start local dev server (Turbopack).
- `npm run build` — Production build (`.next/`).
- `npm start` — Run the built app locally.
- `npm run lint` — Lint with Next + ESLint core-web-vitals.
- `npx playwright install` — Install Playwright browsers (first run).
- `npx playwright test` — Run E2E tests in `tests/e2e`.

## Coding Style & Naming Conventions
- JavaScript (ESNext) + React function components; 2-space indentation.
- Filenames: components in PascalCase (`Button.js`), utilities in camelCase (`utils.js`).
- App Router files follow Next patterns (`page.js`, `layout.js`, `route.js`).
- Styling with Tailwind CSS v4; prefer utility classes over custom CSS.
- Lint/format: `npm run lint`; use Prettier defaults (`npx prettier -w .`) when needed.

## Testing Guidelines
- Framework: Playwright E2E in `tests/e2e/*.spec.js` covering nav, forms, SEO, a11y.
- Start the app via `npm run dev` if your Playwright config does not auto-launch.
- Keep tests deterministic; add `data-testid` attributes where selectors are ambiguous.
- Aim to cover core routes (`/`, `/about`, `/projects`, `/skills`, `/contact`).

## Commit & Pull Request Guidelines
- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.
- Scope small, atomic changes; reference issues (e.g., `Fixes #123`).
- PRs include: clear summary, rationale, screenshots for UI changes, and test notes.
- Ensure `npm run lint` passes before opening PRs.

## Security & Configuration Tips
- Manage secrets via `.env` (see `.env.example`); never commit credentials.
- Use helpers in `src/lib/env.js` and `src/lib/sanitize.js` for configuration and safety.
- Validate external links for `rel="noopener"` and maintain CSP in production.

## Agent-Specific Instructions
- Keep changes minimal and focused; avoid drive-by refactors.
- Preserve file layout and naming conventions; prefer existing utilities in `src/lib`.
- Update docs in `src/docs` when altering architecture or UX.
