import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Hero from '../Hero';

// Extend Jest matchers for accessibility testing
expect.extend(toHaveNoViolations);

describe('Hero Component', () => {
  describe('Rendering', () => {
    it('should render the hero section with main heading', () => {
      render(<Hero />);
      
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toBeInTheDocument();
      expect(mainHeading).toHaveTextContent('Technical Customer Success Architect');
    });

    it('should render availability badge', () => {
      render(<Hero />);
      
      const availabilityBadge = screen.getByText('Available for new projects');
      expect(availabilityBadge).toBeInTheDocument();
      expect(availabilityBadge.closest('div')).toHaveClass('bg-primary-100', 'text-primary-700');
    });

    it('should render subheading and description', () => {
      render(<Hero />);
      
      const subheading = screen.getByText(/I bridge engineering excellence with customer satisfaction/);
      expect(subheading).toBeInTheDocument();
      expect(subheading).toHaveClass('text-xl', 'md:text-2xl', 'text-accent-600');
      
      const description = screen.getByText(/With expertise in full-stack development/);
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass('text-lg', 'text-accent-700');
    });

    it('should render CTA buttons', () => {
      render(<Hero />);
      
      const viewWorkButton = screen.getByText('View My Work');
      expect(viewWorkButton).toBeInTheDocument();
      expect(viewWorkButton.closest('a')).toHaveAttribute('href', '#case-studies');
      expect(viewWorkButton.closest('a')).toHaveClass('btn-primary');
      
      const connectButton = screen.getByText("Let's Connect");
      expect(connectButton).toBeInTheDocument();
      expect(connectButton.closest('a')).toHaveAttribute('href', '#contact');
      expect(connectButton.closest('a')).toHaveClass('btn-secondary');
    });

    it('should render statistics section', () => {
      render(<Hero />);
      
      const stats = [
        { value: '7+', label: 'Countries Served' },
        { value: '200K+', label: 'Businesses Impacted' },
        { value: '99.9%', label: 'Uptime Achieved' },
      ];
      
      stats.forEach(({ value, label }) => {
        expect(screen.getByText(value)).toBeInTheDocument();
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });

    it('should render scroll indicator', () => {
      render(<Hero />);
      
      const scrollIndicator = screen.getByText('Scroll to explore');
      expect(scrollIndicator).toBeInTheDocument();
      expect(scrollIndicator.closest('a')).toHaveAttribute('href', '#about');
    });

    it('should render hero visual placeholder', () => {
      render(<Hero />);
      
      const initials = screen.getByText('WO');
      expect(initials).toBeInTheDocument();
      
      const placeholderText = screen.getByText('Professional photo');
      expect(placeholderText).toBeInTheDocument();
      
      const comingSoonText = screen.getByText('coming soon');
      expect(comingSoonText).toBeInTheDocument();
    });

    it('should render floating cards', () => {
      render(<Hero />);
      
      const availableCard = screen.getByText('Available');
      expect(availableCard).toBeInTheDocument();
      
      const globalCard = screen.getByText('Global');
      expect(globalCard).toBeInTheDocument();
      
      const remoteText = screen.getByText('Remote-First');
      expect(remoteText).toBeInTheDocument();
    });
  });

  describe('Layout and Structure', () => {
    it('should have correct section attributes', () => {
      render(<Hero />);
      
      const heroSection = screen.getByRole('banner') || document.querySelector('section#home');
      expect(heroSection).toHaveAttribute('id', 'home');
      expect(heroSection).toHaveClass('relative', 'min-h-screen', 'flex', 'items-center');
    });

    it('should have proper responsive grid layout', () => {
      render(<Hero />);
      
      const gridContainer = document.querySelector('.lg\\:grid.lg\\:grid-cols-12');
      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass('lg:grid', 'lg:grid-cols-12', 'lg:gap-8');
    });

    it('should have background pattern elements', () => {
      render(<Hero />);
      
      const backgroundOverlay = document.querySelector('.absolute.inset-0.bg-gradient-to-br');
      expect(backgroundOverlay).toBeInTheDocument();
    });

    it('should have proper container constraints', () => {
      render(<Hero />);
      
      const container = document.querySelector('.max-w-7xl.mx-auto');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8');
    });
  });

  describe('Interactive Elements', () => {
    it('should have clickable CTA buttons', () => {
      render(<Hero />);
      
      const ctaLinks = screen.getAllByRole('link').filter(link => 
        link.textContent.includes('View My Work') || link.textContent.includes("Let's Connect")
      );
      
      expect(ctaLinks).toHaveLength(2);
      ctaLinks.forEach(link => {
        expect(link).toHaveAttribute('href');
        expect(link.getAttribute('href')).toMatch(/^#/); // Should be anchor links
      });
    });

    it('should have scroll indicator link', () => {
      render(<Hero />);
      
      const scrollLink = screen.getByText('Scroll to explore').closest('a');
      expect(scrollLink).toHaveAttribute('href', '#about');
    });

    it('should have proper button styling for interactions', () => {
      render(<Hero />);
      
      const viewWorkButton = screen.getByText('View My Work').closest('a');
      expect(viewWorkButton).toHaveClass('btn-primary', 'inline-flex', 'items-center', 'justify-center');
      
      const connectButton = screen.getByText("Let's Connect").closest('a');
      expect(connectButton).toHaveClass('btn-secondary', 'inline-flex', 'items-center', 'justify-center');
    });
  });

  describe('Visual Elements', () => {
    it('should render SVG icons correctly', () => {
      render(<Hero />);
      
      const svgElements = document.querySelectorAll('svg');
      expect(svgElements.length).toBeGreaterThan(0);
      
      // Check for arrow icon in View My Work button
      const viewWorkButton = screen.getByText('View My Work').closest('a');
      const arrowIcon = viewWorkButton.querySelector('svg');
      expect(arrowIcon).toBeInTheDocument();
      expect(arrowIcon).toHaveClass('ml-2', '-mr-1', 'w-5', 'h-5');
      
      // Check for message icon in Let's Connect button
      const connectButton = screen.getByText("Let's Connect").closest('a');
      const messageIcon = connectButton.querySelector('svg');
      expect(messageIcon).toBeInTheDocument();
    });

    it('should have animated elements', () => {
      render(<Hero />);
      
      // Check for pulse animation in availability badge
      const pulseDot = document.querySelector('.animate-pulse');
      expect(pulseDot).toBeInTheDocument();
      
      // Check for bounce animation in scroll indicator
      const bounceIcon = document.querySelector('.animate-bounce');
      expect(bounceIcon).toBeInTheDocument();
    });

    it('should have gradient text styling', () => {
      render(<Hero />);
      
      const gradientText = document.querySelector('.text-gradient');
      expect(gradientText).toBeInTheDocument();
      expect(gradientText).toHaveTextContent('Success Architect');
    });

    it('should have proper shadow and styling classes', () => {
      render(<Hero />);
      
      const heroImage = document.querySelector('.shadow-2xl');
      expect(heroImage).toBeInTheDocument();
      expect(heroImage).toHaveClass('aspect-square', 'rounded-2xl', 'bg-gradient-to-br');
      
      const floatingCards = document.querySelectorAll('.shadow-brand');
      expect(floatingCards.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Design', () => {
    it('should have mobile-first responsive text sizing', () => {
      render(<Hero />);
      
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveClass('text-4xl', 'md:text-5xl', 'lg:text-6xl');
      
      const subheading = screen.getByText(/I bridge engineering excellence/);
      expect(subheading).toHaveClass('text-xl', 'md:text-2xl');
    });

    it('should have responsive button layout', () => {
      render(<Hero />);
      
      const buttonContainer = document.querySelector('.flex.flex-col.sm\\:flex-row');
      expect(buttonContainer).toBeInTheDocument();
      expect(buttonContainer).toHaveClass('flex', 'flex-col', 'sm:flex-row', 'sm:space-x-4');
    });

    it('should have responsive statistics grid', () => {
      render(<Hero />);
      
      const statsGrid = document.querySelector('.grid.grid-cols-3');
      expect(statsGrid).toBeInTheDocument();
      expect(statsGrid).toHaveClass('grid', 'grid-cols-3', 'gap-6');
    });

    it('should show/hide elements based on screen size', () => {
      render(<Hero />);
      
      const scrollIndicator = screen.getByText('Scroll to explore').closest('.hidden.lg\\:block');
      expect(scrollIndicator).toHaveClass('hidden', 'lg:block');
      
      const floatingCards = document.querySelectorAll('.hidden.lg\\:block');
      expect(floatingCards.length).toBeGreaterThan(1); // Multiple floating cards
    });

    it('should have responsive text alignment', () => {
      render(<Hero />);
      
      const mainContainer = document.querySelector('.text-center.lg\\:text-left');
      expect(mainContainer).toHaveClass('text-center', 'lg:text-left');
      
      const statsItems = document.querySelectorAll('.text-center.lg\\:text-left');
      expect(statsItems.length).toBeGreaterThan(1);
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Hero />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper heading hierarchy', () => {
      render(<Hero />);
      
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toBeInTheDocument();
      
      // Should not have any h2, h3, etc. in hero section
      const otherHeadings = screen.queryAllByRole('heading', { level: 2 });
      expect(otherHeadings).toHaveLength(0);
    });

    it('should have descriptive link text', () => {
      render(<Hero />);
      
      const viewWorkLink = screen.getByRole('link', { name: /View My Work/ });
      expect(viewWorkLink).toBeInTheDocument();
      
      const connectLink = screen.getByRole('link', { name: /Let's Connect/ });
      expect(connectLink).toBeInTheDocument();
      
      const scrollLink = screen.getByRole('link', { name: /Scroll to explore/ });
      expect(scrollLink).toBeInTheDocument();
    });

    it('should have proper ARIA attributes for interactive elements', () => {
      render(<Hero />);
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
      });
    });

    it('should have meaningful text content', () => {
      render(<Hero />);
      
      // Important information should be accessible via screen readers
      expect(screen.getByText('Technical Customer Success Architect')).toBeInTheDocument();
      expect(screen.getByText('Available for new projects')).toBeInTheDocument();
      expect(screen.getByText(/I bridge engineering excellence/)).toBeInTheDocument();
    });
  });

  describe('Content and Messaging', () => {
    it('should display correct professional title', () => {
      render(<Hero />);
      
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toHaveTextContent('Technical Customer Success Architect');
    });

    it('should display key value proposition', () => {
      render(<Hero />);
      
      const valueProps = [
        'I bridge engineering excellence with customer satisfaction',
        'designing solutions that scale businesses and delight users globally',
        'full-stack development, AI automation, and customer success',
      ];
      
      valueProps.forEach(prop => {
        expect(screen.getByText(new RegExp(prop, 'i'))).toBeInTheDocument();
      });
    });

    it('should display accurate statistics', () => {
      render(<Hero />);
      
      const stats = [
        { value: '7+', metric: 'Countries Served' },
        { value: '200K+', metric: 'Businesses Impacted' },
        { value: '99.9%', metric: 'Uptime Achieved' },
      ];
      
      stats.forEach(({ value, metric }) => {
        expect(screen.getByText(value)).toBeInTheDocument();
        expect(screen.getByText(metric)).toBeInTheDocument();
      });
    });

    it('should have consistent branding', () => {
      render(<Hero />);
      
      const brandElements = [
        'Technical Customer Success Architect',
        'Available for new projects',
        'Global',
        'Remote-First',
      ];
      
      brandElements.forEach(element => {
        expect(screen.getByText(element)).toBeInTheDocument();
      });
    });
  });

  describe('Performance and Optimization', () => {
    it('should use semantic HTML structure', () => {
      render(<Hero />);
      
      const section = document.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section).toHaveAttribute('id', 'home');
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.tagName).toBe('H1');
    });

    it('should have efficient CSS classes for styling', () => {
      render(<Hero />);
      
      // Should use utility classes efficiently
      const section = document.querySelector('section');
      expect(section.className).not.toBe(''); // Should have CSS classes
      
      // Important elements should have proper classes
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveClass('font-extrabold');
    });

    it('should minimize DOM depth where possible', () => {
      render(<Hero />);
      
      const section = document.querySelector('section');
      expect(section).toBeInTheDocument();
      
      // Basic structure validation - shouldn't be overly nested
      const deeplyNested = section.querySelectorAll('div div div div div div');
      expect(deeplyNested.length).toBeLessThan(10); // Reasonable nesting limit
    });
  });

  describe('Error Boundaries and Edge Cases', () => {
    it('should render without crashing', () => {
      expect(() => render(<Hero />)).not.toThrow();
    });

    it('should handle missing content gracefully', () => {
      // Component should still render even if some elements are conditionally missing
      render(<Hero />);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('should have fallback content for images', () => {
      render(<Hero />);
      
      // Should have placeholder content when no professional photo is available
      const placeholder = screen.getByText('WO');
      expect(placeholder).toBeInTheDocument();
      
      const placeholderText = screen.getByText('Professional photo');
      expect(placeholderText).toBeInTheDocument();
    });
  });
});