import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import BlogCard from '@/components/blog/BlogCard';
import { formatDate } from '@/lib/blog-utils';
import { getAllBlogSlugs, getBlogBySlug, getRelatedPosts } from '@/lib/blog.server';

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'This blog post could not be found.',
    };
  }

  const { frontmatter } = post;

  return {
    title: `${frontmatter.title} | Walter Okumu`,
    description: frontmatter.excerpt,
    keywords: frontmatter.tags.join(', '),
    authors: [{ name: frontmatter.author }],
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      type: 'article',
      publishedTime: frontmatter.date,
      authors: [frontmatter.author],
      images: frontmatter.image ? [frontmatter.image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.excerpt,
      images: frontmatter.image ? [frontmatter.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter } = post;
  const relatedPosts = getRelatedPosts(slug, frontmatter.category);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    author: {
      '@type': 'Person',
      name: frontmatter.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Walter Okumu',
      logo: {
        '@type': 'ImageObject',
        url: 'https://walterokumu.com/logo.png',
      },
    },
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://walterokumu.com/blog/${slug}`,
    },
    image: frontmatter.image,
    keywords: frontmatter.tags.join(', '),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip Link */}
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="text-gray-500 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/blog"
              className="text-gray-500 hover:text-primary-600 transition-colors"
            >
              Blog
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{frontmatter.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-brand border border-accent-100 overflow-hidden">
          {/* Featured Image */}
          {frontmatter.image && (
            <div className="aspect-video relative">
              <Image
                src={frontmatter.image}
                alt={frontmatter.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <div className="p-8 lg:p-12">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium">
                {frontmatter.category}
              </span>
              <span>{frontmatter.readTime} min read</span>
              <span>•</span>
              <time dateTime={frontmatter.date}>
                {formatDate(frontmatter.date)}
              </time>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {frontmatter.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {frontmatter.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Author Info */}
            <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-gray-200">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {frontmatter.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{frontmatter.author}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(frontmatter.date)}
                </p>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Share Buttons */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Share this article
              </h3>
              <div className="flex space-x-4">
                <ShareButton
                  platform="twitter"
                  url={`https://walterokumu.com/blog/${slug}`}
                  title={frontmatter.title}
                  text={frontmatter.excerpt}
                />
                <ShareButton
                  platform="linkedin"
                  url={`https://walterokumu.com/blog/${slug}`}
                  title={frontmatter.title}
                  text={frontmatter.excerpt}
                />
                <ShareButton
                  platform="facebook"
                  url={`https://walterokumu.com/blog/${slug}`}
                  title={frontmatter.title}
                />
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Related Articles
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}

// Share Button Component
function ShareButton({ platform, url, title, text }) {
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  };

  const icons = {
    twitter: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    facebook: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  };

  return (
    <a
      href={shareUrls[platform]}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
    >
      {icons[platform]}
      <span className="ml-2 capitalize">{platform}</span>
    </a>
  );
}
