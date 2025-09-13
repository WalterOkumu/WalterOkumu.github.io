import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import HomePage from '../page';

// Extend Jest matchers for accessibility testing
expect.extend(toHaveNoViolations);

describe('HomePage Component', () => {
  describe('Rendering', () => {
    it('should render the home page with main content', () => {
      render(<HomePage />);
      
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      expect(main).toHaveClass('min-h-screen', 'bg-white');
    });

    it('should render the primary heading', () => {
      render(<HomePage />);
      
      const primaryHeading = screen.getByRole('heading', { level: 1 });
      expect(primaryHeading).toHaveTextContent('Walter Okumu Oriaro');
      expect(primaryHeading).toHaveClass('text-4xl', 'md:text-5xl', 'font-bold', 'text-slate-800');
    });

    it('should render the secondary heading with job title', () => {
      render(<HomePage />);
      
      const secondaryHeading = screen.getByRole('heading', { level: 2 });
      expect(secondaryHeading).toHaveTextContent('Technical Customer Success Architect & Full-Stack Engineer');
      expect(secondaryHeading).toHaveClass('text-xl', 'md:text-2xl', 'text-slate-600');
    });

    it('should render the description paragraph', () => {
      render(<HomePage />);
      
      const description = screen.getByText(/I bridge the gap between technical architecture and customer success/);
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass('text-lg', 'text-slate-600', 'max-w-3xl', 'mx-auto', 'leading-relaxed');
    });

    it('should have proper content hierarchy', () => {
      render(<HomePage />);
      
      const headings = screen.getAllByRole('heading');
      expect(headings).toHaveLength(2);
      
      const h1 = screen.getByRole('heading', { level: 1 });
      const h2 = screen.getByRole('heading', { level: 2 });
      
      expect(h1).toBeInTheDocument();
      expect(h2).toBeInTheDocument();
    });
  });

  describe('Layout and Structure', () => {
    it('should have correct section structure', () => {
      render(<HomePage />);
      
      const section = document.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass('py-20', 'px-4');
    });

    it('should have centered content container', () => {
      render(<HomePage />);
      
      const container = document.querySelector('.max-w-4xl.mx-auto.text-center');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('max-w-4xl', 'mx-auto', 'text-center');
    });

    it('should have proper spacing between elements', () => {
      render(<HomePage />);
      
      const primaryHeading = screen.getByRole('heading', { level: 1 });
      expect(primaryHeading).toHaveClass('mb-6');
      
      const secondaryHeading = screen.getByRole('heading', { level: 2 });
      expect(secondaryHeading).toHaveClass('mb-8');
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive text sizes', () => {
      render(<HomePage />);
      
      const primaryHeading = screen.getByRole('heading', { level: 1 });
      expect(primaryHeading).toHaveClass('text-4xl', 'md:text-5xl');
      
      const secondaryHeading = screen.getByRole('heading', { level: 2 });
      expect(secondaryHeading).toHaveClass('text-xl', 'md:text-2xl');
    });

    it('should have responsive padding', () => {
      render(<HomePage />);
      
      const section = document.querySelector('section');
      expect(section).toHaveClass('py-20', 'px-4');
    });

    it('should have responsive content width', () => {
      render(<HomePage />);
      
      const description = screen.getByText(/I bridge the gap between technical architecture/);
      expect(description).toHaveClass('max-w-3xl', 'mx-auto');
    });
  });

  describe('Typography and Styling', () => {
    it('should use consistent color scheme', () => {
      render(<HomePage />);
      
      const primaryHeading = screen.getByRole('heading', { level: 1 });
      expect(primaryHeading).toHaveClass('text-slate-800');
      
      const secondaryHeading = screen.getByRole('heading', { level: 2 });
      expect(secondaryHeading).toHaveClass('text-slate-600');
      
      const description = screen.getByText(/I bridge the gap/);
      expect(description).toHaveClass('text-slate-600');
    });

    it('should have appropriate font weights', () => {
      render(<HomePage />);
      
      const primaryHeading = screen.getByRole('heading', { level: 1 });
      expect(primaryHeading).toHaveClass('font-bold');
      
      // Secondary heading and description should have normal weight (no font-bold class)
      const secondaryHeading = screen.getByRole('heading', { level: 2 });
      expect(secondaryHeading).not.toHaveClass('font-bold');
    });

    it('should have proper line spacing', () => {
      render(<HomePage />);
      
      const description = screen.getByText(/I bridge the gap/);
      expect(description).toHaveClass('leading-relaxed');
    });
  });

  describe('Content Quality', () => {
    it('should have meaningful and professional content', () => {
      render(<HomePage />);
      
      const name = screen.getByText('Walter Okumu Oriaro');
      expect(name).toBeInTheDocument();
      
      const title = screen.getByText('Technical Customer Success Architect & Full-Stack Engineer');
      expect(title).toBeInTheDocument();
      
      const description = screen.getByText(/I bridge the gap between technical architecture and customer success/);
      expect(description).toBeInTheDocument();
    });

    it('should communicate value proposition clearly', () => {
      render(<HomePage />);
      
      const description = screen.getByText(/designing solutions that solve complex business challenges while ensuring user adoption and satisfaction/);
      expect(description).toBeInTheDocument();
    });

    it('should have professional and compelling messaging', () => {
      render(<HomePage />);
      
      // Check that key professional terms are present
      const content = document.body.textContent;
      
      expect(content).toContain('Technical Customer Success Architect');
      expect(content).toContain('Full-Stack Engineer');
      expect(content).toContain('technical architecture');
      expect(content).toContain('customer success');
      expect(content).toContain('business challenges');
      expect(content).toContain('user adoption');
    });
  });

  describe('SEO and Metadata', () => {
    it('should have proper heading structure for SEO', () => {
      render(<HomePage />);
      
      // Should have exactly one H1
      const h1Elements = screen.getAllByRole('heading', { level: 1 });
      expect(h1Elements).toHaveLength(1);
      
      // Should have at least one H2
      const h2Elements = screen.getAllByRole('heading', { level: 2 });
      expect(h2Elements.length).toBeGreaterThanOrEqual(1);
    });

    it('should have descriptive and keyword-rich content', () => {
      render(<HomePage />);
      
      const mainContent = document.body.textContent;
      
      // Should contain important keywords for SEO
      const keywords = [
        'Walter Okumu Oriaro',
        'Technical Customer Success',
        'Full-Stack Engineer',
        'technical architecture',
        'customer success',
      ];
      
      keywords.forEach(keyword => {
        expect(mainContent).toContain(keyword);
      });
    });

    it('should have content suitable for search engine snippets', () => {
      render(<HomePage />);
      
      const description = screen.getByText(/I bridge the gap between technical architecture and customer success/);
      const descriptionText = description.textContent;
      
      // Description should be appropriate length for search snippets (150-160 chars)
      expect(descriptionText.length).toBeLessThan(200);
      expect(descriptionText.length).toBeGreaterThan(100);
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<HomePage />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper semantic HTML structure', () => {
      render(<HomePage />);
      
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      
      const section = document.querySelector('section');
      expect(section).toBeInTheDocument();
      
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
    });

    it('should have proper heading hierarchy', () => {
      render(<HomePage />);
      
      const h1 = screen.getByRole('heading', { level: 1 });
      const h2 = screen.getByRole('heading', { level: 2 });
      
      expect(h1).toBeInTheDocument();
      expect(h2).toBeInTheDocument();
      
      // H1 should come before H2 in document order
      const allHeadings = screen.getAllByRole('heading');
      const h1Index = allHeadings.findIndex(heading => heading.tagName === 'H1');
      const h2Index = allHeadings.findIndex(heading => heading.tagName === 'H2');
      
      expect(h1Index).toBeLessThan(h2Index);
    });

    it('should have sufficient color contrast', () => {
      render(<HomePage />);
      
      // Test that text uses appropriate contrast colors
      const primaryHeading = screen.getByRole('heading', { level: 1 });
      expect(primaryHeading).toHaveClass('text-slate-800'); // Dark text on light background
      
      const secondaryHeading = screen.getByRole('heading', { level: 2 });
      expect(secondaryHeading).toHaveClass('text-slate-600'); // Medium contrast
    });

    it('should be readable without CSS', () => {
      render(<HomePage />);
      
      // Content should be meaningful even without styling
      const textContent = document.body.textContent;
      
      expect(textContent).toContain('Walter Okumu Oriaro');
      expect(textContent).toContain('Technical Customer Success Architect');
      expect(textContent).toContain('I bridge the gap between technical architecture');
    });
  });

  describe('Performance Considerations', () => {
    it('should have minimal DOM complexity', () => {
      render(<HomePage />);
      
      const allElements = document.querySelectorAll('*');
      expect(allElements.length).toBeLessThan(20); // Simple page should have minimal DOM
    });

    it('should not have unnecessary divs or wrappers', () => {
      render(<HomePage />);
      
      // Count nested divs - should be reasonable
      const nestedDivs = document.querySelectorAll('div div div');
      expect(nestedDivs.length).toBeLessThan(5); // Avoid excessive nesting
    });

    it('should use semantic HTML over generic divs where possible', () => {
      render(<HomePage />);
      
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(document.querySelector('section')).toBeInTheDocument();
      expect(screen.getAllByRole('heading')).toHaveLength(2);
    });
  });

  describe('Mobile Responsiveness', () => {
    it('should have mobile-friendly viewport', () => {
      render(<HomePage />);
      
      // Check that responsive classes are applied
      const primaryHeading = screen.getByRole('heading', { level: 1 });
      expect(primaryHeading.className).toContain('md:text-5xl'); // Responsive text
      
      const secondaryHeading = screen.getByRole('heading', { level: 2 });
      expect(secondaryHeading.className).toContain('md:text-2xl'); // Responsive text
    });

    it('should have appropriate padding for mobile', () => {
      render(<HomePage />);
      
      const section = document.querySelector('section');
      expect(section).toHaveClass('px-4'); // Mobile-friendly horizontal padding
    });

    it('should have readable text sizes on mobile', () => {
      render(<HomePage />);
      
      const primaryHeading = screen.getByRole('heading', { level: 1 });
      expect(primaryHeading).toHaveClass('text-4xl'); // Large enough for mobile
      
      const secondaryHeading = screen.getByRole('heading', { level: 2 });
      expect(secondaryHeading).toHaveClass('text-xl'); // Readable on mobile
      
      const description = screen.getByText(/I bridge the gap/);
      expect(description).toHaveClass('text-lg'); // Large enough for mobile reading
    });
  });

  describe('Error Boundaries and Edge Cases', () => {
    it('should render without crashing', () => {
      expect(() => render(<HomePage />)).not.toThrow();
    });

    it('should handle missing props gracefully', () => {
      // HomePage doesn't take props, but test it renders consistently
      const { container: container1 } = render(<HomePage />);
      const { container: container2 } = render(<HomePage />);
      
      expect(container1.innerHTML).toBe(container2.innerHTML);
    });

    it('should not have any undefined or null content', () => {
      render(<HomePage />);
      
      const textContent = document.body.textContent;
      expect(textContent).not.toContain('undefined');
      expect(textContent).not.toContain('null');
      expect(textContent).not.toContain('[object Object]');
    });
  });

  describe('Content Strategy', () => {
    it('should establish personal brand effectively', () => {
      render(<HomePage />);
      
      const name = screen.getByText('Walter Okumu Oriaro');
      const title = screen.getByText(/Technical Customer Success Architect/);
      
      expect(name).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      
      // Should establish expertise areas
      const content = document.body.textContent;
      expect(content).toContain('technical architecture');
      expect(content).toContain('customer success');
      expect(content).toContain('business challenges');
    });

    it('should communicate unique value proposition', () => {
      render(<HomePage />);
      
      const description = screen.getByText(/I bridge the gap between technical architecture and customer success/);
      expect(description).toBeInTheDocument();
      
      // Should emphasize the bridge/connector role
      const content = description.textContent;
      expect(content).toContain('bridge the gap');
      expect(content).toContain('designing solutions');
      expect(content).toContain('user adoption and satisfaction');
    });

    it('should appeal to target audience', () => {
      render(<HomePage />);
      
      const content = document.body.textContent;
      
      // Should appeal to businesses needing technical customer success
      expect(content).toContain('business challenges');
      expect(content).toContain('user adoption');
      expect(content).toContain('customer success');
    });
  });
});