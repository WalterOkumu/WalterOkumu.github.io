import { getAllBlogPosts } from '@/lib/blog.server';

export async function GET() {
  const posts = getAllBlogPosts();
  const siteUrl = 'https://walterokumu.com';

  const staticRoutes = [
    '/',
    '/about',
    '/services',
    '/contact',
    '/blog',
  ];

  const staticSitemap = staticRoutes.map(route => `
    <url>
      <loc>${siteUrl}${route}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${route === '/' ? '1.0' : '0.8'}</priority>
    </url>`).join('');

  const blogSitemap = posts.map(post => `
    <url>
      <loc>${siteUrl}/blog/${post.slug}</loc>
      <lastmod>${new Date(post.frontmatter.date).toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticSitemap}
${blogSitemap}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}
