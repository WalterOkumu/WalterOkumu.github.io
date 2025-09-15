import BlogClient from './BlogClient';

import { getAllBlogPosts, getAllCategories } from '@/lib/blog.server';

export const metadata = {
  title: 'Blog & Insights | Walter Okumu',
  description: 'Thoughts on technical customer success, full-stack development, AI automation, and building scalable solutions that bridge engineering and business needs.',
  keywords: 'technical customer success, full-stack developer, AI automation, Next.js, blog',
};

export default async function BlogPage() {
  // Fetch data server-side
  const allPosts = getAllBlogPosts();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blog & Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Thoughts on technical customer success, full-stack development, AI automation,
            and building scalable solutions that bridge engineering and business needs.
          </p>
        </div>

        {/* Use client component for interactive features */}
        <BlogClient allPosts={allPosts} categories={categories} />
      </div>
    </div>
  );
}
