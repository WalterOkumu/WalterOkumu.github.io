'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Experience', href: '#experience' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-extrabold text-primary-500">
                Okumu
              </span>
            </Link>
          </div>

          {/* Center Navigation (visible on xl and larger for generous spacing) */}
          <div className="hidden xl:flex flex-1 justify-center items-center">
            <div className="flex items-center gap-x-12 whitespace-nowrap">
              {navigation.map((item) => {
                const isExternal = item.href.startsWith('#');
                return isExternal ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="inline-flex items-center text-gray-900 hover:text-primary-600 px-2 py-2 text-base font-medium tracking-wide transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="inline-flex items-center text-gray-900 hover:text-primary-600 px-2 py-2 text-base font-medium tracking-wide transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTA Button (visible on xl and larger) */}
          <div className="hidden xl:block">
            <a
              href="#contact"
              className="btn-primary text-sm"
            >
              Let's Connect
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden ml-auto">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-3 rounded-md text-gray-800 hover:text-primary-600 hover:bg-accent-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-label={isMenuOpen ? 'Close main menu' : 'Open main menu'}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navigation.map((item) => {
                const isExternal = item.href.startsWith('#');
                return isExternal ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-800 hover:text-primary-600 block px-4 py-3 text-base font-semibold transition-colors duration-200 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-800 hover:text-primary-600 block px-4 py-3 text-base font-semibold transition-colors duration-200 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <a
                  href="#contact"
                  className="btn-primary w-full text-center text-sm py-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Let's Connect
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
