'use client';

import { Navigation } from './Navigation';

/**
 * Modern Portfolio Layout Component
 * Clean, responsive design with working navigation and footer
 */
const Layout = ({
  children,
  className = '',
  showNavigation = true,
  showFooter = true,
  padding = true,
}) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Skip to content link - Accessibility */}
      <a
        href="#main"
        className="skip-link"
        tabIndex="-1"
      >
        Skip to main content
      </a>

      {/* Header with Navigation */}
      {showNavigation && (
        <header role="banner" className="w-full">
          <Navigation />
        </header>
      )}

      {/* Main Content */}
      <main
        id="main"
        className={`flex-1 w-full ${className}`}
        role="main"
      >
        {padding ? (
          <div className="container">
            {children}
          </div>
        ) : (
          children
        )}
      </main>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
};

/**
 * Modern Footer Component
 * Professional presentation with working links and proper structure
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Professional links with proper accessibility
  const footerLinks = {
    professional: [
      {
        name: 'LinkedIn',
        href: 'https://linkedin.com/in/walter-okumu',
        external: true,
        description: 'Professional profile and network'
      },
      {
        name: 'GitHub',
        href: 'https://github.com/walterokumu',
        external: true,
        description: 'Technical projects and contributions'
      },
    ],
    portfolio: [
      { name: 'About', href: '/about', description: 'Executive background and experience' },
      { name: 'Projects', href: '/projects', description: 'Technical portfolio and achievements' },
      { name: 'Skills', href: '/skills', description: 'Technical and leadership competencies' },
      { name: 'Contact', href: '/contact', description: 'Professional consultation inquiries' },
    ],
    content: [
      { name: 'Blog', href: '/blog', description: 'Industry insights and thought leadership' },
      { name: 'Speaking', href: '/speaking', description: 'Conference talks and presentations' },
    ],
    legal: [
      { name: 'Privacy', href: '/privacy', description: 'Privacy policy and data handling' },
      { name: 'Terms', href: '/terms', description: 'Terms of service and usage' },
    ],
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Executive Brand Section */}
          <div className="space-y-4">
            <div className="footer-brand">
              <div className="footer-logo">
                WO
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  Walter Okumu Oriaro
                </h3>
                <p className="text-neutral-300 text-sm">
                  Head of Customer Success & Technical Architecture
                </p>
              </div>
            </div>

            <p className="text-neutral-300 max-w-md">
              Technology executive leading customer success operations and technical architecture across multiple countries.
              Managing 12-person global teams while delivering measurable business outcomes
              and technical excellence.
            </p>

            {/* Professional Links */}
            <div className="flex gap-3 pt-4">
              {footerLinks.professional.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="w-10 h-10 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-200"
                  {...(link.external && {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    'aria-label': `${link.name}: ${link.description} (opens in new tab)`,
                  })}
                >
                  <span className="sr-only">{link.name}: {link.description}</span>
                  <SocialIcon name={link.name} />
                </a>
              ))}
            </div>
          </div>

          {/* Portfolio Navigation */}
          <div>
            <h4 className="footer-section">
              Portfolio
            </h4>
            <div aria-label="Portfolio navigation">
              <ul className="footer-links">
                {footerLinks.portfolio.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-neutral-400 hover:text-white transition-colors duration-200"
                      aria-label={`${link.name}: ${link.description}`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Content Links */}
          <div>
            <h4 className="footer-section">
              Content
            </h4>
            <div aria-label="Content navigation">
              <ul className="footer-links">
                {footerLinks.content.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-neutral-400 hover:text-white transition-colors duration-200"
                      aria-label={`${link.name}: ${link.description}`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="footer-section">
              Legal
            </h4>
            <div aria-label="Legal navigation">
              <ul className="footer-links">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-neutral-400 hover:text-white transition-colors duration-200"
                      aria-label={`${link.name}: ${link.description}`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="text-neutral-400 text-sm">
            <p>&copy; {currentYear} Walter Okumu Oriaro. All rights reserved.</p>
            <p className="mt-1">
              Head of Customer Success & Technical Architecture | Nairobi, Kenya | Available for global opportunities
            </p>
          </div>

          <div className="flex items-center gap-4 text-neutral-500 text-sm">
            <span>Built with Next.js 15</span>
            <span className="w-1 h-1 bg-current rounded-full" />
            <span>Modern Design System</span>
            <span className="w-1 h-1 bg-current rounded-full" />
            <span>Dark/Light Mode</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 * Social Icon Component
 * Optimized for accessibility and professional presentation
 */
const SocialIcon = ({ name }) => {
  const iconClass = "w-5 h-5";

  switch (name) {
    case 'LinkedIn':
      return (
        <svg
          className={iconClass}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="img"
        >
          <desc>LinkedIn professional profile</desc>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    case 'GitHub':
      return (
        <svg
          className={iconClass}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="img"
        >
          <desc>GitHub technical projects and contributions</desc>
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      );
    default:
      return null;
  }
};

export { Layout, Footer };
export default Layout;
