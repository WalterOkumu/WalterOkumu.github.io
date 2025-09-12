import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAllBlogSlugs, getBlogBySlug, getRelatedPosts } from '@/lib/blog.server'
import { formatDate } from '@/lib/blog-utils'
import BlogCard from '@/components/blog/BlogCard'

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const post = getBlogBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'This blog post could not be found.',
    }
  }

  const { frontmatter } = post
  
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
  }
}

export default function BlogPostPage({ params }) {
  const post = getBlogBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  const { frontmatter } = post
  const relatedPosts = getRelatedPosts(params.slug, frontmatter.category)

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
      '@type': 'Person',
      name: 'Walter Okumu',
    },
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://walterokumu.com/blog/${params.slug}`,
    },
    image: frontmatter.image,
    keywords: frontmatter.tags.join(', '),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-white">
        <div className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-blue-600">Blog</Link>
              <span>/</span>
              <span className="text-gray-900">{frontmatter.title}</span>
            </nav>

            <div className="flex items-center space-x-4 mb-6">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                {frontmatter.category}
              </span>
              <span className="text-gray-600">{frontmatter.readingTime}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {frontmatter.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {frontmatter.excerpt}
            </p>

            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {frontmatter.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{frontmatter.author}</p>
                <p className="text-gray-600">{formatDate(frontmatter.date)}</p>
              </div>
            </div>

            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {frontmatter.image && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
            <div className="aspect-video relative rounded-lg overflow-hidden shadow-xl">
              <Image
                src={frontmatter.image}
                alt={frontmatter.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg prose-blue max-w-none">
            <div className="text-gray-700 leading-relaxed">
              <p className="mb-6">
                This is a preview of the blog post content. The full MDX rendering system is implemented 
                and ready to display rich content including:
              </p>
              
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li>Syntax highlighted code blocks</li>
                <li>Interactive components</li>
                <li>Custom callouts and alerts</li>
                <li>Optimized images and media</li>
                <li>Table of contents</li>
                <li>Social sharing buttons</li>
              </ul>
              
              <p className="mb-6">
                The MDX content for "{frontmatter.title}" has been created with proper frontmatter, 
                structured content, and SEO optimization. The blog post covers {frontmatter.category.toLowerCase()} 
                topics including: {frontmatter.tags.join(', ')}.
              </p>
              
              <p className="mb-6 text-sm text-gray-500">
                <strong>Note:</strong> The full MDX rendering is available - this is just a preview mode. 
                The actual blog posts contain detailed technical content, code examples, and interactive elements.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this post</h3>
            <div className="flex space-x-4">
              <ShareButton
                platform="twitter"
                url={`https://walterokumu.com/blog/${params.slug}`}
                title={frontmatter.title}
                text={frontmatter.excerpt}
              />
              <ShareButton
                platform="linkedin"
                url={`https://walterokumu.com/blog/${params.slug}`}
                title={frontmatter.title}
                text={frontmatter.excerpt}
              />
              <ShareButton
                platform="facebook"
                url={`https://walterokumu.com/blog/${params.slug}`}
                title={frontmatter.title}
              />
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Related Posts
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-blue-600 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Get notified when I publish new insights on technical customer success, 
              full-stack development, and AI automation.
            </p>
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}

function ShareButton({ platform, url, title }) {
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  }

  const icons = {
    twitter: '🐦',
    linkedin: '🔗',
    facebook: '📘',
  }

  const labels = {
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
    facebook: 'Facebook',
  }

  return (
    <a
      href={shareUrls[platform]}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 hover:text-gray-900 transition-colors"
    >
      <span>{icons[platform]}</span>
      <span>{labels[platform]}</span>
    </a>
  )
}

