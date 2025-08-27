'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  User,
  Briefcase,
  Code,
  MessageSquare,
  Menu,
  X,
  Sun,
  Moon,
  Globe
} from 'lucide-react';

// Enhanced navigation items with better descriptions
const navigationItems = [
  {
    name: 'Home',
    href: '/',
    description: 'Executive overview and impact metrics',
    icon: Home,
    badge: null
  },
  {
    name: 'About',
    href: '/about',
    description: 'Leadership experience and background',
    icon: User,
    badge: '7 Countries'
  },
  {
    name: 'Projects',
    href: '/projects',
    description: 'Technical portfolio and achievements',
    icon: Briefcase,
    badge: '12 Team Members'
  },
  {
    name: 'Skills',
    href: '/skills',
    description: 'Technical and management expertise',
    icon: Code,
    badge: '40% Growth'
  },
  {
    name: 'Contact',
    href: '/contact',
    description: 'Executive consultation and networking',
    icon: MessageSquare,
    badge: 'Available'
  },
];

/**
 * Modern Executive Navigation Component
 * International-standard design with sophisticated animations
 */
const Navigation = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Enhanced theme and scroll handling
  useEffect(() => {
    setMounted(true);

    // Get stored theme or system preference
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = stored === 'dark' || (!stored && prefersDark);

    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);

    // Enhanced scroll handling for sophisticated navbar
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches);
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  const isActive = (href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-500">
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 dark:bg-gray-900/80 dark:border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl sm:rounded-2xl animate-pulse" />
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 dark:bg-gray-900/95 dark:border-gray-700/50 shadow-lg shadow-black/5'
          : 'bg-white/90 backdrop-blur-xl border-b border-gray-200/30 dark:bg-gray-900/90 dark:border-gray-700/30'
      }`}
      style={{ height: '64px', minHeight: '64px' }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Enhanced Logo */}
          <Link href="/" className="group flex items-center space-x-2 sm:space-x-3 relative z-10 flex-shrink-0">
            <motion.div
              className="relative w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-all duration-300"
              whileHover={{ rotate: 2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              WO
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </motion.div>

            <div className="hidden md:block">
              <motion.div
                className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                Walter Okumu
              </motion.div>
              <motion.div
                className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors duration-300"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                Chief AI Officer & Technology Executive
              </motion.div>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="desktop-navigation">
            <ul className="flex items-center space-x-1" role="menubar" aria-label="Main navigation">
              {navigationItems.map((item, index) => {
                const IconComponent = item.icon;
                const active = isActive(item.href);

                return (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
                    className="relative"
                    role="none"
                  >
                    <Link
                      href={item.href}
                      className={`relative flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 group min-h-[44px] ${
                        active
                          ? 'text-blue-900 dark:text-blue-100 bg-blue-100 dark:bg-blue-900/30 shadow-sm border border-blue-300 dark:border-blue-700'
                          : 'text-gray-900 dark:text-gray-100 hover:text-blue-800 dark:hover:text-blue-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      title={item.description}
                      role="menuitem"
                      aria-current={active ? 'page' : undefined}
                    >
                      <IconComponent className="w-4 h-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">{item.name}</span>

                      {/* Enhanced Badge */}
                      {item.badge && (
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 whitespace-nowrap ${
                          active
                            ? 'bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 group-hover:text-blue-900 dark:group-hover:text-blue-100'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>

                    {/* Enhanced Active Indicator */}
                    {active && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 w-2 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"
                        layoutId="activeIndicator"
                        initial={{ scale: 0, x: '-50%' }}
                        animate={{ scale: 1, x: '-50%' }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Enhanced Desktop Actions */}
          <div className="desktop-navigation flex items-center space-x-4 flex-shrink-0">
            {/* Enhanced Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="relative w-12 h-12 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, type: "spring" }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, type: "spring" }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Enhanced CTA Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/contact"
                className="relative inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="relative z-10 flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Get in Touch
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            className="lg:hidden relative w-12 h-12 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0"
            onClick={() => setIsMenuOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open navigation menu"
            data-mobile-menu="true"
            aria-expanded={isMenuOpen}
          >
            <Menu className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[1001] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Enhanced Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Enhanced Menu Panel */}
            <motion.div
              className="absolute inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl mobile-menu overflow-hidden"
              data-mobile-menu-panel="true"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex h-full flex-col">
                {/* Enhanced Mobile Menu Header */}
                <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                        WO
                      </div>
                      <div>
                        <div className="font-bold text-lg text-gray-900 dark:text-white">Walter Okumu</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Chief AI Officer</div>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setIsMenuOpen(false)}
                      className="w-12 h-12 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Close navigation menu"
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>

                {/* Enhanced Mobile Navigation Items */}
                <div className="flex-1 px-6 py-6 overflow-y-auto">
                  <nav className="space-y-2">
                    {navigationItems.map((item, index) => {
                      const IconComponent = item.icon;
                      const active = isActive(item.href);
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`block px-5 py-4 rounded-xl transition-all duration-300 min-h-[64px] ${
                              active
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 border border-blue-300 dark:border-blue-700 shadow-sm'
                                : 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-950 dark:hover:text-gray-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 min-w-0 flex-1">
                                <IconComponent className="w-6 h-6 flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <div className="font-semibold text-base">{item.name}</div>
                                  <div className="text-sm text-gray-700 dark:text-gray-300 mt-1 truncate">
                                    {item.description}
                                  </div>
                                </div>
                              </div>
                              {item.badge && (
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full flex-shrink-0 ml-2 ${
                                  active
                                    ? 'bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                                }`}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>
                </div>

                {/* Enhanced Mobile Actions */}
                <div className="px-6 py-6 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 flex-shrink-0">
                  <div className="flex items-center space-x-3">
                    <motion.button
                      onClick={toggleTheme}
                      className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 min-h-[48px] flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
                    >
                      <AnimatePresence mode="wait">
                        {isDark ? (
                          <motion.div
                            key="sun"
                            initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                            exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Sun className="w-5 h-5" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="moon"
                            initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                            exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Moon className="w-5 h-5" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <span className="font-medium text-sm hidden xs:inline">Theme</span>
                    </motion.button>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Link
                        href="/contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="inline-flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full min-h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <MessageSquare className="w-5 h-5" />
                        <span className="text-sm">Get in Touch</span>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export { Navigation, navigationItems };
export default Navigation;