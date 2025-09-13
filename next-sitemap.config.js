/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://walterokumu.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,

  // Sitemap Configuration
  changefreq: 'weekly',
  priority: 0.8,

  // Exclude certain paths
  exclude: [
    '/api/*',
    '/admin/*',
    '/server-sitemap.xml',
    '/404',
    '/500',
    '/_error',
    '/_document',
    '/_app',
  ],

  // Additional paths (if dynamic)
  additionalPaths: async (config) => {
    const result = [];

    // Add blog posts dynamically
    // const blogPosts = await getBlogPosts();
    // blogPosts.forEach((post) => {
    //   result.push({
    //     loc: `/blog/${post.slug}`,
    //     changefreq: 'weekly',
    //     priority: 0.7,
    //     lastmod: new Date(post.updatedAt).toISOString(),
    //   });
    // });

    // Add project pages dynamically
    // const projects = await getProjects();
    // projects.forEach((project) => {
    //   result.push({
    //     loc: `/projects/${project.slug}`,
    //     changefreq: 'monthly',
    //     priority: 0.9,
    //     lastmod: new Date(project.updatedAt).toISOString(),
    //   });
    // });

    return result;
  },

  // Robots.txt configuration
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://walterokumu.com'}/server-sitemap.xml`,
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/reports/',
          '/coverage/',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
    ],
  },

  // Transform function for custom URL modifications
  transform: async (config, path) => {
    // Custom priority based on path importance
    let priority = config.priority;
    let changefreq = config.changefreq;

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/about')) {
      priority = 0.9;
      changefreq = 'monthly';
    } else if (path.startsWith('/projects')) {
      priority = 0.9;
      changefreq = 'monthly';
    } else if (path.startsWith('/blog')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.startsWith('/services')) {
      priority = 0.8;
      changefreq = 'monthly';
    } else if (path.startsWith('/contact')) {
      priority = 0.7;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        // Add alternate language refs if implementing i18n
        // {
        //   href: `${config.siteUrl}/es${path}`,
        //   hreflang: 'es',
        // },
      ],
    };
  },
};

module.exports = config;