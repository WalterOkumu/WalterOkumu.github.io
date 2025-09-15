import Image from 'next/image';
import Link from 'next/link';

import { formatDate } from '@/lib/blog-utils';

export default function BlogCard({ post }) {
  const { slug, frontmatter } = post;

  return (
    <article className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group" role="article">
      {/* Full-card clickable overlay for better UX */}
      <Link
        href={`/blog/${slug}`}
        aria-label={`Read "${frontmatter.title}"`}
        className="absolute inset-0 z-10"
      />
      {frontmatter.image && (
        <div className="aspect-video relative">
          <Image
            src={frontmatter.image}
            alt={frontmatter.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-6">
        {/* Category and Reading Time */}
        <div className="flex items-center justify-between mb-3 text-sm">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
            {frontmatter.category}
          </span>
          <span className="text-gray-600">{frontmatter.readingTime}</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {frontmatter.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-700 mb-4 line-clamp-3">
          {frontmatter.excerpt}
        </p>

        {/* Tags */}
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {frontmatter.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
            {frontmatter.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{frontmatter.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {frontmatter.author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{frontmatter.author}</p>
              <p className="text-xs text-gray-500">{formatDate(frontmatter.date)}</p>
            </div>
          </div>

          <span className="text-blue-600 group-hover:text-blue-800 font-medium text-sm transition-colors">
            Read more
          </span>
        </div>
      </div>
    </article>
  );
}
