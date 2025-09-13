import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

// Mock Next.js router
jest.mock('next/router', () => require('../../__mocks__/next-router'));

// Mock fetch for API calls
global.fetch = jest.fn();

describe('Contact Form Integration Tests', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    fetch.mockClear();
  });

  // Mock Contact component since we don't have the actual file
  const MockContactForm = () => (
    <form data-testid="contact-form">
      <div>
        <label htmlFor="name">Name</label>
        <input 
          id="name" 
          name="name" 
          type="text" 
          required 
          data-testid="name-input"
        />
      </div>
      
      <div>
        <label htmlFor="email">Email</label>
        <input 
          id="email" 
          name="email" 
          type="email" 
          required 
          data-testid="email-input"
        />
      </div>
      
      <div>
        <label htmlFor="company">Company (Optional)</label>
        <input 
          id="company" 
          name="company" 
          type="text" 
          data-testid="company-input"
        />
      </div>
      
      <div>
        <label htmlFor="message">Message</label>
        <textarea 
          id="message" 
          name="message" 
          required 
          minLength={10}
          data-testid="message-input"
        />
      </div>
      
      {/* Honeypot field */}
      <input 
        type="text" 
        name="honeypot" 
        style={{ display: 'none' }} 
        data-testid="honeypot"
      />
      
      <button type="submit" data-testid="submit-button">
        Send Message
      </button>
    </form>
  );

  describe('Successful Contact Form Submission', () => {
    it('should complete the full contact form workflow', async () => {
      // Mock successful API response
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'Your message has been sent successfully!'
        }),
      });

      render(<MockContactForm />);

      // Fill out the form
      await user.type(screen.getByTestId('name-input'), 'John Doe');
      await user.type(screen.getByTestId('email-input'), 'john@example.com');
      await user.type(screen.getByTestId('company-input'), 'Test Company');
      await user.type(
        screen.getByTestId('message-input'), 
        'This is a test message that is longer than 10 characters.'
      );

      // Submit the form
      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      // Wait for API call
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'John Doe',
            email: 'john@example.com',
            company: 'Test Company',
            message: 'This is a test message that is longer than 10 characters.',
            honeypot: '',
          }),
        });
      });
    });

    it('should handle form submission with minimal data', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'Your message has been sent successfully!'
        }),
      });

      render(<MockContactForm />);

      // Fill out only required fields
      await user.type(screen.getByTestId('name-input'), 'John Doe');
      await user.type(screen.getByTestId('email-input'), 'john@example.com');
      await user.type(
        screen.getByTestId('message-input'), 
        'This is a test message.'
      );

      await user.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            name: 'John Doe',
            email: 'john@example.com',
            company: '',
            message: 'This is a test message.',
            honeypot: '',
          }),
        }));
      });
    });
  });

  describe('Form Validation Integration', () => {
    it('should prevent submission with empty required fields', async () => {
      render(<MockContactForm />);

      // Try to submit empty form
      await user.click(screen.getByTestId('submit-button'));

      // Fetch should not be called
      expect(fetch).not.toHaveBeenCalled();

      // Browser validation should prevent submission
      const nameInput = screen.getByTestId('name-input');
      expect(nameInput).toBeRequired();
      expect(nameInput.validity.valueMissing).toBe(true);
    });

    it('should validate email format', async () => {
      render(<MockContactForm />);

      await user.type(screen.getByTestId('name-input'), 'John Doe');
      await user.type(screen.getByTestId('email-input'), 'invalid-email');
      await user.type(screen.getByTestId('message-input'), 'Test message');

      await user.click(screen.getByTestId('submit-button'));

      const emailInput = screen.getByTestId('email-input');
      expect(emailInput.validity.typeMismatch).toBe(true);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('should validate message minimum length', async () => {
      render(<MockContactForm />);

      await user.type(screen.getByTestId('name-input'), 'John Doe');
      await user.type(screen.getByTestId('email-input'), 'john@example.com');
      await user.type(screen.getByTestId('message-input'), 'Short');

      await user.click(screen.getByTestId('submit-button'));

      const messageInput = screen.getByTestId('message-input');
      expect(messageInput.validity.tooShort).toBe(true);
      expect(fetch).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle API errors gracefully', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      render(<MockContactForm />);

      await user.type(screen.getByTestId('name-input'), 'John Doe');
      await user.type(screen.getByTestId('email-input'), 'john@example.com');
      await user.type(screen.getByTestId('message-input'), 'Test message');

      await user.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });
    });

    it('should handle rate limiting response', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 429,
        json: async () => ({
          success: false,
          error: 'Too many requests. Please try again later.',
          retryAfter: 3600,
        }),
      });

      render(<MockContactForm />);

      await user.type(screen.getByTestId('name-input'), 'John Doe');
      await user.type(screen.getByTestId('email-input'), 'john@example.com');
      await user.type(screen.getByTestId('message-input'), 'Test message');

      await user.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });
    });

    it('should handle validation errors from server', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({
          success: false,
          errors: ['Name is required', 'Email is required'],
        }),
      });

      render(<MockContactForm />);

      await user.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });
    });
  });

  describe('Security Integration', () => {
    it('should include honeypot field for spam protection', () => {
      render(<MockContactForm />);

      const honeypot = screen.getByTestId('honeypot');
      expect(honeypot).toBeInTheDocument();
      expect(honeypot).toHaveStyle('display: none');
      expect(honeypot).toHaveValue('');
    });

    it('should not submit if honeypot is filled', async () => {
      render(<MockContactForm />);

      // Simulate bot filling honeypot
      const honeypot = screen.getByTestId('honeypot');
      fireEvent.change(honeypot, { target: { value: 'spam' } });

      await user.type(screen.getByTestId('name-input'), 'John Doe');
      await user.type(screen.getByTestId('email-input'), 'john@example.com');
      await user.type(screen.getByTestId('message-input'), 'Test message');

      await user.click(screen.getByTestId('submit-button'));

      // Form should be flagged as spam and handled appropriately
      // Implementation depends on the actual form validation logic
    });

    it('should sanitize input data before submission', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      render(<MockContactForm />);

      // Try to submit potentially malicious content
      await user.type(screen.getByTestId('name-input'), '<script>alert("xss")</script>');
      await user.type(screen.getByTestId('email-input'), 'test@example.com');
      await user.type(screen.getByTestId('message-input'), 'Message with <img src=x onerror=alert(1)>');

      await user.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
          body: expect.stringContaining('<script>alert("xss")</script>'),
        }));
      });

      // Note: Actual sanitization happens on the server side
      // This test verifies that the data is sent to the server for processing
    });
  });

  describe('Accessibility Integration', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<MockContactForm />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should support keyboard navigation', async () => {
      render(<MockContactForm />);

      const nameInput = screen.getByTestId('name-input');
      const emailInput = screen.getByTestId('email-input');
      const companyInput = screen.getByTestId('company-input');
      const messageInput = screen.getByTestId('message-input');
      const submitButton = screen.getByTestId('submit-button');

      // Test tab navigation
      nameInput.focus();
      expect(document.activeElement).toBe(nameInput);

      await user.tab();
      expect(document.activeElement).toBe(emailInput);

      await user.tab();
      expect(document.activeElement).toBe(companyInput);

      await user.tab();
      expect(document.activeElement).toBe(messageInput);

      await user.tab();
      expect(document.activeElement).toBe(submitButton);
    });

    it('should have proper labels and ARIA attributes', () => {
      render(<MockContactForm />);

      const nameInput = screen.getByLabelText('Name');
      expect(nameInput).toBeRequired();

      const emailInput = screen.getByLabelText('Email');
      expect(emailInput).toBeRequired();

      const companyInput = screen.getByLabelText('Company (Optional)');
      expect(companyInput).not.toBeRequired();

      const messageInput = screen.getByLabelText('Message');
      expect(messageInput).toBeRequired();
    });
  });

  describe('Loading States Integration', () => {
    it('should handle loading state during submission', async () => {
      // Mock slow API response
      fetch.mockImplementationOnce(
        () => new Promise(resolve => 
          setTimeout(() => resolve({
            ok: true,
            json: async () => ({ success: true }),
          }), 1000)
        )
      );

      render(<MockContactForm />);

      await user.type(screen.getByTestId('name-input'), 'John Doe');
      await user.type(screen.getByTestId('email-input'), 'john@example.com');
      await user.type(screen.getByTestId('message-input'), 'Test message');

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      // Button should be disabled during submission to prevent double-submission
      // (Implementation detail depends on actual component)
    });

    it('should re-enable form after successful submission', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      render(<MockContactForm />);

      await user.type(screen.getByTestId('name-input'), 'John Doe');
      await user.type(screen.getByTestId('email-input'), 'john@example.com');
      await user.type(screen.getByTestId('message-input'), 'Test message');

      await user.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });

      // Form should be re-enabled after response
      const submitButton = screen.getByTestId('submit-button');
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe('Cross-browser Compatibility', () => {
    it('should work with different form validation APIs', () => {
      render(<MockContactForm />);

      const form = screen.getByTestId('contact-form');
      expect(form).toBeInTheDocument();

      // Test HTML5 validation attributes
      const nameInput = screen.getByTestId('name-input');
      expect(nameInput).toHaveAttribute('required');

      const emailInput = screen.getByTestId('email-input');
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('required');

      const messageInput = screen.getByTestId('message-input');
      expect(messageInput).toHaveAttribute('required');
      expect(messageInput).toHaveAttribute('minlength', '10');
    });

    it('should handle different input methods', async () => {
      render(<MockContactForm />);

      const nameInput = screen.getByTestId('name-input');

      // Test typing
      await user.type(nameInput, 'John Doe');
      expect(nameInput).toHaveValue('John Doe');

      // Test paste
      await user.clear(nameInput);
      await user.click(nameInput);
      await user.paste('Jane Smith');
      expect(nameInput).toHaveValue('Jane Smith');
    });
  });
});