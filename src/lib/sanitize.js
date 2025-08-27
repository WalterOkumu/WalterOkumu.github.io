/**
 * Input sanitization utilities for form security
 * Prevents XSS attacks and validates user input
 */

/**
 * Sanitize text input by removing HTML tags and encoding special characters
 * @param {string} input - Raw input string
 * @returns {string} - Sanitized string
 */
export const sanitizeText = (input) => {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    .trim()
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Encode HTML entities
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    // Remove null bytes and other control characters
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Limit length to prevent buffer overflow attacks
    .substring(0, 10000);
};

/**
 * Sanitize email input with strict validation
 * @param {string} email - Raw email string
 * @returns {string} - Sanitized email string
 */
export const sanitizeEmail = (email) => {
  if (typeof email !== 'string') {
    return '';
  }
  
  return email
    .trim()
    .toLowerCase()
    // Remove potentially harmful characters
    .replace(/[<>()[\]\\,;:\s@"]/g, (match) => {
      // Keep only @ and . for valid email format
      return match === '@' || match === '.' ? match : '';
    })
    // Limit length
    .substring(0, 254); // RFC 5321 limit
};

/**
 * Sanitize textarea/message input while preserving basic formatting
 * @param {string} message - Raw message string
 * @returns {string} - Sanitized message string
 */
export const sanitizeMessage = (message) => {
  if (typeof message !== 'string') {
    return '';
  }
  
  return message
    .trim()
    // Remove script tags and dangerous HTML
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/<link\b[^<]*>/gi, '')
    .replace(/<meta\b[^<]*>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    // Remove event handlers
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/on\w+\s*=\s*[^\s>]+/gi, '')
    // Remove javascript: protocol
    .replace(/javascript:/gi, '')
    // Remove data: protocol (potential for data URI XSS)
    .replace(/data:/gi, '')
    // Encode remaining HTML entities for safety
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    // Remove null bytes and control characters
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Limit length to prevent resource exhaustion
    .substring(0, 50000);
};

/**
 * Sanitize URL input
 * @param {string} url - Raw URL string
 * @returns {string} - Sanitized URL string
 */
export const sanitizeUrl = (url) => {
  if (typeof url !== 'string') {
    return '';
  }
  
  const trimmedUrl = url.trim();
  
  // Only allow http and https protocols
  if (!trimmedUrl.match(/^https?:\/\//i)) {
    return '';
  }
  
  try {
    const urlObj = new URL(trimmedUrl);
    // Additional validation could go here
    return urlObj.href;
  } catch {
    return '';
  }
};

/**
 * Sanitize phone number input
 * @param {string} phone - Raw phone string
 * @returns {string} - Sanitized phone string
 */
export const sanitizePhone = (phone) => {
  if (typeof phone !== 'string') {
    return '';
  }
  
  return phone
    .trim()
    // Keep only numbers, spaces, hyphens, parentheses, and + sign
    .replace(/[^0-9\s\-\(\)\+]/g, '')
    // Limit length
    .substring(0, 50);
};

/**
 * Comprehensive form data sanitization
 * @param {object} formData - Form data object
 * @returns {object} - Sanitized form data object
 */
export const sanitizeFormData = (formData) => {
  const sanitized = {};
  
  for (const [key, value] of Object.entries(formData)) {
    switch (key) {
      case 'email':
        sanitized[key] = sanitizeEmail(value);
        break;
      case 'message':
      case 'description':
      case 'content':
        sanitized[key] = sanitizeMessage(value);
        break;
      case 'url':
      case 'website':
      case 'link':
        sanitized[key] = sanitizeUrl(value);
        break;
      case 'phone':
      case 'telephone':
      case 'mobile':
        sanitized[key] = sanitizePhone(value);
        break;
      default:
        sanitized[key] = sanitizeText(value);
        break;
    }
  }
  
  return sanitized;
};

/**
 * Validate sanitized data against expected patterns
 * @param {object} data - Sanitized data object
 * @returns {object} - Validation result with errors
 */
export const validateSanitizedData = (data) => {
  const errors = {};
  
  // Email validation
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format after sanitization';
  }
  
  // Message length validation after sanitization
  if (data.message && data.message.length < 10) {
    errors.message = 'Message too short after sanitization';
  }
  
  // Name validation (no numbers, reasonable length)
  if (data.name) {
    if (data.name.length < 2) {
      errors.name = 'Name too short';
    }
    if (data.name.length > 100) {
      errors.name = 'Name too long';
    }
    if (/^\d+$/.test(data.name)) {
      errors.name = 'Name cannot be only numbers';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const SanitizationUtils = {
  sanitizeText,
  sanitizeEmail,
  sanitizeMessage,
  sanitizeUrl,
  sanitizePhone,
  sanitizeFormData,
  validateSanitizedData
};

export default SanitizationUtils;