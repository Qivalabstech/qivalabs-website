/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://qivalabs.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
  exclude: ['/api/*', '/sitemap.xml'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  additionalPaths: async () => [
    { loc: '/', changefreq: 'weekly', priority: 1.0 },
    { loc: '/about', changefreq: 'monthly', priority: 0.8 },
    { loc: '/services', changefreq: 'weekly', priority: 0.9 },
    { loc: '/services/mandi-whatsapp-automation', changefreq: 'weekly', priority: 0.9 },
    { loc: '/services/ai-crm-automation', changefreq: 'weekly', priority: 0.9 },
    { loc: '/enroll-mandi', changefreq: 'monthly', priority: 0.8 },
    { loc: '/onboard-crm', changefreq: 'monthly', priority: 0.8 },
    { loc: '/contact', changefreq: 'monthly', priority: 0.7 },
    { loc: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
    { loc: '/terms-of-service', changefreq: 'yearly', priority: 0.3 },
    { loc: '/sitemap-page', changefreq: 'monthly', priority: 0.4 },
  ],
};
