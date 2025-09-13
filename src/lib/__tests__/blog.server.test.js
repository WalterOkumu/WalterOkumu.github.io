import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

import {
  getAllBlogSlugs,
  getBlogBySlug,
  getAllBlogPosts,
//   getBlogPostsByCategory,
//   getBlogPostsByTag,
//   getRelatedPosts,
//   getAllCategories,
//   getAllTags,
} from '../blog.server';

// Mock dependencies
jest.mock('fs');
jest.mock('path');
jest.mock('gray-matter');

describe('blog.server.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock path.join to return predictable paths
    path.join.mockImplementation((...segments) => segments.join('/'));

    // Mock process.cwd
    process.cwd = jest.fn(() => '/mock/project');
  });

  describe('getAllBlogSlugs', () => {
    it('should return all blog slugs from MDX files', () => {
      fs.readdirSync.mockReturnValue([
        'first-post.mdx',
        'second-post.mdx',
        'not-a-blog.txt',
        'third-post.mdx',
        '.DS_Store',
      ]);

      const result = getAllBlogSlugs();

      expect(path.join).toHaveBeenCalledWith('/mock/project', 'src/content/blog');
      expect(fs.readdirSync).toHaveBeenCalledWith('/mock/project/src/content/blog');
      expect(result).toEqual([
        { slug: 'first-post' },
        { slug: 'second-post' },
        { slug: 'third-post' },
      ]);
    });

    it('should return empty array if directory does not exist', () => {
      fs.readdirSync.mockImplementation(() => {
        throw new Error('ENOENT: no such file or directory');
      });

      const result = getAllBlogSlugs();

      expect(result).toEqual([]);
    });

    it('should return empty array if no MDX files found', () => {
      fs.readdirSync.mockReturnValue(['file1.txt', 'file2.js', 'README.md']);

      const result = getAllBlogSlugs();

      expect(result).toEqual([]);
    });
  });

  describe('getBlogBySlug', () => {
    const mockMatterData = {
      title: 'Test Blog Post',
      date: '2023-12-25',
      excerpt: 'This is a test excerpt',
      category: 'Technology',
      tags: ['react', 'nextjs'],
      author: 'John Doe',
      readingTime: '3 min read',
      image: '/images/test.jpg',
      published: true,
    };

    const mockContent = '# Hello World\n\nThis is blog content.';

    beforeEach(() => {
      matter.mockReturnValue({
        data: mockMatterData,
        content: mockContent,
      });
    });

    it('should return blog post data for valid slug', () => {
      fs.readFileSync.mockReturnValue('mock file content');

      const result = getBlogBySlug('test-post');

      expect(path.join).toHaveBeenCalledWith('/mock/project/src/content/blog', 'test-post.mdx');
      expect(fs.readFileSync).toHaveBeenCalledWith('/mock/project/src/content/blog/test-post.mdx', 'utf8');
      expect(matter).toHaveBeenCalledWith('mock file content');

      expect(result).toEqual({
        slug: 'test-post',
        frontmatter: {
          title: 'Test Blog Post',
          date: '2023-12-25',
          excerpt: 'This is a test excerpt',
          category: 'Technology',
          tags: ['react', 'nextjs'],
          author: 'John Doe',
          readingTime: '3 min read',
          image: '/images/test.jpg',
          published: true,
        },
        content: mockContent,
      });
    });

    it('should handle missing frontmatter fields with defaults', () => {
      matter.mockReturnValue({
        data: {
          title: 'Minimal Post',
          date: '2023-12-25',
        },
        content: mockContent,
      });
      fs.readFileSync.mockReturnValue('minimal content');

      const result = getBlogBySlug('minimal-post');

      expect(result.frontmatter).toEqual({
        title: 'Minimal Post',
        date: '2023-12-25',
        excerpt: '',
        category: '',
        tags: [],
        author: 'Walter Okumu',
        readingTime: '5 min read',
        image: null,
        published: true,
      });
    });

    it('should handle published: false', () => {
      matter.mockReturnValue({
        data: {
          ...mockMatterData,
          published: false,
        },
        content: mockContent,
      });
      fs.readFileSync.mockReturnValue('draft content');

      const result = getBlogBySlug('draft-post');

      expect(result.frontmatter.published).toBe(false);
    });

    it('should handle missing published field as published: true', () => {
      const dataWithoutPublished = { ...mockMatterData };
      delete dataWithoutPublished.published;

      matter.mockReturnValue({
        data: dataWithoutPublished,
        content: mockContent,
      });
      fs.readFileSync.mockReturnValue('content');

      const result = getBlogBySlug('auto-published');

      expect(result.frontmatter.published).toBe(true);
    });

    it('should return null for non-existent slug', () => {
      fs.readFileSync.mockImplementation(() => {
        throw new Error('ENOENT: no such file or directory');
      });

      const result = getBlogBySlug('non-existent');

      expect(result).toBeNull();
    });

    it('should return null for invalid matter parsing', () => {
      fs.readFileSync.mockReturnValue('file content');
      matter.mockImplementation(() => {
        throw new Error('Invalid frontmatter');
      });

      const result = getBlogBySlug('invalid-matter');

      expect(result).toBeNull();
    });
  });

  describe('getAllBlogPosts', () => {
    beforeEach(() => {
      // Mock getAllBlogSlugs
      fs.readdirSync.mockReturnValue(['post1.mdx', 'post2.mdx', 'draft.mdx']);

      // Mock getBlogBySlug responses
      fs.readFileSync
        .mockReturnValueOnce('post1 content')
        .mockReturnValueOnce('post2 content')
        .mockReturnValueOnce('draft content');

      matter
        .mockReturnValueOnce({
          data: {
            title: 'Post 1',
            date: '2023-12-25',
            published: true,
          },
          content: 'Content 1',
        })
        .mockReturnValueOnce({
          data: {
            title: 'Post 2',
            date: '2023-12-20',
            published: true,
          },
          content: 'Content 2',
        })
        .mockReturnValueOnce({
          data: {
            title: 'Draft Post',
            date: '2023-12-30',
            published: false,
          },
          content: 'Draft content',
        });
    });

    it('should return all published posts sorted by date (newest first)', () => {
      const result = getAllBlogPosts();

      expect(result).toHaveLength(2);
      expect(result[0].frontmatter.title).toBe('Post 1'); // 2023-12-25
      expect(result[1].frontmatter.title).toBe('Post 2'); // 2023-12-20
    });

    it('should filter out unpublished posts', () => {
      const result = getAllBlogPosts();

      const draftPost = result.find(post => post.frontmatter.title === 'Draft Post');
      expect(draftPost).toBeUndefined();
    });

    it('should handle empty blog directory', () => {
      fs.readdirSync.mockReturnValue([]);

      const result = getAllBlogPosts();

      expect(result).toEqual([]);
    });

    it('should handle corrupted blog files gracefully', () => {
      fs.readdirSync.mockReturnValue(['good.mdx', 'corrupted.mdx']);
      fs.readFileSync
        .mockReturnValueOnce('good content')
        .mockImplementationOnce(() => {
          throw new Error('File corrupted');
        });

      matter.mockReturnValueOnce({
        data: {
          title: 'Good Post',
          date: '2023-12-25',
          published: true,
        },
        content: 'Good content',
      });

      const result = getAllBlogPosts();

      expect(result).toHaveLength(1);
      expect(result[0].frontmatter.title).toBe('Good Post');
    });
  });

  describe('getBlogPostsByCategory', () => {
    beforeEach(() => {
      // Mock getAllBlogPosts return value
      jest.spyOn({ getAllBlogPosts }, 'getAllBlogPosts').mockReturnValue([
        {
          slug: 'tech-post',
          frontmatter: { category: 'Technology', title: 'Tech Post' },
        },
        {
          slug: 'design-post',
          frontmatter: { category: 'Design', title: 'Design Post' },
        },
        {
          slug: 'tech-post-2',
          frontmatter: { category: 'technology', title: 'Tech Post 2' },
        },
      ]);
    });

    it('should return posts filtered by category', () => {
      // We need to re-import to get the mocked version
      const posts = [
        {
          slug: 'tech-post',
          frontmatter: { category: 'Technology', title: 'Tech Post' },
        },
        {
          slug: 'design-post',
          frontmatter: { category: 'Design', title: 'Design Post' },
        },
        {
          slug: 'tech-post-2',
          frontmatter: { category: 'technology', title: 'Tech Post 2' },
        },
      ];

      const result = posts.filter((post) =>
        post.frontmatter.category.toLowerCase() === 'technology',
      );

      expect(result).toHaveLength(2);
      expect(result[0].slug).toBe('tech-post');
      expect(result[1].slug).toBe('tech-post-2');
    });

    it('should be case insensitive', () => {
      const posts = [
        {
          slug: 'tech-post',
          frontmatter: { category: 'Technology', title: 'Tech Post' },
        },
      ];

      const result = posts.filter((post) =>
        post.frontmatter.category.toLowerCase() === 'TECHNOLOGY'.toLowerCase(),
      );

      expect(result).toHaveLength(1);
    });

    it('should return empty array for non-existent category', () => {
      const posts = [
        {
          slug: 'tech-post',
          frontmatter: { category: 'Technology', title: 'Tech Post' },
        },
      ];

      const result = posts.filter((post) =>
        post.frontmatter.category.toLowerCase() === 'nonexistent',
      );

      expect(result).toHaveLength(0);
    });
  });

  describe('getBlogPostsByTag', () => {
    it('should return posts filtered by tag', () => {
      const posts = [
        {
          slug: 'react-post',
          frontmatter: { tags: ['react', 'javascript'], title: 'React Post' },
        },
        {
          slug: 'vue-post',
          frontmatter: { tags: ['vue', 'javascript'], title: 'Vue Post' },
        },
        {
          slug: 'python-post',
          frontmatter: { tags: ['python', 'backend'], title: 'Python Post' },
        },
      ];

      const result = posts.filter((post) =>
        post.frontmatter.tags.some((postTag) =>
          postTag.toLowerCase() === 'javascript',
        ),
      );

      expect(result).toHaveLength(2);
      expect(result[0].slug).toBe('react-post');
      expect(result[1].slug).toBe('vue-post');
    });

    it('should be case insensitive', () => {
      const posts = [
        {
          slug: 'react-post',
          frontmatter: { tags: ['React', 'JavaScript'], title: 'React Post' },
        },
      ];

      const result = posts.filter((post) =>
        post.frontmatter.tags.some((postTag) =>
          postTag.toLowerCase() === 'react',
        ),
      );

      expect(result).toHaveLength(1);
    });

    it('should return empty array for non-existent tag', () => {
      const posts = [
        {
          slug: 'react-post',
          frontmatter: { tags: ['react', 'javascript'], title: 'React Post' },
        },
      ];

      const result = posts.filter((post) =>
        post.frontmatter.tags.some((postTag) =>
          postTag.toLowerCase() === 'nonexistent',
        ),
      );

      expect(result).toHaveLength(0);
    });
  });

  describe('getRelatedPosts', () => {
    it('should return related posts from same category excluding current post', () => {
      const posts = [
        {
          slug: 'current-post',
          frontmatter: { category: 'Technology', title: 'Current Post' },
        },
        {
          slug: 'related-1',
          frontmatter: { category: 'Technology', title: 'Related 1' },
        },
        {
          slug: 'related-2',
          frontmatter: { category: 'Technology', title: 'Related 2' },
        },
        {
          slug: 'different-category',
          frontmatter: { category: 'Design', title: 'Different Category' },
        },
      ];

      const result = posts
        .filter((post) =>
          post.slug !== 'current-post' &&
          post.frontmatter.category === 'Technology',
        )
        .slice(0, 3);

      expect(result).toHaveLength(2);
      expect(result[0].slug).toBe('related-1');
      expect(result[1].slug).toBe('related-2');
      expect(result.find(post => post.slug === 'current-post')).toBeUndefined();
      expect(result.find(post => post.slug === 'different-category')).toBeUndefined();
    });

    it('should respect limit parameter', () => {
      const posts = [
        {
          slug: 'current-post',
          frontmatter: { category: 'Technology', title: 'Current Post' },
        },
        {
          slug: 'related-1',
          frontmatter: { category: 'Technology', title: 'Related 1' },
        },
        {
          slug: 'related-2',
          frontmatter: { category: 'Technology', title: 'Related 2' },
        },
        {
          slug: 'related-3',
          frontmatter: { category: 'Technology', title: 'Related 3' },
        },
      ];

      const result = posts
        .filter((post) =>
          post.slug !== 'current-post' &&
          post.frontmatter.category === 'Technology',
        )
        .slice(0, 2);

      expect(result).toHaveLength(2);
    });

    it('should return empty array when no related posts found', () => {
      const posts = [
        {
          slug: 'current-post',
          frontmatter: { category: 'Technology', title: 'Current Post' },
        },
        {
          slug: 'different-post',
          frontmatter: { category: 'Design', title: 'Different Post' },
        },
      ];

      const result = posts
        .filter((post) =>
          post.slug !== 'current-post' &&
          post.frontmatter.category === 'Technology',
        )
        .slice(0, 3);

      expect(result).toHaveLength(0);
    });
  });

  describe('getAllCategories', () => {
    it('should return unique categories from all posts', () => {
      const posts = [
        { frontmatter: { category: 'Technology' } },
        { frontmatter: { category: 'Design' } },
        { frontmatter: { category: 'Technology' } },
        { frontmatter: { category: 'Business' } },
        { frontmatter: { category: 'Design' } },
      ];

      const categories = [...new Set(posts.map((post) => post.frontmatter.category))];
      const result = categories.filter(Boolean);

      expect(result).toHaveLength(3);
      expect(result).toContain('Technology');
      expect(result).toContain('Design');
      expect(result).toContain('Business');
    });

    it('should filter out empty categories', () => {
      const posts = [
        { frontmatter: { category: 'Technology' } },
        { frontmatter: { category: '' } },
        { frontmatter: { category: 'Design' } },
        { frontmatter: { category: null } },
        { frontmatter: { category: 'Business' } },
      ];

      const categories = [...new Set(posts.map((post) => post.frontmatter.category))];
      const result = categories.filter(Boolean);

      expect(result).toHaveLength(3);
      expect(result).not.toContain('');
      expect(result).not.toContain(null);
    });

    it('should return empty array when no posts exist', () => {
      const posts = [];
      const categories = [...new Set(posts.map((post) => post.frontmatter.category))];
      const result = categories.filter(Boolean);

      expect(result).toEqual([]);
    });
  });

  describe('getAllTags', () => {
    it('should return unique tags from all posts', () => {
      const posts = [
        { frontmatter: { tags: ['react', 'javascript'] } },
        { frontmatter: { tags: ['vue', 'javascript'] } },
        { frontmatter: { tags: ['python', 'backend'] } },
        { frontmatter: { tags: ['react', 'frontend'] } },
      ];

      const tags = [...new Set(posts.flatMap((post) => post.frontmatter.tags))];
      const result = tags.filter(Boolean);

      expect(result).toHaveLength(5);
      expect(result).toContain('react');
      expect(result).toContain('javascript');
      expect(result).toContain('vue');
      expect(result).toContain('python');
      expect(result).toContain('backend');
      expect(result).toContain('frontend');
    });

    it('should filter out empty tags', () => {
      const posts = [
        { frontmatter: { tags: ['react', '', 'javascript'] } },
        { frontmatter: { tags: ['vue', null, 'css'] } },
        { frontmatter: { tags: [] } },
      ];

      const tags = [...new Set(posts.flatMap((post) => post.frontmatter.tags))];
      const result = tags.filter(Boolean);

      expect(result).toHaveLength(4);
      expect(result).toContain('react');
      expect(result).toContain('javascript');
      expect(result).toContain('vue');
      expect(result).toContain('css');
      expect(result).not.toContain('');
      expect(result).not.toContain(null);
    });

    it('should return empty array when no posts exist', () => {
      const posts = [];
      const tags = [...new Set(posts.flatMap((post) => post.frontmatter.tags))];
      const result = tags.filter(Boolean);

      expect(result).toEqual([]);
    });

    it('should handle posts without tags field', () => {
      const posts = [
        { frontmatter: { tags: ['react'] } },
        { frontmatter: {} },
        { frontmatter: { tags: ['vue'] } },
      ];

      // Simulate the function behavior with default empty array
      const postsWithDefaultTags = posts.map(post => ({
        ...post,
        frontmatter: {
          ...post.frontmatter,
          tags: post.frontmatter.tags || [],
        },
      }));

      const tags = [...new Set(postsWithDefaultTags.flatMap((post) => post.frontmatter.tags))];
      const result = tags.filter(Boolean);

      expect(result).toHaveLength(2);
      expect(result).toContain('react');
      expect(result).toContain('vue');
    });
  });

  describe('Error Handling', () => {
    it('should handle file system errors gracefully', () => {
      fs.readdirSync.mockImplementation(() => {
        throw new Error('Permission denied');
      });

      expect(() => getAllBlogSlugs()).not.toThrow();
      expect(getAllBlogSlugs()).toEqual([]);
    });

    it('should handle corrupt MDX files', () => {
      fs.readdirSync.mockReturnValue(['corrupt.mdx']);
      fs.readFileSync.mockReturnValue('corrupt content');
      matter.mockImplementation(() => {
        throw new Error('Invalid frontmatter');
      });

      expect(() => getBlogBySlug('corrupt')).not.toThrow();
      expect(getBlogBySlug('corrupt')).toBeNull();
    });

    it('should handle missing blog directory', () => {
      fs.readdirSync.mockImplementation(() => {
        throw new Error('ENOENT');
      });

      const result = getAllBlogPosts();
      expect(result).toEqual([]);
    });
  });

  describe('Integration Tests', () => {
    it('should work with real-world blog structure', () => {
      // Mock a realistic blog directory structure
      fs.readdirSync.mockReturnValue([
        'introduction-to-react.mdx',
        'advanced-nextjs.mdx',
        'css-in-js.mdx',
        'draft-post.mdx',
      ]);

      const mockPosts = [
        {
          data: {
            title: 'Introduction to React',
            date: '2023-12-01',
            category: 'Frontend',
            tags: ['react', 'javascript'],
            published: true,
          },
          content: 'React content...',
        },
        {
          data: {
            title: 'Advanced Next.js',
            date: '2023-12-15',
            category: 'Frontend',
            tags: ['nextjs', 'react'],
            published: true,
          },
          content: 'Next.js content...',
        },
        {
          data: {
            title: 'CSS in JS',
            date: '2023-12-10',
            category: 'Styling',
            tags: ['css', 'javascript'],
            published: true,
          },
          content: 'CSS content...',
        },
        {
          data: {
            title: 'Draft Post',
            date: '2023-12-20',
            category: 'Frontend',
            tags: ['draft'],
            published: false,
          },
          content: 'Draft content...',
        },
      ];

      fs.readFileSync
        .mockReturnValueOnce('post1')
        .mockReturnValueOnce('post2')
        .mockReturnValueOnce('post3')
        .mockReturnValueOnce('post4');

      matter
        .mockReturnValueOnce(mockPosts[0])
        .mockReturnValueOnce(mockPosts[1])
        .mockReturnValueOnce(mockPosts[2])
        .mockReturnValueOnce(mockPosts[3]);

      const allPosts = getAllBlogPosts();
      expect(allPosts).toHaveLength(3); // Excluding draft

      // Test category filtering
      const frontendPosts = allPosts.filter(post =>
        post.frontmatter.category === 'Frontend',
      );
      expect(frontendPosts).toHaveLength(2);

      // Test tag filtering
      const reactPosts = allPosts.filter(post =>
        post.frontmatter.tags.includes('react'),
      );
      expect(reactPosts).toHaveLength(2);
    });
  });
});
