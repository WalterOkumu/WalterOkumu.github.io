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

// Helper functions for testing
const createMockRequest = (body, headers = {}) => ({
  json: jest.fn().mockResolvedValue(body),
  headers: {
    get: jest.fn((key) => headers[key] || null),
  },
});

const validRequestData = {
  name: 'John Doe',
  email: 'john@example.com',
  company: 'Test Company',
  message: 'This is a test message',
  honeypot: '',
};

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
    it('should successfully process a valid contact form submission', async () => {
      const request = createMockRequest(validRequestData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toContain('sent successfully');
      expect(mockTransporter.sendMail).toHaveBeenCalledTimes(2); // Owner email + auto-reply
    });

    it('should handle missing required fields', async () => {
      const invalidData = { name: '', email: '', message: '' };
      const request = createMockRequest(invalidData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.errors).toContain('Name is required');
      expect(data.errors).toContain('Email is required');
      expect(data.errors).toContain('Message is required');
    });

    it('should handle invalid email format', async () => {
      const invalidData = { ...validRequestData, email: 'invalid-email' };
      const request = createMockRequest(invalidData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.errors).toContain('Invalid email format');
    });

    it('should handle honeypot spam detection', async () => {
      const spamData = { ...validRequestData, honeypot: 'spam' };
      const request = createMockRequest(spamData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.errors).toContain('Spam detected');
    });

    it('should handle rate limiting', async () => {
      mockRateLimiter.consume.mockRejectedValueOnce({ msBeforeNext: 3600000 });
      const request = createMockRequest(validRequestData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(429);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Too many requests');
    });

    it('should handle SMTP connection failure', async () => {
      mockTransporter.verify.mockRejectedValueOnce(new Error('SMTP connection failed'));
      const request = createMockRequest(validRequestData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Email service unavailable');
    });

    it('should handle missing SMTP credentials', async () => {
      delete process.env.SMTP_USER;
      const request = createMockRequest(validRequestData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Email service not configured');
    });

    it('should handle email sending failure', async () => {
      mockTransporter.sendMail.mockRejectedValueOnce(new Error('Email sending failed'));
      const request = createMockRequest(validRequestData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Failed to send message');
    });

    it('should handle invalid JSON in request body', async () => {
      const request = {
        json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
        headers: { get: jest.fn() },
      };
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Invalid JSON data');
    });

    it('should sanitize input data', async () => {
      const maliciousData = {
        ...validRequestData,
        name: '<script>alert("xss")</script>John',
        message: '<img src="x" onerror="alert(1)">Test message',
      };
      const request = createMockRequest(maliciousData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(sanitizeHtml).toHaveBeenCalledWith('<script>alert("xss")</script>John', {
        allowedTags: [],
        allowedAttributes: {},
      });
    });

    it('should validate message length limits', async () => {
      const longMessage = 'a'.repeat(2001);
      const invalidData = { ...validRequestData, message: longMessage };
      const request = createMockRequest(invalidData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.errors).toContain('Message must be less than 2000 characters');
    });

    it('should validate name length limits', async () => {
      const longName = 'a'.repeat(101);
      const invalidData = { ...validRequestData, name: longName };
      const request = createMockRequest(invalidData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.errors).toContain('Name must be less than 100 characters');
    });

    it('should handle company field as optional', async () => {
      const dataWithoutCompany = { ...validRequestData };
      delete dataWithoutCompany.company;
      const request = createMockRequest(dataWithoutCompany);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should normalize email addresses', async () => {
      const request = createMockRequest({ ...validRequestData, email: 'JOHN@EXAMPLE.COM' });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(validator.normalizeEmail).toHaveBeenCalledWith('JOHN@EXAMPLE.COM');
    });
  });

  describe('Unsupported HTTP methods', () => {
    it('should return 405 for GET requests', async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.error).toBe('Method not allowed');
    });

    it('should return 405 for PUT requests', async () => {
      const response = await PUT();
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.error).toBe('Method not allowed');
    });

    it('should return 405 for DELETE requests', async () => {
      const response = await DELETE();
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.error).toBe('Method not allowed');
    });
  });
});
