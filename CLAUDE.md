# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Walter Okumu Oriaro, a Technical Customer Success Expert & Full-Stack Engineer. The site is built as a static HTML website hosted on GitHub Pages.

## Architecture

- **Static HTML Site**: Pure HTML, CSS, and JavaScript without build tools or frameworks
- **Main Files**:
  - `index.html` - Main portfolio page with complete site content
  - `blog-details.html` - Blog page template
  - `contact-section.txt` - Contact form HTML component
- **Assets Structure**:
  - `assets/css/` - All stylesheets including Bootstrap, FontAwesome, animations
  - `assets/js/` - JavaScript libraries (jQuery, Slick, Lightgallery, etc.)
  - `assets/img/` - Images and media files
- **Documentation**: `docs/` contains resume PDF files

## Development Commands

This project has no build system or package.json. Development is done by:

1. **Local Development**: Open HTML files directly in browser or use a simple HTTP server
2. **Testing**: Manual testing in browser - no automated test suite
3. **Deployment**: Push to `main` branch for GitHub Pages deployment

## Key Technologies

- **Frontend**: Vanilla HTML5, CSS3, JavaScript
- **Libraries**:
  - Bootstrap (CSS framework)
  - jQuery + jQuery UI
  - Slick Carousel
  - Lightgallery
  - FontAwesome icons
  - Animate.css
- **Hosting**: GitHub Pages (static site)

## File Structure Notes

- Contact form HTML is maintained in `contact-section.txt` as a reusable component
- CSS files include both minified and non-minified versions
- Some duplicate files exist in nested directories under `assets/img/`
- The site uses relative paths for all asset references