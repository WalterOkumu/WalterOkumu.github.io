import { POST, GET, PUT, DELETE } from '../route';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Mock dependencies
jest.mock('nodemailer');
jest.mock('rate-limiter-flexible');
jest.mock('sanitize-html');
jest.mock('validator');

// Import mocked dependencies
import nodemailer from 'nodemailer';
import sanitizeHtml from 'sanitize-html';
import validator from 'validator';

describe('/api/contact Route Handler', () => {
  let mockTransporter;
  let mockRateLimiter;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Setup nodemailer mock
    mockTransporter = {
      sendMail: jest.fn().mockResolvedValue({ messageId: 'test-message-id' }),
      verify: jest.fn().mockResolvedValue(true),
    };
    nodemailer.createTransporter = jest.fn(() => mockTransporter);

    // Setup rate limiter mock
    mockRateLimiter = {
      consume: jest.fn().mockResolvedValue(true),
    };
    RateLimiterMemory.mockImplementation(() => mockRateLimiter);

    // Setup sanitize-html mock
    sanitizeHtml.mockImplementation((input) => input);

    // Setup validator mocks
    validator.isEmail = jest.fn((email) => email.includes('@'));
    validator.normalizeEmail = jest.fn((email) => email.toLowerCase());

    // Mock environment variables
    process.env.SMTP_USER = 'test@example.com';
    process.env.SMTP_PASS = 'testpass';
    process.env.CONTACT_EMAIL = 'contact@example.com';
    process.env.RATE_LIMIT_MAX = '5';
  });

  afterEach(() => {
    // Clean up environment variables
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;
    delete process.env.CONTACT_EMAIL;
    delete process.env.RATE_LIMIT_MAX;
  });

  describe('POST /api/contact', () => {
    const validRequestData = {
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Test Company',
      message: 'This is a test message that is longer than 10 characters.',
      honeypot: '', // Should be empty
    };

    const createMockRequest = (data = validRequestData, headers = {}) => ({
      json: jest.fn().mockResolvedValue(data),
      headers: new Map(Object.entries({
        'x-forwarded-for': '127.0.0.1',
        ...headers,
      })),
    });

    describe('Success Cases', () => {
      it('should successfully send email with valid data', async () => {
        const request = createMockRequest();
        
        const response = await POST(request);
        const responseData = await response.json();

        expect(response.status).toBe(200);
        expect(responseData.success).toBe(true);
        expect(responseData.message).toContain('sent successfully');
        expect(mockTransporter.sendMail).toHaveBeenCalledTimes(2); // Owner + auto-reply
      });

      it('should work with minimal required fields', async () => {
        const minimalData = {
          name: 'John Doe',
          email: 'john@example.com',
          message: 'This is a valid message.',
          honeypot: '',
        };
        
        const request = createMockRequest(minimalData);
        
        const response = await POST(request);
        const responseData = await response.json();

        expect(response.status).toBe(200);
        expect(responseData.success).toBe(true);
      });

      it('should handle company field as optional', async () => {
        const dataWithoutCompany = { ...validRequestData };
        delete dataWithoutCompany.company;
        
        const request = createMockRequest(dataWithoutCompany);
        
        const response = await POST(request);
        const responseData = await response.json();

        expect(response.status).toBe(200);
        expect(responseData.success).toBe(true);
      });
    });

    describe('Rate Limiting', () => {
      it('should respect rate limits', async () => {
        const rateLimitError = new Error('Rate limit exceeded');
        rateLimitError.msBeforeNext = 3600000;
        mockRateLimiter.consume.mockRejectedValue(rateLimitError);

        const request = createMockRequest();
        
        const response = await POST(request);
        const responseData = await response.json();

        expect(response.status).toBe(429);
        expect(responseData.success).toBe(false);
        expect(responseData.error).toContain('Too many requests');
        expect(responseData.retryAfter).toBe(3600);
      });

      it('should use correct client IP for rate limiting', async () => {
        const request = createMockRequest(validRequestData, {
          'x-forwarded-for': '192.168.1.1, 10.0.0.1',
          'x-real-ip': '203.0.113.1',
        });

        await POST(request);

        expect(mockRateLimiter.consume).toHaveBeenCalledWith('192.168.1.1');
      });

      it('should handle missing IP headers', async () => {
        const request = createMockRequest(validRequestData, {});
        
        await POST(request);

        expect(mockRateLimiter.consume).toHaveBeenCalledWith('unknown');
      });
    });

    describe('Input Validation', () => {
      describe('Name Validation', () => {
        it('should require name field', async () => {
          const invalidData = { ...validRequestData };
          delete invalidData.name;
          
          const request = createMockRequest(invalidData);
          
          const response = await POST(request);
          const responseData = await response.json();

          expect(response.status).toBe(400);
          expect(responseData.success).toBe(false);
          expect(responseData.errors).toContain('Name is required');
        });

        it('should reject empty name', async () => {
          const request = createMockRequest({
            ...validRequestData,
            name: '   ',
          });
          
          const response = await POST(request);
          const responseData = await response.json();

          expect(response.status).toBe(400);
          expect(responseData.errors).toContain('Name is required');
        });

        it('should reject name shorter than 2 characters', async () => {
          const request = createMockRequest({
            ...validRequestData,
            name: 'J',
          });
          
          const response = await POST(request);
          const responseData = await response.json();

          expect(response.status).toBe(400);
          expect(responseData.errors).toContain('Name must be at least 2 characters long');
        });

        it('should reject name longer than 100 characters', async () => {
          const request = createMockRequest({
            ...validRequestData,
            name: 'J'.repeat(101),
          });
          
          const response = await POST(request);
          const responseData = await response.json();

          expect(response.status).toBe(400);
          expect(responseData.errors).toContain('Name must be less than 100 characters');
        });
      });

      describe('Email Validation', () => {
        it('should require email field', async () => {
          const invalidData = { ...validRequestData };
          delete invalidData.email;
          
          const request = createMockRequest(invalidData);
          
          const response = await POST(request);
          const responseData = await response.json();

          expect(response.status).toBe(400);
          expect(responseData.errors).toContain('Email is required');
        });

        it('should reject invalid email format', async () => {
          validator.isEmail.mockReturnValue(false);
          
          const request = createMockRequest({
            ...validRequestData,
            email: 'invalid-email',
          });
          
          const response = await POST(request);
          const responseData = await response.json();

          expect(response.status).toBe(400);
          expect(responseData.errors).toContain('Invalid email format');
        });

        it('should normalize valid emails', async () => {
          validator.normalizeEmail.mockReturnValue('john@example.com');
          
          const request = createMockRequest({
            ...validRequestData,
            email: 'JOHN@EXAMPLE.COM',
          });
          
          const response = await POST(request);

          expect(response.status).toBe(200);
          expect(validator.normalizeEmail).toHaveBeenCalledWith('JOHN@EXAMPLE.COM');
        });
      });

      describe('Company Validation', () => {
        it('should accept empty company field', async () => {
          const request = createMockRequest({
            ...validRequestData,
            company: '',
          });
          
          const response = await POST(request);

          expect(response.status).toBe(200);
        });

        it('should reject company name longer than 100 characters', async () => {
          const request = createMockRequest({
            ...validRequestData,
            company: 'C'.repeat(101),
          });
          
          const response = await POST(request);
          const responseData = await response.json();

          expect(response.status).toBe(400);
          expect(responseData.errors).toContain('Company name must be less than 100 characters');
        });
      });

      describe('Message Validation', () => {
        it('should require message field', async () => {
          const invalidData = { ...validRequestData };
          delete invalidData.message;
          
          const request = createMockRequest(invalidData);
          
          const response = await POST(request);
          const responseData = await response.json();

          expect(response.status).toBe(400);
          expect(responseData.errors).toContain('Message is required');
        });

        it('should reject message shorter than 10 characters', async () => {
          const request = createMockRequest({
            ...validRequestData,
            message: 'Short',
          });
          
          const response = await POST(request);
          const responseData = await response.json();

          expect(response.status).toBe(400);
          expect(responseData.errors).toContain('Message must be at least 10 characters long');
        });

        it('should reject message longer than 2000 characters', async () => {
          const request = createMockRequest({
            ...validRequestData,
            message: 'M'.repeat(2001),
          });
          
          const response = await POST(request);
          const responseData = await response.json();

          expect(response.status).toBe(400);
          expect(responseData.errors).toContain('Message must be less than 2000 characters');
        });
      });

      describe('Honeypot Protection', () => {
        it('should reject requests with filled honeypot field', async () => {
          const request = createMockRequest({
            ...validRequestData,
            honeypot: 'spam content',
          });
          
          const response = await POST(request);
          const responseData = await response.json();

          expect(response.status).toBe(400);
          expect(responseData.errors).toContain('Spam detected');
        });
      });

      describe('Input Sanitization', () => {
        it('should sanitize HTML in input fields', async () => {
          const maliciousData = {
            name: '<script>alert("xss")</script>John',
            email: 'john@example.com',
            company: '<img src=x onerror=alert(1)>Company',
            message: 'Clean message with <b>bold</b> text',
            honeypot: '',
          };

          sanitizeHtml.mockImplementation((input) => input.replace(/<[^>]*>/g, ''));
          
          const request = createMockRequest(maliciousData);
          
          const response = await POST(request);

          expect(response.status).toBe(200);
          expect(sanitizeHtml).toHaveBeenCalledWith(maliciousData.name.trim(), {
            allowedTags: [],
            allowedAttributes: {},
          });
        });
      });
    });

    describe('Email Configuration', () => {
      it('should return error when SMTP credentials are missing', async () => {
        delete process.env.SMTP_USER;
        delete process.env.SMTP_PASS;

        const request = createMockRequest();
        
        const response = await POST(request);
        const responseData = await response.json();

        expect(response.status).toBe(500);
        expect(responseData.error).toBe('Email service not configured');
      });

      it('should handle SMTP connection errors', async () => {
        mockTransporter.verify.mockRejectedValue(new Error('Connection failed'));

        const request = createMockRequest();
        
        const response = await POST(request);
        const responseData = await response.json();

        expect(response.status).toBe(500);
        expect(responseData.error).toBe('Email service unavailable');
      });

      it('should handle email sending failures', async () => {
        mockTransporter.sendMail.mockRejectedValue(new Error('Send failed'));

        const request = createMockRequest();
        
        const response = await POST(request);
        const responseData = await response.json();

        expect(response.status).toBe(500);
        expect(responseData.error).toBe('Failed to send message. Please try again.');
      });
    });

    describe('Email Template Generation', () => {
      it('should generate correct owner email template', async () => {
        const request = createMockRequest();
        
        await POST(request);

        const [ownerEmailCall] = mockTransporter.sendMail.mock.calls;
        const ownerEmail = ownerEmailCall[0];

        expect(ownerEmail.from).toBe(process.env.SMTP_USER);
        expect(ownerEmail.to).toBe(process.env.CONTACT_EMAIL);
        expect(ownerEmail.subject).toContain('New Contact Form Submission');
        expect(ownerEmail.html).toContain('John Doe');
        expect(ownerEmail.html).toContain('john@example.com');
        expect(ownerEmail.html).toContain('Test Company');
        expect(ownerEmail.text).toContain('John Doe');
      });

      it('should generate correct auto-reply email template', async () => {
        const request = createMockRequest();
        
        await POST(request);

        const [, autoReplyCall] = mockTransporter.sendMail.mock.calls;
        const autoReply = autoReplyCall[0];

        expect(autoReply.from).toBe(process.env.SMTP_USER);
        expect(autoReply.to).toBe('john@example.com');
        expect(autoReply.subject).toContain('Thank you for reaching out');
        expect(autoReply.html).toContain('Thank You, John Doe!');
        expect(autoReply.text).toContain('Thank You, John Doe!');
      });

      it('should handle templates without company field', async () => {
        const dataWithoutCompany = { ...validRequestData };
        delete dataWithoutCompany.company;
        
        const request = createMockRequest(dataWithoutCompany);
        
        await POST(request);

        const [ownerEmailCall] = mockTransporter.sendMail.mock.calls;
        const ownerEmail = ownerEmailCall[0];

        expect(ownerEmail.subject).toBe('New Contact Form Submission');
        expect(ownerEmail.html).not.toContain('Test Company');
      });
    });

    describe('Error Handling', () => {
      it('should handle JSON parsing errors', async () => {
        const request = {
          json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
          headers: new Map([['x-forwarded-for', '127.0.0.1']]),
        };
        
        const response = await POST(request);
        const responseData = await response.json();

        expect(response.status).toBe(400);
        expect(responseData.error).toBe('Invalid JSON data');
      });

      it('should handle unexpected server errors', async () => {
        const request = createMockRequest();
        mockRateLimiter.consume.mockRejectedValue(new Error('Unexpected error'));

        const response = await POST(request);
        const responseData = await response.json();

        expect(response.status).toBe(500);
        expect(responseData.error).toBe('Internal server error');
      });
    });

    describe('Environment Configuration', () => {
      it('should use default values for missing environment variables', async () => {
        delete process.env.RATE_LIMIT_MAX;
        delete process.env.CONTACT_EMAIL;

        const request = createMockRequest();
        
        await POST(request);

        // Should use SMTP_USER as fallback for CONTACT_EMAIL
        const [ownerEmailCall] = mockTransporter.sendMail.mock.calls;
        expect(ownerEmailCall[0].to).toBe(process.env.SMTP_USER);
      });

      it('should handle custom SMTP configuration', async () => {
        process.env.SMTP_HOST = 'custom-smtp.example.com';
        process.env.SMTP_PORT = '465';

        const request = createMockRequest();
        
        await POST(request);

        expect(nodemailer.createTransporter).toHaveBeenCalledWith({
          host: 'custom-smtp.example.com',
          port: 465,
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
      });
    });
  });

  describe('HTTP Method Restrictions', () => {
    it('should reject GET requests', async () => {
      const response = await GET();
      const responseData = await response.json();

      expect(response.status).toBe(405);
      expect(responseData.error).toBe('Method not allowed');
    });

    it('should reject PUT requests', async () => {
      const response = await PUT();
      const responseData = await response.json();

      expect(response.status).toBe(405);
      expect(responseData.error).toBe('Method not allowed');
    });

    it('should reject DELETE requests', async () => {
      const response = await DELETE();
      const responseData = await response.json();

      expect(response.status).toBe(405);
      expect(responseData.error).toBe('Method not allowed');
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete successful workflow', async () => {
      const request = createMockRequest(validRequestData);
      
      const response = await POST(request);
      const responseData = await response.json();

      // Verify all steps executed correctly
      expect(mockRateLimiter.consume).toHaveBeenCalledWith('127.0.0.1');
      expect(validator.isEmail).toHaveBeenCalledWith('john@example.com');
      expect(sanitizeHtml).toHaveBeenCalled();
      expect(mockTransporter.verify).toHaveBeenCalled();
      expect(mockTransporter.sendMail).toHaveBeenCalledTimes(2);
      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
    });

    it('should handle multiple validation errors', async () => {
      const invalidData = {
        name: 'J', // Too short
        email: 'invalid-email', // Invalid format
        message: 'Short', // Too short
        honeypot: 'spam', // Should be empty
      };

      validator.isEmail.mockReturnValue(false);
      
      const request = createMockRequest(invalidData);
      
      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.errors).toHaveLength(4);
      expect(responseData.errors).toContain('Name must be at least 2 characters long');
      expect(responseData.errors).toContain('Invalid email format');
      expect(responseData.errors).toContain('Message must be at least 10 characters long');
      expect(responseData.errors).toContain('Spam detected');
    });
  });

  describe('Security Tests', () => {
    it('should prevent XSS attacks in email templates', async () => {
      const maliciousData = {
        name: '<script>alert("xss")</script>',
        email: 'test@example.com',
        message: 'Message with <img src=x onerror=alert(1)> image',
        honeypot: '',
      };

      // Mock sanitizer to remove scripts but keep safe content
      sanitizeHtml.mockImplementation((input) => 
        input.replace(/<script[^>]*>.*?<\/script>/gi, '')
             .replace(/<img[^>]*>/gi, '')
      );

      const request = createMockRequest(maliciousData);
      
      await POST(request);

      // Verify sanitization was called
      expect(sanitizeHtml).toHaveBeenCalledWith(maliciousData.name, {
        allowedTags: [],
        allowedAttributes: {},
      });
    });

    it('should handle SQL injection attempts gracefully', async () => {
      const sqlInjectionData = {
        name: "'; DROP TABLE users; --",
        email: 'test@example.com',
        message: "1' OR '1'='1'; DELETE FROM contacts;",
        honeypot: '',
      };

      const request = createMockRequest(sqlInjectionData);
      
      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(sanitizeHtml).toHaveBeenCalled();
    });
  });
});