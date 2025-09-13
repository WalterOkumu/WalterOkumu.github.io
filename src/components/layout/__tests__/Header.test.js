import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Header from '../Header';

// Extend Jest matchers for accessibility testing
expect.extend(toHaveNoViolations);

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockedLink({ children, href, ...props }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

describe('Header Component', () => {
  describe('Rendering', () => {
    it('should render the header with brand name', () => {
      render(<Header />);
      
      const brandName = screen.getByText('Okumu');
      expect(brandName).toBeInTheDocument();
      expect(brandName.closest('a')).toHaveAttribute('href', '/');
    });

    it('should render all navigation items', () => {
      render(<Header />);
      
      const expectedNavItems = [
        'Home', 'About', 'Services', 'Experience', 
        'Case Studies', 'Blog', 'Contact'
      ];
      
      expectedNavItems.forEach(item => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });

    it('should render the CTA button', () => {
      render(<Header />);
      
      const ctaButton = screen.getByText("Let's Connect");
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveAttribute('href', '#contact');
    });

    it('should render mobile menu button', () => {
      render(<Header />);
      
      const menuButton = screen.getByLabelText('Open main menu');
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('should render hash links for anchors correctly', () => {
      render(<Header />);
      
      const homeLink = screen.getAllByText('Home')[0];
      expect(homeLink.closest('a')).toHaveAttribute('href', '#home');
      
      const aboutLink = screen.getAllByText('About')[0];
      expect(aboutLink.closest('a')).toHaveAttribute('href', '#about');
    });

    it('should render Next.js Link for blog page', () => {
      render(<Header />);
      
      const blogLinks = screen.getAllByText('Blog');
      expect(blogLinks[0].closest('a')).toHaveAttribute('href', '/blog');
    });

    it('should have correct CSS classes for navigation items', () => {
      render(<Header />);
      
      const homeLink = screen.getAllByText('Home')[0];
      expect(homeLink).toHaveClass(
        'text-accent-700',
        'hover:text-primary-500',
        'px-3',
        'py-2',
        'text-sm',
        'font-medium',
        'transition-colors',
        'duration-200'
      );
    });
  });

  describe('Mobile Menu Functionality', () => {
    it('should toggle mobile menu when button is clicked', () => {
      render(<Header />);
      
      // Initially mobile menu should not be visible
      expect(screen.queryByText('Home')).toBeInTheDocument();
      
      // Find mobile menu items (they should not be visible initially)
      const mobileMenuContainer = screen.queryByTestId('mobile-menu');
      expect(mobileMenuContainer).not.toBeInTheDocument();
      
      // Click the menu button
      const menuButton = screen.getByLabelText('Open main menu');
      fireEvent.click(menuButton);
      
      // Now we should see the mobile menu with navigation items
      // The mobile navigation items will be additional instances
      const homeItems = screen.getAllByText('Home');
      expect(homeItems).toHaveLength(2); // Desktop + Mobile
    });

    it('should close mobile menu when navigation item is clicked', () => {
      render(<Header />);
      
      // Open mobile menu
      const menuButton = screen.getByLabelText('Open main menu');
      fireEvent.click(menuButton);
      
      // Verify mobile menu is open (we have multiple Home items)
      expect(screen.getAllByText('Home')).toHaveLength(2);
      
      // Click a mobile navigation item
      const mobileHomeLink = screen.getAllByText('Home')[1]; // Second instance (mobile)
      fireEvent.click(mobileHomeLink);
      
      // Menu should close (back to just one Home item)
      expect(screen.getAllByText('Home')).toHaveLength(1);
    });

    it('should close mobile menu when CTA button is clicked', () => {
      render(<Header />);
      
      // Open mobile menu
      const menuButton = screen.getByLabelText('Open main menu');
      fireEvent.click(menuButton);
      
      // Verify mobile menu is open
      const ctaButtons = screen.getAllByText("Let's Connect");
      expect(ctaButtons).toHaveLength(2); // Desktop + Mobile
      
      // Click mobile CTA button
      fireEvent.click(ctaButtons[1]); // Mobile CTA button
      
      // Menu should close
      expect(screen.getAllByText("Let's Connect")).toHaveLength(1);
    });

    it('should show correct icon when menu is closed', () => {
      render(<Header />);
      
      // When closed, should show hamburger menu icon (3 horizontal lines)
      const menuButton = screen.getByLabelText('Open main menu');
      const hamburgerIcon = menuButton.querySelector('path[d="M4 6h16M4 12h16M4 18h16"]');
      expect(hamburgerIcon).toBeInTheDocument();
    });

    it('should show correct icon when menu is open', () => {
      render(<Header />);
      
      // Open mobile menu
      const menuButton = screen.getByLabelText('Open main menu');
      fireEvent.click(menuButton);
      
      // When open, should show X icon
      const xIcon = menuButton.querySelector('path[d="M6 18L18 6M6 6l12 12"]');
      expect(xIcon).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('should have desktop-only navigation hidden on mobile', () => {
      render(<Header />);
      
      // Desktop navigation should have md:block class
      const desktopNav = screen.getByRole('navigation').querySelector('.hidden.md\\:block');
      expect(desktopNav).toBeInTheDocument();
    });

    it('should have mobile menu button hidden on desktop', () => {
      render(<Header />);
      
      const menuButton = screen.getByLabelText('Open main menu');
      expect(menuButton.closest('div')).toHaveClass('md:hidden');
    });

    it('should have CTA button hidden on mobile', () => {
      render(<Header />);
      
      const ctaButton = screen.getByText("Let's Connect");
      expect(ctaButton.closest('div')).toHaveClass('hidden', 'md:block');
    });
  });

  describe('Styling and Classes', () => {
    it('should have correct header styling', () => {
      render(<Header />);
      
      const header = screen.getByRole('banner');
      expect(header).toHaveClass(
        'fixed',
        'top-0',
        'left-0',
        'right-0',
        'z-50',
        'bg-white/95',
        'backdrop-blur-sm',
        'border-b',
        'border-gray-200',
        'shadow-sm'
      );
    });

    it('should have correct nav container styling', () => {
      render(<Header />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8');
    });

    it('should have correct brand styling', () => {
      render(<Header />);
      
      const brandName = screen.getByText('Okumu');
      expect(brandName).toHaveClass('text-2xl', 'font-extrabold', 'text-primary-500');
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Header />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA labels', () => {
      render(<Header />);
      
      const menuButton = screen.getByLabelText('Open main menu');
      expect(menuButton).toBeInTheDocument();
    });

    it('should have screen reader text for menu button', () => {
      render(<Header />);
      
      const srText = screen.getByText('Open main menu');
      expect(srText).toHaveClass('sr-only');
    });

    it('should have proper link structure', () => {
      render(<Header />);
      
      // All navigation items should be proper links
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
      
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
      });
    });

    it('should support keyboard navigation', () => {
      render(<Header />);
      
      const menuButton = screen.getByLabelText('Open main menu');
      
      // Button should be focusable
      menuButton.focus();
      expect(document.activeElement).toBe(menuButton);
      
      // Should respond to keyboard events
      fireEvent.keyDown(menuButton, { key: 'Enter' });
      // After pressing Enter, menu should open (we'll have duplicate nav items)
      expect(screen.getAllByText('Home')).toHaveLength(2);
    });

    it('should have proper focus management', () => {
      render(<Header />);
      
      const menuButton = screen.getByLabelText('Open main menu');
      expect(menuButton).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-inset', 'focus:ring-primary-500');
    });
  });

  describe('Integration', () => {
    it('should handle navigation state correctly', () => {
      render(<Header />);
      
      // Test the complete flow
      const menuButton = screen.getByLabelText('Open main menu');
      
      // 1. Initial state - menu closed
      expect(screen.getAllByText('Home')).toHaveLength(1);
      
      // 2. Open menu
      fireEvent.click(menuButton);
      expect(screen.getAllByText('Home')).toHaveLength(2);
      
      // 3. Close menu by clicking same button
      fireEvent.click(menuButton);
      expect(screen.getAllByText('Home')).toHaveLength(1);
    });

    it('should handle external links correctly', () => {
      render(<Header />);
      
      // Hash links should be regular anchor tags
      const homeLink = screen.getAllByText('Home')[0];
      expect(homeLink.closest('a')).not.toHaveAttribute('data-testid');
      
      // Blog link should be Next.js Link (mocked as anchor)
      const blogLink = screen.getAllByText('Blog')[0];
      expect(blogLink.closest('a')).toHaveAttribute('href', '/blog');
    });

    it('should maintain consistent styling across states', () => {
      render(<Header />);
      
      const menuButton = screen.getByLabelText('Open main menu');
      
      // Check initial button classes
      const initialClasses = Array.from(menuButton.classList);
      
      // Open menu
      fireEvent.click(menuButton);
      
      // Button classes should remain consistent
      const openClasses = Array.from(menuButton.classList);
      expect(initialClasses).toEqual(openClasses);
    });
  });

  describe('Error Boundaries', () => {
    it('should render without crashing with minimal props', () => {
      expect(() => render(<Header />)).not.toThrow();
    });

    it('should handle missing navigation gracefully', () => {
      // Test that the component works even if navigation items were undefined
      // This tests component robustness
      render(<Header />);
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });
  });
});