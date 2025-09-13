import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import BlogCard from '../BlogCard';

// Extend Jest matchers for accessibility testing
expect.extend(toHaveNoViolations);

// Mock Next.js components
jest.mock('next/image', () => {
  return function MockedImage({ src, alt, fill, className }) {
    return (
      <img 
        src={src} 
        alt={alt} 
        className={className}
        data-fill={fill}
      />
    );
  };
});

jest.mock('next/link', () => {
  return function MockedLink({ children, href, ...props }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Mock blog-utils
jest.mock('@/lib/blog-utils', () => ({
  formatDate: jest.fn((date) => new Date(date).toLocaleDateString()),
}));

describe('BlogCard Component', () => {
  const mockPost = {
    slug: 'test-blog-post',
    frontmatter: {
      title: 'Test Blog Post Title',
      date: '2023-12-25',
      excerpt: 'This is a test excerpt for the blog post that describes the content.',
      category: 'Technology',
      tags: ['react', 'nextjs', 'testing'],
      author: 'John Doe',
      readingTime: '5 min read',
      image: '/images/test-blog.jpg',
    },
  };

  describe('Rendering', () => {
    it('should render blog card with all content', () => {
      render(<BlogCard post={mockPost} />);
      
      expect(screen.getByRole('article')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Blog Post Title');
      expect(screen.getByText('This is a test excerpt')).toBeInTheDocument();
      expect(screen.getByText('Technology')).toBeInTheDocument();
      expect(screen.getByText('5 min read')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should render blog image when provided', () => {
      render(<BlogCard post={mockPost} />);
      
      const image = screen.getByAltText('Test Blog Post Title');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/images/test-blog.jpg');
      expect(image).toHaveClass('object-cover');
    });

    it('should not render image container when no image provided', () => {
      const postWithoutImage = {
        ...mockPost,
        frontmatter: {
          ...mockPost.frontmatter,
          image: null,
        },
      };
      
      render(<BlogCard post={postWithoutImage} />);
      
      const imageContainer = document.querySelector('.aspect-video');
      expect(imageContainer).not.toBeInTheDocument();
    });

    it('should render category badge', () => {
      render(<BlogCard post={mockPost} />);
      
      const categoryBadge = screen.getByText('Technology');
      expect(categoryBadge).toHaveClass('bg-blue-100', 'text-blue-800', 'px-3', 'py-1', 'rounded-full');
    });

    it('should render reading time', () => {
      render(<BlogCard post={mockPost} />);
      
      const readingTime = screen.getByText('5 min read');
      expect(readingTime).toHaveClass('text-gray-500');
    });

    it('should render title as link', () => {
      render(<BlogCard post={mockPost} />);
      
      const titleLink = screen.getByRole('link', { name: 'Test Blog Post Title' });
      expect(titleLink).toHaveAttribute('href', '/blog/test-blog-post');
      expect(titleLink).toHaveClass('hover:text-blue-600');
    });

    it('should render excerpt with proper styling', () => {
      render(<BlogCard post={mockPost} />);
      
      const excerpt = screen.getByText(/This is a test excerpt/);
      expect(excerpt).toHaveClass('text-gray-600', 'mb-4', 'line-clamp-3');
    });
  });

  describe('Tags Rendering', () => {
    it('should render tags when provided', () => {
      render(<BlogCard post={mockPost} />);
      
      expect(screen.getByText('react')).toBeInTheDocument();
      expect(screen.getByText('nextjs')).toBeInTheDocument();
      expect(screen.getByText('testing')).toBeInTheDocument();
      
      mockPost.frontmatter.tags.forEach(tag => {
        const tagElement = screen.getByText(tag);
        expect(tagElement).toHaveClass('text-xs', 'bg-gray-100', 'text-gray-700', 'px-2', 'py-1', 'rounded');
      });
    });

    it('should limit tags display to first 3 tags', () => {
      const postWithManyTags = {
        ...mockPost,
        frontmatter: {
          ...mockPost.frontmatter,
          tags: ['react', 'nextjs', 'testing', 'javascript', 'frontend'],
        },
      };
      
      render(<BlogCard post={postWithManyTags} />);
      
      // Should show first 3 tags
      expect(screen.getByText('react')).toBeInTheDocument();
      expect(screen.getByText('nextjs')).toBeInTheDocument();
      expect(screen.getByText('testing')).toBeInTheDocument();
      
      // Should not show 4th and 5th tags directly
      expect(screen.queryByText('javascript')).not.toBeInTheDocument();
      expect(screen.queryByText('frontend')).not.toBeInTheDocument();
      
      // Should show "+2 more" indicator
      expect(screen.getByText('+2 more')).toBeInTheDocument();
    });

    it('should not render tags section when no tags provided', () => {
      const postWithoutTags = {
        ...mockPost,
        frontmatter: {
          ...mockPost.frontmatter,
          tags: [],
        },
      };
      
      render(<BlogCard post={postWithoutTags} />);
      
      const tagsContainer = document.querySelector('.flex.flex-wrap.gap-2.mb-4');
      expect(tagsContainer).not.toBeInTheDocument();
    });

    it('should not render tags section when tags is null/undefined', () => {
      const postWithNullTags = {
        ...mockPost,
        frontmatter: {
          ...mockPost.frontmatter,
          tags: null,
        },
      };
      
      render(<BlogCard post={postWithNullTags} />);
      
      const tagsContainer = document.querySelector('.flex.flex-wrap.gap-2.mb-4');
      expect(tagsContainer).not.toBeInTheDocument();
    });

    it('should handle exactly 3 tags without "more" indicator', () => {
      const postWithThreeTags = {
        ...mockPost,
        frontmatter: {
          ...mockPost.frontmatter,
          tags: ['react', 'nextjs', 'testing'],
        },
      };
      
      render(<BlogCard post={postWithThreeTags} />);
      
      expect(screen.getByText('react')).toBeInTheDocument();
      expect(screen.getByText('nextjs')).toBeInTheDocument();
      expect(screen.getByText('testing')).toBeInTheDocument();
      expect(screen.queryByText(/\+\d+ more/)).not.toBeInTheDocument();
    });
  });

  describe('Author Section', () => {
    it('should render author information', () => {
      render(<BlogCard post={mockPost} />);
      
      const authorName = screen.getByText('John Doe');
      expect(authorName).toHaveClass('text-sm', 'font-medium', 'text-gray-900');
      
      const authorDate = screen.getByText('12/25/2023'); // Mocked format
      expect(authorDate).toHaveClass('text-xs', 'text-gray-500');
    });

    it('should render author initials avatar', () => {
      render(<BlogCard post={mockPost} />);
      
      const authorInitials = screen.getByText('JD'); // John Doe -> JD
      expect(authorInitials).toHaveClass('text-white', 'text-sm', 'font-medium');
      
      const avatar = authorInitials.closest('div');
      expect(avatar).toHaveClass('w-8', 'h-8', 'bg-blue-500', 'rounded-full');
    });

    it('should handle single name for initials', () => {
      const postWithSingleName = {
        ...mockPost,
        frontmatter: {
          ...mockPost.frontmatter,
          author: 'Walter',
        },
      };
      
      render(<BlogCard post={postWithSingleName} />);
      
      const authorInitials = screen.getByText('W');
      expect(authorInitials).toBeInTheDocument();
    });

    it('should handle multiple names for initials', () => {
      const postWithMultipleNames = {
        ...mockPost,
        frontmatter: {
          ...mockPost.frontmatter,
          author: 'John Michael Smith',
        },
      };
      
      render(<BlogCard post={postWithMultipleNames} />);
      
      const authorInitials = screen.getByText('JMS');
      expect(authorInitials).toBeInTheDocument();
    });
  });

  describe('Links and Navigation', () => {
    it('should have read more link', () => {
      render(<BlogCard post={mockPost} />);
      
      const readMoreLink = screen.getByRole('link', { name: 'Read more' });
      expect(readMoreLink).toHaveAttribute('href', '/blog/test-blog-post');
      expect(readMoreLink).toHaveClass('text-blue-600', 'hover:text-blue-800', 'font-medium', 'text-sm');
    });

    it('should have title link and read more link pointing to same URL', () => {
      render(<BlogCard post={mockPost} />);
      
      const titleLink = screen.getByRole('link', { name: 'Test Blog Post Title' });
      const readMoreLink = screen.getByRole('link', { name: 'Read more' });
      
      expect(titleLink.getAttribute('href')).toBe(readMoreLink.getAttribute('href'));
    });

    it('should generate correct blog URL from slug', () => {
      const postWithDifferentSlug = {
        ...mockPost,
        slug: 'another-test-post',
      };
      
      render(<BlogCard post={postWithDifferentSlug} />);
      
      const titleLink = screen.getByRole('link', { name: 'Test Blog Post Title' });
      expect(titleLink).toHaveAttribute('href', '/blog/another-test-post');
    });
  });

  describe('Styling and Layout', () => {
    it('should have correct card styling', () => {
      render(<BlogCard post={mockPost} />);
      
      const article = screen.getByRole('article');
      expect(article).toHaveClass(
        'bg-white',
        'rounded-lg',
        'shadow-md',
        'hover:shadow-lg',
        'transition-shadow',
        'duration-300',
        'overflow-hidden'
      );
    });

    it('should have proper content padding', () => {
      render(<BlogCard post={mockPost} />);
      
      const contentContainer = document.querySelector('.p-6');
      expect(contentContainer).toBeInTheDocument();
      expect(contentContainer).toHaveClass('p-6');
    });

    it('should have footer with border separator', () => {
      render(<BlogCard post={mockPost} />);
      
      const footer = screen.getByText('Read more').closest('.flex.items-center.justify-between');
      expect(footer).toHaveClass('pt-4', 'border-t', 'border-gray-100');
    });

    it('should have responsive image container', () => {
      render(<BlogCard post={mockPost} />);
      
      const imageContainer = document.querySelector('.aspect-video');
      expect(imageContainer).toHaveClass('aspect-video', 'relative');
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<BlogCard post={mockPost} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper semantic structure', () => {
      render(<BlogCard post={mockPost} />);
      
      const article = screen.getByRole('article');
      expect(article).toBeInTheDocument();
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it('should have descriptive alt text for image', () => {
      render(<BlogCard post={mockPost} />);
      
      const image = screen.getByAltText('Test Blog Post Title');
      expect(image).toBeInTheDocument();
    });

    it('should have accessible links', () => {
      render(<BlogCard post={mockPost} />);
      
      const titleLink = screen.getByRole('link', { name: 'Test Blog Post Title' });
      expect(titleLink).toHaveAttribute('href');
      
      const readMoreLink = screen.getByRole('link', { name: 'Read more' });
      expect(readMoreLink).toHaveAttribute('href');
    });

    it('should have proper color contrast for text elements', () => {
      render(<BlogCard post={mockPost} />);
      
      // Check that text has appropriate contrast classes
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveClass('text-gray-900');
      
      const excerpt = screen.getByText(/This is a test excerpt/);
      expect(excerpt).toHaveClass('text-gray-600');
      
      const category = screen.getByText('Technology');
      expect(category).toHaveClass('text-blue-800');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle missing frontmatter fields gracefully', () => {
      const minimalPost = {
        slug: 'minimal-post',
        frontmatter: {
          title: 'Minimal Post',
          author: 'Author',
          date: '2023-12-25',
        },
      };
      
      expect(() => render(<BlogCard post={minimalPost} />)).not.toThrow();
      expect(screen.getByText('Minimal Post')).toBeInTheDocument();
    });

    it('should handle empty strings in frontmatter', () => {
      const postWithEmptyFields = {
        ...mockPost,
        frontmatter: {
          ...mockPost.frontmatter,
          excerpt: '',
          category: '',
        },
      };
      
      render(<BlogCard post={postWithEmptyFields} />);
      
      // Should still render the structure
      expect(screen.getByRole('article')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('should handle very long titles gracefully', () => {
      const postWithLongTitle = {
        ...mockPost,
        frontmatter: {
          ...mockPost.frontmatter,
          title: 'This is a very long blog post title that should be truncated using line-clamp utility classes to prevent layout issues',
        },
      };
      
      render(<BlogCard post={postWithLongTitle} />);
      
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveClass('line-clamp-2');
      expect(title).toHaveTextContent(/This is a very long blog post title/);
    });

    it('should handle very long excerpts gracefully', () => {
      const postWithLongExcerpt = {
        ...mockPost,
        frontmatter: {
          ...mockPost.frontmatter,
          excerpt: 'This is a very long excerpt that goes on and on and should be truncated using line-clamp utility classes to prevent the card from becoming too tall and maintain consistent layout across the blog grid.',
        },
      };
      
      render(<BlogCard post={postWithLongExcerpt} />);
      
      const excerpt = screen.getByText(/This is a very long excerpt/);
      expect(excerpt).toHaveClass('line-clamp-3');
    });

    it('should handle missing or malformed slug', () => {
      const postWithEmptySlug = {
        ...mockPost,
        slug: '',
      };
      
      render(<BlogCard post={postWithEmptySlug} />);
      
      const titleLink = screen.getByRole('link', { name: 'Test Blog Post Title' });
      expect(titleLink).toHaveAttribute('href', '/blog/');
    });
  });

  describe('Data Integration', () => {
    it('should call formatDate utility correctly', () => {
      const { formatDate } = require('@/lib/blog-utils');
      
      render(<BlogCard post={mockPost} />);
      
      expect(formatDate).toHaveBeenCalledWith('2023-12-25');
    });

    it('should use all required frontmatter fields', () => {
      render(<BlogCard post={mockPost} />);
      
      // Verify all frontmatter fields are used
      expect(screen.getByText('Test Blog Post Title')).toBeInTheDocument();
      expect(screen.getByText('Technology')).toBeInTheDocument();
      expect(screen.getByText('5 min read')).toBeInTheDocument();
      expect(screen.getByText(/This is a test excerpt/)).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByAltText('Test Blog Post Title')).toBeInTheDocument();
    });

    it('should maintain data consistency across components', () => {
      render(<BlogCard post={mockPost} />);
      
      // Title should appear in both heading and image alt
      const heading = screen.getByRole('heading', { level: 2 });
      const image = screen.getByAltText('Test Blog Post Title');
      
      expect(heading).toHaveTextContent('Test Blog Post Title');
      expect(image).toHaveAttribute('alt', 'Test Blog Post Title');
    });
  });
});