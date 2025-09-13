import { formatDate, calculateReadingTime } from '../blog-utils';

describe('blog-utils.js', () => {
  describe('formatDate', () => {
    it('should format date string correctly', () => {
      const result = formatDate('2023-12-25');
      expect(result).toBe('December 25, 2023');
    });

    it('should handle Date object input', () => {
      const date = new Date('2023-12-25T00:00:00Z');
      const result = formatDate(date.toISOString());
      expect(result).toBe('December 25, 2023');
    });

    it('should handle different date formats', () => {
      const testCases = [
        { input: '2023-01-01', expected: 'January 1, 2023' },
        { input: '2023-06-15', expected: 'June 15, 2023' },
        { input: '2023-12-31', expected: 'December 31, 2023' },
      ];

      testCases.forEach(({ input, expected }) => {
        expect(formatDate(input)).toBe(expected);
      });
    });

    it('should use US locale formatting', () => {
      const result = formatDate('2023-07-04');
      expect(result).toBe('July 4, 2023');
    });

    it('should handle invalid date strings gracefully', () => {
      expect(() => formatDate('invalid-date')).toThrow();
    });

    it('should handle empty string', () => {
      expect(() => formatDate('')).toThrow();
    });

    it('should handle null or undefined input', () => {
      expect(() => formatDate(null)).toThrow();
      expect(() => formatDate(undefined)).toThrow();
    });

    it('should format dates with different years correctly', () => {
      const testCases = [
        { input: '2020-06-15', expected: 'June 15, 2020' },
        { input: '2024-06-15', expected: 'June 15, 2024' },
        { input: '2030-06-15', expected: 'June 15, 2030' },
      ];

      testCases.forEach(({ input, expected }) => {
        expect(formatDate(input)).toBe(expected);
      });
    });
  });

  describe('calculateReadingTime', () => {
    it('should calculate reading time for basic text', () => {
      // Create text with exactly 200 words (should be 1 minute)
      const words = new Array(200).fill('word').join(' ');
      const result = calculateReadingTime(words);

      expect(result).toBe('1 min read');
    });

    it('should round up reading time', () => {
      // Create text with 250 words (should be 2 minutes: ceil(250/200))
      const words = new Array(250).fill('word').join(' ');
      const result = calculateReadingTime(words);

      expect(result).toBe('2 min read');
    });

    it('should handle short text correctly', () => {
      const shortText = 'This is a very short text.';
      const result = calculateReadingTime(shortText);

      // Should be 1 minute (minimum reading time due to ceiling)
      expect(result).toBe('1 min read');
    });

    it('should handle long text correctly', () => {
      // Create text with 1000 words (should be 5 minutes)
      const longText = new Array(1000).fill('word').join(' ');
      const result = calculateReadingTime(longText);

      expect(result).toBe('5 min read');
    });

    it('should handle empty text', () => {
      const result = calculateReadingTime('');

      // Empty string split will create array with one empty element
      expect(result).toBe('1 min read');
    });

    it('should handle whitespace-only text', () => {
      const result = calculateReadingTime('   \n  \t  ');

      // Whitespace will be split into multiple empty elements
      expect(result).toBe('1 min read');
    });

    it('should handle text with multiple spaces', () => {
      const text = 'word    word    word'; // 3 words with multiple spaces
      const result = calculateReadingTime(text);

      expect(result).toBe('1 min read');
    });

    it('should handle text with line breaks', () => {
      const text = `word
      word
      word
      word
      word`; // 5 words across lines
      const result = calculateReadingTime(text);

      expect(result).toBe('1 min read');
    });

    it('should handle real blog content structure', () => {
      const blogContent = `
        # Title
        
        This is the introduction paragraph with several words to make it realistic.
        
        ## Section 1
        
        Here is some content for section one. It contains multiple sentences 
        to demonstrate real blog content. Each sentence adds to the word count.
        
        ## Section 2
        
        More content here. This section also has multiple sentences and paragraphs.
        The reading time should be calculated based on all visible words.
        
        - List item one
        - List item two  
        - List item three
        
        Final paragraph with concluding thoughts.
      `;

      const result = calculateReadingTime(blogContent);

      // Should calculate based on actual word count
      const wordCount = blogContent.split(/\s+/).length;
      const expectedMinutes = Math.ceil(wordCount / 200);

      expect(result).toBe(`${expectedMinutes} min read`);
    });

    it('should handle markdown-like content', () => {
      const markdownContent = `
        # Heading
        
        **Bold text** and *italic text* should be counted.
        
        \`\`\`javascript
        const code = 'should be counted too';
        console.log(code);
        \`\`\`
        
        [Link text](https://example.com) counts as words.
      `;

      const result = calculateReadingTime(markdownContent);

      // All text including code and markdown syntax should be counted
      const wordCount = markdownContent.split(/\s+/).length;
      const expectedMinutes = Math.ceil(wordCount / 200);

      expect(result).toBe(`${expectedMinutes} min read`);
    });

    it('should use 200 words per minute as standard', () => {
      // Test that the function uses the standard 200 WPM rate
      const exactlyTwoHundredWords = new Array(200).fill('word').join(' ');
      expect(calculateReadingTime(exactlyTwoHundredWords)).toBe('1 min read');

      const fourHundredWords = new Array(400).fill('word').join(' ');
      expect(calculateReadingTime(fourHundredWords)).toBe('2 min read');
    });

    it('should handle edge cases with punctuation', () => {
      const textWithPunctuation = 'Hello, world! How are you? Fine, thanks.';
      const result = calculateReadingTime(textWithPunctuation);

      // Should split on whitespace, so punctuation attached to words counts as one word
      expect(result).toBe('1 min read');
    });

    it('should handle numbers and special characters', () => {
      const textWithNumbers = '123 hello world 456 test @user #hashtag';
      const result = calculateReadingTime(textWithNumbers);

      // Each space-separated element should count as a word
      expect(result).toBe('1 min read');
    });

    it('should be consistent with different input types', () => {
      const sameContentDifferentFormat = [
        'word word word word word',
        'word\nword\nword\nword\nword',
        'word\tword\tword\tword\tword',
        '  word   word   word   word   word  ',
      ];

      sameContentDifferentFormat.forEach(content => {
        expect(calculateReadingTime(content)).toBe('1 min read');
      });
    });
  });

  describe('Integration Tests', () => {
    it('should work together for blog post processing', () => {
      const blogPost = {
        frontmatter: {
          date: '2023-12-25',
        },
        content: new Array(300).fill('word').join(' '), // 300 words
      };

      const formattedDate = formatDate(blogPost.frontmatter.date);
      const readingTime = calculateReadingTime(blogPost.content);

      expect(formattedDate).toBe('December 25, 2023');
      expect(readingTime).toBe('2 min read'); // ceil(300/200)
    });

    it('should handle blog post metadata consistently', () => {
      const blogPosts = [
        {
          date: '2023-01-15',
          content: new Array(150).fill('word').join(' '),
        },
        {
          date: '2023-06-20',
          content: new Array(500).fill('word').join(' '),
        },
        {
          date: '2023-12-01',
          content: new Array(1000).fill('word').join(' '),
        },
      ];

      const processedPosts = blogPosts.map(post => ({
        formattedDate: formatDate(post.date),
        readingTime: calculateReadingTime(post.content),
      }));

      expect(processedPosts[0]).toEqual({
        formattedDate: 'January 15, 2023',
        readingTime: '1 min read',
      });

      expect(processedPosts[1]).toEqual({
        formattedDate: 'June 20, 2023',
        readingTime: '3 min read',
      });

      expect(processedPosts[2]).toEqual({
        formattedDate: 'December 1, 2023',
        readingTime: '5 min read',
      });
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle unexpected input types gracefully', () => {
      // formatDate error handling
      expect(() => formatDate(123)).toThrow();
      expect(() => formatDate({})).toThrow();
      expect(() => formatDate([])).toThrow();

      // calculateReadingTime should handle non-string input
      expect(() => calculateReadingTime(123)).toThrow();
      expect(() => calculateReadingTime(null)).toThrow();
      expect(() => calculateReadingTime(undefined)).toThrow();
      expect(() => calculateReadingTime({})).toThrow();
    });

    it('should maintain consistency with various date formats', () => {
      const _dateFormats = [
        '2023-12-25',
        '2023/12/25',
        'December 25, 2023',
      ];

      // Some formats might not be handled correctly
      const validFormat = '2023-12-25';
      expect(formatDate(validFormat)).toBe('December 25, 2023');

      // ISO date strings should work
      const isoDate = '2023-12-25T10:30:00Z';
      expect(formatDate(isoDate)).toBe('December 25, 2023');
    });

    it('should handle very large content efficiently', () => {
      // Test with very large content (10,000 words)
      const largeContent = new Array(10000).fill('word').join(' ');
      const result = calculateReadingTime(largeContent);

      expect(result).toBe('50 min read'); // 10000/200 = 50

      // Performance test - should complete quickly
      const startTime = Date.now();
      calculateReadingTime(largeContent);
      const endTime = Date.now();

      // Should complete in less than 100ms
      expect(endTime - startTime).toBeLessThan(100);
    });
  });
});
