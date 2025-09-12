"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Skills', href: '/skills' },
  { name: 'Contact', href: '/contact' },
];

const NavigationBase = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`${scrolled ? 'bg-white/95 dark:bg-gray-900/95 shadow-sm' : 'bg-white/90 dark:bg-gray-900/90'}
        fixed top-0 left-0 right-0 z-[1000] backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50`}
      style={{ minHeight: 64 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 sm:h-20 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white font-bold grid place-items-center">
              WO
            </div>
            <div className="hidden md:block">
              <div className="text-lg font-bold">Walter Okumu</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Chief AI Officer</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="desktop-navigation hidden lg:flex items-center gap-1">
            <ul className="flex items-center gap-1" role="menubar">
              {NAV_ITEMS.map((item) => (
                <li key={item.name} role="none">
                  <Link
                    role="menuitem"
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`px-4 py-3 rounded-xl min-h-[44px] font-medium transition-colors whitespace-nowrap
                      ${isActive(item.href)
                        ? 'text-blue-900 dark:text-blue-100 bg-blue-100/80 dark:bg-blue-900/30 border border-blue-300/70 dark:border-blue-700/70'
                        : 'text-gray-900 dark:text-gray-100 hover:text-blue-800 dark:hover:text-blue-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 grid place-items-center"
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            data-mobile-menu
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[1001]">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsMenuOpen(false)} />
          <div
            className="absolute right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-gray-900 border-l border-neutral-200 dark:border-neutral-700 mobile-menu"
            data-mobile-menu-panel
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white font-bold grid place-items-center">
                  WO
                </div>
                <div>
                  <div className="font-semibold">Walter Okumu</div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">Chief AI Officer</div>
                </div>
              </div>
              <button
                className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 grid place-items-center"
                aria-label="Close navigation menu"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="px-6 py-4" aria-label="Mobile navigation">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`block px-4 py-4 rounded-xl min-h-[48px] text-base font-medium transition-colors
                        ${isActive(item.href)
                          ? 'bg-blue-100/80 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 border border-blue-300/70 dark:border-blue-700/70'
                          : 'text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export const Navigation = NavigationBase;
export default NavigationBase;

