import 'server-only'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const blogDirectory = path.join(process.cwd(), 'src/content/blog')

export function getAllBlogSlugs() {
  try {
    const fileNames = fs.readdirSync(blogDirectory)
    return fileNames
      .filter((name) => name.endsWith('.mdx'))
      .map((name) => ({
        slug: name.replace(/\.mdx$/, ''),
      }))
  } catch (error) {
    return []
  }
}

export function getBlogBySlug(slug) {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      frontmatter: {
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || '',
        category: data.category || '',
        tags: data.tags || [],
        author: data.author || 'Walter Okumu',
        readingTime: data.readingTime || '5 min read',
        image: data.image || null,
        published: data.published !== false,
      },
      content,
    }
  } catch (error) {
    return null
  }
}

export function getAllBlogPosts() {
  const slugs = getAllBlogSlugs()
  const posts = slugs
    .map(({ slug }) => getBlogBySlug(slug))
    .filter((post) => post && post.frontmatter.published)
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))

  return posts
}

export function getBlogPostsByCategory(category) {
  const allPosts = getAllBlogPosts()
  return allPosts.filter((post) => 
    post.frontmatter.category.toLowerCase() === category.toLowerCase()
  )
}

export function getBlogPostsByTag(tag) {
  const allPosts = getAllBlogPosts()
  return allPosts.filter((post) => 
    post.frontmatter.tags.some((postTag) => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  )
}

export function getRelatedPosts(currentSlug, category, limit = 3) {
  const allPosts = getAllBlogPosts()
  return allPosts
    .filter((post) => 
      post.slug !== currentSlug && 
      post.frontmatter.category === category
    )
    .slice(0, limit)
}

export function getAllCategories() {
  const allPosts = getAllBlogPosts()
  const categories = [...new Set(allPosts.map((post) => post.frontmatter.category))]
  return categories.filter(Boolean)
}

export function getAllTags() {
  const allPosts = getAllBlogPosts()
  const tags = [...new Set(allPosts.flatMap((post) => post.frontmatter.tags))]
  return tags.filter(Boolean)
}
