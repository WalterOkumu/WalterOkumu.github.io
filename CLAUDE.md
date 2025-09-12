# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a Next.js 15 portfolio website using the App Router and Turbopack. The project appears to be in development for a personal portfolio site with documentation files for legal and project planning purposes.

## Common Commands
- `npm run dev` - Start development server with Turbopack (localhost:3000)
- `npm run build` - Build production version with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Architecture
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 (configured via PostCSS)
- **Fonts**: Geist Sans and Geist Mono via next/font
- **Build Tool**: Turbopack (Next.js 15's new bundler)
- **Code Quality**: ESLint with Next.js core web vitals config

## Project Structure
```
src/
├── app/                 # Next.js App Router pages
│   ├── page.js         # Home page
│   ├── layout.js       # Root layout with fonts
│   └── globals.css     # Global styles
└── docs/               # Project documentation and legal files
    ├── PRD_Portfolio.md
    ├── PID_Portfolio.md
    ├── Brand_Guide.md
    ├── Case_Studies.md
    └── legal files (Privacy Policy, Terms, etc.)
```

## Key Configuration
- **Path Aliases**: `@/*` maps to `./src/*` (jsconfig.json)
- **ESLint**: Extends Next.js core web vitals, ignores build directories
- **Turbopack**: Used for both dev and build for faster performance

## Development Notes
- This is a personal portfolio website currently using the default Next.js template
- Contains extensive documentation in `src/docs/` for project planning
- Uses Next.js 15 features including App Router and Turbopack
- Tailwind CSS v4 is configured for styling