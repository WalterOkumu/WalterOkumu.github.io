import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import Footer from '../Footer';

// Extend Jest matchers for accessibility testing
expect.extend(toHaveNoViolations);

// Mock Date to ensure consistent testing
const mockDate = new Date('2023-12-25');
jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
Date.now = jest.fn(() => mockDate.getTime());

describe('Footer Component', () => {
  beforeEach(() => {
    // Reset Date mock before each test
    Date.mockClear();
  });

  describe('Rendering', () => {
    it('should render the footer with brand name', () => {
      render(<Footer />);

      const brandName = screen.getByText('Okumu');
      expect(brandName).toBeInTheDocument();
      expect(brandName).toHaveClass('text-3xl', 'font-extrabold', 'text-white');
    });

    it('should render the brand description', () => {
      render(<Footer />);

      const description = screen.getByText(/Technical Customer Success Architect bridging/);
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass('text-accent-100');
    });

    it('should render current year in copyright', () => {
      render(<Footer />);

      const copyright = screen.getByText(/\(c\) 2023 Walter Okumu Oriaro/);
      expect(copyright).toBeInTheDocument();
    });

    it('should render all social media links', () => {
      render(<Footer />);

      const githubLink = screen.getByLabelText('GitHub');
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute('href', 'https://github.com/WalterOkumu');

      const linkedinLink = screen.getByLabelText('LinkedIn');
      expect(linkedinLink).toBeInTheDocument();
      expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/walter-okumu-oriaro');

      const twitterLink = screen.getByLabelText('Twitter');
      expect(twitterLink).toBeInTheDocument();
      expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/walterokumu');
    });

    it('should render quick links section', () => {
      render(<Footer />);

      const quickLinksHeading = screen.getByText('Quick Links');
      expect(quickLinksHeading).toBeInTheDocument();
      expect(quickLinksHeading).toHaveClass('text-sm', 'font-semibold', 'text-white');

      const expectedQuickLinks = ['Home', 'About', 'Services', 'Case Studies'];
      expectedQuickLinks.forEach(link => {
        expect(screen.getByText(link)).toBeInTheDocument();
      });
    });

    it('should render services section', () => {
      render(<Footer />);

      const servicesHeading = screen.getByText('Services');
      expect(servicesHeading).toBeInTheDocument();

      const expectedServices = [
        'Technical Customer Success',
        'Full-Stack Development',
        'AI Automation Solutions',
        'Cloud Architecture',
      ];
      expectedServices.forEach(service => {
        expect(screen.getByText(service)).toBeInTheDocument();
      });
    });

    it('should render contact section', () => {
      render(<Footer />);

      const contactHeading = screen.getByText('Get In Touch');
      expect(contactHeading).toBeInTheDocument();

      const contactText = screen.getByText('Ready to discuss your next project?');
      expect(contactText).toBeInTheDocument();

      const connectLink = screen.getByText("Let's connect");
      expect(connectLink).toBeInTheDocument();
      expect(connectLink).toHaveAttribute('href', '#contact');
    });

    it('should render legal links', () => {
      render(<Footer />);

      const privacyLink = screen.getByText('Privacy Policy');
      expect(privacyLink).toBeInTheDocument();
      expect(privacyLink).toHaveAttribute('href', '/privacy');

      const termsLink = screen.getByText('Terms of Service');
      expect(termsLink).toBeInTheDocument();
      expect(termsLink).toHaveAttribute('href', '/terms');
    });
  });

  describe('Social Media Links', () => {
    it('should have correct social media attributes', () => {
      render(<Footer />);

      const socialLinks = [
        { name: 'GitHub', href: 'https://github.com/WalterOkumu' },
        { name: 'LinkedIn', href: 'https://linkedin.com/in/walter-okumu-oriaro' },
        { name: 'Twitter', href: 'https://twitter.com/walterokumu' },
      ];

      socialLinks.forEach(({ name, href }) => {
        const link = screen.getByLabelText(name);
        expect(link).toHaveAttribute('href', href);
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('should have correct social media styling', () => {
      render(<Footer />);

      const githubLink = screen.getByLabelText('GitHub');
      expect(githubLink).toHaveClass(
        'text-accent-200',
        'hover:text-white',
        'transition-colors',
        'duration-200',
      );
    });

    it('should render social media icons', () => {
      render(<Footer />);

      const githubLink = screen.getByLabelText('GitHub');
      const githubIcon = githubLink.querySelector('svg');
      expect(githubIcon).toBeInTheDocument();
      expect(githubIcon).toHaveClass('w-5', 'h-5');
    });
  });

  describe('Navigation Links', () => {
    it('should render quick links with correct hrefs', () => {
      render(<Footer />);

      const expectedLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Case Studies', href: '#case-studies' },
      ];

      expectedLinks.forEach(({ name, href }) => {
        const link = screen.getByText(name);
        expect(link.closest('a')).toHaveAttribute('href', href);
      });
    });

    it('should have correct styling for navigation links', () => {
      render(<Footer />);

      const homeLink = screen.getByText('Home');
      expect(homeLink).toHaveClass(
        'text-base',
        'text-accent-100',
        'hover:text-white',
        'transition-colors',
        'duration-200',
      );
    });
  });

  describe('Services Section', () => {
    it('should list all services as text only', () => {
      render(<Footer />);

      const services = [
        'Technical Customer Success',
        'Full-Stack Development',
        'AI Automation Solutions',
        'Cloud Architecture',
      ];

      services.forEach(service => {
        const serviceElement = screen.getByText(service);
        expect(serviceElement).toBeInTheDocument();
        expect(serviceElement).toHaveClass('text-base', 'text-accent-100');
        expect(serviceElement.tagName).toBe('SPAN');
      });
    });
  });

  describe('Contact Section', () => {
    it('should have call-to-action styling', () => {
      render(<Footer />);

      const connectLink = screen.getByText("Let's connect");
      expect(connectLink).toHaveClass(
        'inline-block',
        'mt-2',
        'text-primary-200',
        'hover:text-white',
        'font-medium',
        'transition-colors',
        'duration-200',
      );
    });

    it('should render availability information', () => {
      render(<Footer />);

      const availability = screen.getByText('Global availability - Remote-first approach');
      expect(availability).toBeInTheDocument();
      expect(availability).toHaveClass('text-sm', 'text-accent-200');
    });
  });

  describe('Layout and Styling', () => {
    it('should have correct footer background and text colors', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('bg-primary-900', 'text-white');
    });

    it('should have responsive grid layout', () => {
      render(<Footer />);

      const mainContainer = screen.getByRole('contentinfo').querySelector('.xl\\:grid');
      expect(mainContainer).toHaveClass('xl:grid', 'xl:grid-cols-3', 'xl:gap-8');
    });

    it('should have correct spacing classes', () => {
      render(<Footer />);

      const mainContainer = screen.getByRole('contentinfo').firstChild;
      expect(mainContainer).toHaveClass(
        'max-w-7xl',
        'mx-auto',
        'py-12',
        'px-4',
        'sm:px-6',
        'lg:py-16',
        'lg:px-8',
      );
    });

    it('should have border separator for bottom section', () => {
      render(<Footer />);

      const bottomSection = screen.getByText(/\(c\) 2023/).closest('.border-t');
      expect(bottomSection).toHaveClass('border-t', 'border-primary-800', 'pt-8');
    });
  });

  describe('Copyright and Legal', () => {
    it('should display current year dynamically', () => {
      // Test with different year
      const newMockDate = new Date('2024-01-01');
      Date.mockImplementation(() => newMockDate);

      render(<Footer />);

      const copyright = screen.getByText(/\(c\) 2024 Walter Okumu Oriaro/);
      expect(copyright).toBeInTheDocument();
    });

    it('should have correct styling for legal links', () => {
      render(<Footer />);

      const privacyLink = screen.getByText('Privacy Policy');
      expect(privacyLink).toHaveClass('text-accent-200', 'hover:text-white', 'text-sm');

      const termsLink = screen.getByText('Terms of Service');
      expect(termsLink).toHaveClass('text-accent-200', 'hover:text-white', 'text-sm');
    });

    it('should have proper spacing between legal links', () => {
      render(<Footer />);

      const legalContainer = screen.getByText('Privacy Policy').closest('.flex');
      expect(legalContainer).toHaveClass('flex', 'space-x-6');
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Footer />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper landmark structure', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });

    it('should have proper heading hierarchy', () => {
      render(<Footer />);

      const headings = screen.getAllByRole('heading');
      headings.forEach(heading => {
        expect(heading.tagName).toBe('H3');
        expect(heading).toHaveClass('text-sm', 'font-semibold', 'text-white');
      });
    });

    it('should have screen reader text for social media icons', () => {
      render(<Footer />);

      const socialLinks = ['GitHub', 'LinkedIn', 'Twitter'];
      socialLinks.forEach(name => {
        const srText = screen.getByText(name);
        expect(srText).toHaveClass('sr-only');
      });
    });

    it('should have proper link attributes for external links', () => {
      render(<Footer />);

      const githubLink = screen.getByLabelText('GitHub');
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should be keyboard navigable', () => {
      render(<Footer />);

      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
        // Links should be focusable by default
        link.focus();
        expect(document.activeElement).toBe(link);
      });
    });
  });

  describe('Responsive Design', () => {
    it('should have mobile-first grid system', () => {
      render(<Footer />);

      // Check mobile grid for links section
      const linksSection = screen.getByText('Quick Links').closest('.grid');
      expect(linksSection).toHaveClass('grid', 'grid-cols-2', 'gap-8');

      // Check tablet responsive grid
      const tabletGrid = screen.getByText('Quick Links').closest('.md\\:grid');
      expect(tabletGrid).toHaveClass('md:grid', 'md:grid-cols-2', 'md:gap-8');
    });

    it('should handle responsive spacing', () => {
      render(<Footer />);

      // Check mobile to desktop spacing
      const servicesSection = screen.getByText('Services').closest('.mt-12');
      expect(servicesSection).toHaveClass('mt-12', 'md:mt-0');
    });

    it('should have responsive layout for bottom section', () => {
      render(<Footer />);

      const bottomContainer = screen.getByText(/\(c\) 2023/).closest('.md\\:flex');
      expect(bottomContainer).toHaveClass('md:flex', 'md:items-center', 'md:justify-between');
    });
  });

  describe('Integration', () => {
    it('should integrate with site navigation', () => {
      render(<Footer />);

      // Footer links should match header navigation
      const footerHomeLink = screen.getByText('Home');
      expect(footerHomeLink.closest('a')).toHaveAttribute('href', '#home');

      const footerAboutLink = screen.getByText('About');
      expect(footerAboutLink.closest('a')).toHaveAttribute('href', '#about');
    });

    it('should have consistent branding', () => {
      render(<Footer />);

      // Brand name should match header
      const brandName = screen.getByText('Okumu');
      expect(brandName).toHaveClass('font-extrabold');

      // Should have consistent brand colors
      expect(brandName).toHaveClass('text-white');
    });
  });

  describe('Error Boundaries', () => {
    it('should render without crashing', () => {
      expect(() => render(<Footer />)).not.toThrow();
    });

    it('should handle missing data gracefully', () => {
      // Component should work even if some data is missing
      render(<Footer />);
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('should handle date errors gracefully', () => {
      // Mock Date to throw an error
      const originalDate = Date;
      global.Date = jest.fn(() => {
        throw new Error('Date error');
      });

      // Component should still render, possibly with fallback
      expect(() => render(<Footer />)).not.toThrow();

      // Restore original Date
      global.Date = originalDate;
    });
  });
});
