import {
  cn,
  formatDate,
  calculateReadingTime,
  slugify,
  debounce,
  throttle,
  truncate,
  capitalize,
  formatNumber,
  isEmpty,
  deepClone,
  generateId,
  isClient,
  safeJsonParse,
  get,
  isValidEmail,
  isValidUrl,
  scrollToElement,
  copyToClipboard,
  delay,
  retryWithBackoff,
} from '../utils';

// Mock DOM methods and browser APIs
Object.defineProperty(document, 'createElement', {
  value: jest.fn(() => ({
    value: '',
    style: {},
    focus: jest.fn(),
    select: jest.fn(),
    remove: jest.fn(),
  })),
});

Object.defineProperty(document, 'body', {
  value: {
    appendChild: jest.fn(),
  },
});

Object.defineProperty(document, 'execCommand', {
  value: jest.fn(() => true),
});

Object.defineProperty(document, 'querySelector', {
  value: jest.fn(),
});

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn(() => Promise.resolve()),
  },
  writable: true,
});

Object.defineProperty(window, 'isSecureContext', {
  value: true,
  writable: true,
});

describe('utils.js', () => {
  describe('cn', () => {
    it('should combine class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('should handle conditional classes', () => {
      expect(cn('base', true && 'conditional', false && 'ignored')).toBe('base conditional');
    });

    it('should merge Tailwind classes', () => {
      expect(cn('p-2', 'p-4')).toBe('p-4');
    });

    it('should handle empty inputs', () => {
      expect(cn()).toBe('');
      expect(cn('', null, undefined)).toBe('');
    });
  });

  describe('formatDate', () => {
    it('should format a Date object correctly', () => {
      const date = new Date('2023-12-25');
      const formatted = formatDate(date);
      expect(formatted).toBe('December 25, 2023');
    });

    it('should format a date string correctly', () => {
      const formatted = formatDate('2023-12-25');
      expect(formatted).toBe('December 25, 2023');
    });

    it('should accept custom options', () => {
      const date = new Date('2023-12-25');
      const formatted = formatDate(date, { month: 'short', day: '2-digit' });
      expect(formatted).toBe('Dec 25, 2023');
    });

    it('should handle invalid dates gracefully', () => {
      expect(() => formatDate('invalid-date')).toThrow();
    });
  });

  describe('calculateReadingTime', () => {
    it('should calculate reading time correctly', () => {
      const text = 'This is a sample text with exactly ten words here.';
      const result = calculateReadingTime(text);
      
      expect(result.words).toBe(10);
      expect(result.minutes).toBe(1); // Ceiling of 10/200 = 1
      expect(result.text).toBe('1 min read');
    });

    it('should handle custom words per minute', () => {
      const text = 'word '.repeat(100).trim(); // 100 words
      const result = calculateReadingTime(text, 50);
      
      expect(result.words).toBe(100);
      expect(result.minutes).toBe(2); // Ceiling of 100/50 = 2
      expect(result.text).toBe('2 min read');
    });

    it('should handle empty text', () => {
      const result = calculateReadingTime('');
      expect(result.words).toBe(1); // Empty string split gives one empty element
      expect(result.minutes).toBe(1);
    });

    it('should handle whitespace-only text', () => {
      const result = calculateReadingTime('   \n  \t  ');
      expect(result.words).toBe(0); // After trim, empty string
      expect(result.minutes).toBe(0);
    });
  });

  describe('slugify', () => {
    it('should convert text to URL-friendly slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('should handle special characters', () => {
      expect(slugify('Hello, World! How are you?')).toBe('hello-world-how-are-you');
    });

    it('should handle multiple spaces and underscores', () => {
      expect(slugify('hello   world___test')).toBe('hello-world-test');
    });

    it('should remove leading and trailing hyphens', () => {
      expect(slugify('---hello world---')).toBe('hello-world');
    });

    it('should handle empty string', () => {
      expect(slugify('')).toBe('');
    });

    it('should handle unicode characters', () => {
      expect(slugify('café résumé')).toBe('caf-rsum');
    });
  });

  describe('debounce', () => {
    jest.useFakeTimers();

    afterEach(() => {
      jest.clearAllTimers();
    });

    it('should delay function execution', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 1000);

      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1000);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should cancel previous calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 1000);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      jest.advanceTimersByTime(1000);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should execute immediately if specified', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 1000, true);

      debouncedFn();
      expect(mockFn).toHaveBeenCalledTimes(1);

      debouncedFn();
      expect(mockFn).toHaveBeenCalledTimes(1); // Should not call again immediately
    });

    it('should pass arguments correctly', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 1000);

      debouncedFn('arg1', 'arg2');
      jest.advanceTimersByTime(1000);
      
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
    });
  });

  describe('throttle', () => {
    jest.useFakeTimers();

    afterEach(() => {
      jest.clearAllTimers();
    });

    it('should limit function execution frequency', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 1000);

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);

      throttledFn();
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1); // Should not call again immediately

      jest.advanceTimersByTime(1000);
      expect(mockFn).toHaveBeenCalledTimes(2); // Should call the queued execution
    });

    it('should pass arguments correctly', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 1000);

      throttledFn('arg1', 'arg2');
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
    });
  });

  describe('truncate', () => {
    it('should truncate text to specified length', () => {
      const text = 'This is a long text that should be truncated';
      expect(truncate(text, 20)).toBe('This is a long text...');
    });

    it('should not truncate if text is shorter than limit', () => {
      const text = 'Short text';
      expect(truncate(text, 20)).toBe('Short text');
    });

    it('should use custom suffix', () => {
      const text = 'This is a long text';
      expect(truncate(text, 10, '---')).toBe('This is a---');
    });

    it('should handle edge cases', () => {
      expect(truncate('', 10)).toBe('');
      expect(truncate('test', 0)).toBe('...');
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should lowercase the rest', () => {
      expect(capitalize('hELLO')).toBe('Hello');
    });

    it('should handle single character', () => {
      expect(capitalize('a')).toBe('A');
    });

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('');
    });
  });

  describe('formatNumber', () => {
    it('should format numbers with separators', () => {
      expect(formatNumber(1234567)).toBe('1,234,567');
    });

    it('should handle decimals', () => {
      expect(formatNumber(1234.56)).toBe('1,234.56');
    });

    it('should use different locales', () => {
      expect(formatNumber(1234.56, 'de-DE')).toBe('1.234,56');
    });

    it('should handle zero', () => {
      expect(formatNumber(0)).toBe('0');
    });
  });

  describe('isEmpty', () => {
    it('should detect empty values', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty('')).toBe(true);
      expect(isEmpty('   ')).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
    });

    it('should detect non-empty values', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty([1, 2])).toBe(false);
      expect(isEmpty({ key: 'value' })).toBe(false);
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty(false)).toBe(false);
    });
  });

  describe('deepClone', () => {
    it('should clone simple objects', () => {
      const obj = { a: 1, b: 'test' };
      const cloned = deepClone(obj);
      
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
    });

    it('should clone nested objects', () => {
      const obj = { a: { b: { c: 1 } } };
      const cloned = deepClone(obj);
      
      cloned.a.b.c = 2;
      expect(obj.a.b.c).toBe(1);
    });

    it('should clone arrays', () => {
      const arr = [1, { a: 2 }, [3, 4]];
      const cloned = deepClone(arr);
      
      cloned[1].a = 5;
      cloned[2][0] = 6;
      
      expect(arr[1].a).toBe(2);
      expect(arr[2][0]).toBe(3);
    });

    it('should clone dates', () => {
      const date = new Date('2023-01-01');
      const cloned = deepClone(date);
      
      expect(cloned).toEqual(date);
      expect(cloned).not.toBe(date);
    });

    it('should handle null and primitives', () => {
      expect(deepClone(null)).toBe(null);
      expect(deepClone(123)).toBe(123);
      expect(deepClone('string')).toBe('string');
    });
  });

  describe('generateId', () => {
    it('should generate ID of default length', () => {
      const id = generateId();
      expect(id).toHaveLength(8);
      expect(typeof id).toBe('string');
    });

    it('should generate ID of custom length', () => {
      const id = generateId(12);
      expect(id).toHaveLength(12);
    });

    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });

    it('should handle edge cases', () => {
      expect(generateId(0)).toHaveLength(0);
      expect(generateId(1)).toHaveLength(1);
    });
  });

  describe('isClient', () => {
    it('should return true when window is defined', () => {
      expect(isClient()).toBe(true);
    });

    it('should return false when window is undefined', () => {
      const originalWindow = global.window;
      delete global.window;
      
      expect(isClient()).toBe(false);
      
      global.window = originalWindow;
    });
  });

  describe('safeJsonParse', () => {
    it('should parse valid JSON', () => {
      const obj = { a: 1, b: 'test' };
      const json = JSON.stringify(obj);
      expect(safeJsonParse(json)).toEqual(obj);
    });

    it('should return fallback for invalid JSON', () => {
      expect(safeJsonParse('invalid json')).toBe(null);
      expect(safeJsonParse('invalid json', 'fallback')).toBe('fallback');
    });

    it('should handle edge cases', () => {
      expect(safeJsonParse('')).toBe(null);
      expect(safeJsonParse('null')).toBe(null);
      expect(safeJsonParse('undefined')).toBe(null);
    });
  });

  describe('get', () => {
    const testObj = {
      a: {
        b: {
          c: 'value',
          d: null,
        },
      },
      arr: [1, { nested: 'item' }],
    };

    it('should get nested property', () => {
      expect(get(testObj, 'a.b.c')).toBe('value');
    });

    it('should return default value for missing property', () => {
      expect(get(testObj, 'a.b.missing', 'default')).toBe('default');
    });

    it('should handle null values in path', () => {
      expect(get(testObj, 'a.b.d.missing', 'default')).toBe('default');
    });

    it('should handle array indices', () => {
      expect(get(testObj, 'arr.0')).toBe(1);
      expect(get(testObj, 'arr.1.nested')).toBe('item');
    });

    it('should return undefined for missing property without default', () => {
      expect(get(testObj, 'missing.path')).toBeUndefined();
    });
  });

  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name+tag@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('test@domain')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('test..test@domain.com')).toBe(false);
    });
  });

  describe('isValidUrl', () => {
    it('should validate correct URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://localhost:3000')).toBe(true);
      expect(isValidUrl('ftp://files.example.com')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('http://')).toBe(false);
      expect(isValidUrl('')).toBe(false);
    });
  });

  describe('scrollToElement', () => {
    const mockElement = {
      scrollIntoView: jest.fn(),
    };

    beforeEach(() => {
      document.querySelector = jest.fn(() => mockElement);
    });

    it('should scroll to element by selector', () => {
      scrollToElement('#target');
      
      expect(document.querySelector).toHaveBeenCalledWith('#target');
      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });

    it('should scroll to element directly', () => {
      scrollToElement(mockElement);
      expect(mockElement.scrollIntoView).toHaveBeenCalled();
    });

    it('should use custom options', () => {
      scrollToElement('#target', { block: 'center' });
      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'center',
      });
    });

    it('should handle missing element gracefully', () => {
      document.querySelector = jest.fn(() => null);
      expect(() => scrollToElement('#missing')).not.toThrow();
    });
  });

  describe('copyToClipboard', () => {
    beforeEach(() => {
      navigator.clipboard.writeText.mockClear();
      document.createElement.mockClear();
      document.execCommand.mockClear();
    });

    it('should use clipboard API when available', async () => {
      navigator.clipboard.writeText.mockResolvedValue(undefined);
      
      const result = await copyToClipboard('test text');
      
      expect(result).toBe(true);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
    });

    it('should fall back to execCommand when clipboard API unavailable', async () => {
      // Make clipboard API unavailable
      Object.defineProperty(navigator, 'clipboard', { value: null });
      Object.defineProperty(window, 'isSecureContext', { value: false });
      
      document.execCommand.mockReturnValue(true);
      
      const result = await copyToClipboard('test text');
      
      expect(result).toBe(true);
      expect(document.createElement).toHaveBeenCalledWith('textarea');
      expect(document.execCommand).toHaveBeenCalledWith('copy');
    });

    it('should handle errors gracefully', async () => {
      navigator.clipboard.writeText.mockRejectedValue(new Error('Failed'));
      
      const result = await copyToClipboard('test text');
      
      expect(result).toBe(false);
    });
  });

  describe('delay', () => {
    jest.useFakeTimers();

    it('should create a promise that resolves after specified time', async () => {
      const promise = delay(1000);
      
      jest.advanceTimersByTime(999);
      expect(promise).toBe(promise); // Still pending
      
      jest.advanceTimersByTime(1);
      await expect(promise).resolves.toBeUndefined();
    });
  });

  describe('retryWithBackoff', () => {
    jest.useFakeTimers();

    it('should resolve immediately on first success', async () => {
      const mockFn = jest.fn().mockResolvedValue('success');
      
      const result = await retryWithBackoff(mockFn);
      
      expect(result).toBe('success');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should retry on failure with exponential backoff', async () => {
      const mockFn = jest.fn()
        .mockRejectedValueOnce(new Error('fail1'))
        .mockRejectedValueOnce(new Error('fail2'))
        .mockResolvedValue('success');
      
      const promise = retryWithBackoff(mockFn, 3, 100);
      
      // Fast forward through the delays
      await jest.runAllTimersAsync();
      
      const result = await promise;
      expect(result).toBe('success');
      expect(mockFn).toHaveBeenCalledTimes(3);
    });

    it('should throw last error when max retries exceeded', async () => {
      const error = new Error('final error');
      const mockFn = jest.fn().mockRejectedValue(error);
      
      const promise = retryWithBackoff(mockFn, 2, 100);
      
      await jest.runAllTimersAsync();
      
      await expect(promise).rejects.toThrow('final error');
      expect(mockFn).toHaveBeenCalledTimes(3); // Initial call + 2 retries
    });
  });
});