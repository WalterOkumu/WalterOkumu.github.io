import { getAllBlogPosts } from '@/lib/blog.server'

export async function GET() {
  const posts = getAllBlogPosts()
  const siteUrl = 'https://walterokumu.com'
  
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Walter Okumu - Blog</title>
    <description>Insights on technical customer success, full-stack development, AI automation, and building scalable solutions</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss" rel="self" type="application/rss+xml"/>
    <language>en-US</language>
    <managingEditor>walter@walterokumu.com (Walter Okumu)</managingEditor>
    <webMaster>walter@walterokumu.com (Walter Okumu)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Next.js Blog System</generator>
    <image>
      <url>${siteUrl}/images/walter-okumu.jpg</url>
      <title>Walter Okumu</title>
      <link>${siteUrl}</link>
    </image>
${posts.map(post => `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <description><![CDATA[${post.frontmatter.excerpt}]]></description>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <author>walter@walterokumu.com (${post.frontmatter.author})</author>
      <category><![CDATA[${post.frontmatter.category}]]></category>
${post.frontmatter.tags.map(tag => `      <category><![CDATA[${tag}]]></category>`).join('\n')}
      <content:encoded><![CDATA[
        <p>${post.frontmatter.excerpt}</p>
        <p><a href="${siteUrl}/blog/${post.slug}">Read more...</a></p>
      ]]></content:encoded>
    </item>`).join('')}
  </channel>
</rss>`

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  })
}
