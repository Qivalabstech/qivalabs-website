/** @type {import('next-sitemap').IConfig} */

const SERVICE_SLUGS = [
  'digital-marketing',
  'branding-identity',
  'website-design-development',
  'ecommerce-solutions',
  'custom-software-development',
  'business-automation',
  'mobile-app-development',
  'enterprise-web-applications',
  'crm-erp-solutions',
  'loan-origination-software',
  'ai-integrated-automation',
  'business-process-automation',
  'api-development-integration',
  'cloud-solutions-migration',
  'ui-ux-design',
  'data-analytics-bi',
  'cybersecurity-solutions',
  'it-consulting',
  'quality-assurance-testing',
  'devops-infrastructure',
  'payment-gateway-integration',
  'third-party-system-integration',
  'saas-product-development',
  'database-design-management',
  'seo-performance-optimization',
  'hosting-domain-management',
  'maintenance-amc',
  'technical-documentation-training',
  'customer-support-services',
  'dedicated-account-management',
  '24-7-technical-support',
];

const BLOG_SLUGS = [
  'custom-software-development-cost-india-2026',
  'website-design-development-company-udaipur',
  'whatsapp-business-api-automation-wholesale-mandi',
  'ai-chatbot-development-small-businesses-india',
  'crm-vs-erp-which-does-your-business-need',
  'n8n-vs-zapier-vs-make-business-automation-2026',
  'mobile-app-development-cost-timeline-rajasthan',
  'cloud-migration-guide-small-indian-businesses',
  'loan-origination-software-features-nbfc-lending',
  'seo-local-service-businesses-udaipur-checklist',
];

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://qivalabs.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
      { userAgent: '*', disallow: '/admin' },
    ],
  },
  exclude: ['/api/*', '/admin', '/admin/*'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  additionalPaths: async () => {
    const servicePaths = SERVICE_SLUGS.map((slug) => ({
      loc: `/services/${slug}`,
      changefreq: 'weekly',
      priority: 0.85,
    }));

    const blogPaths = BLOG_SLUGS.map((slug) => ({
      loc: `/blog/${slug}`,
      changefreq: 'monthly',
      priority: 0.75,
    }));

    return [
      { loc: '/', changefreq: 'weekly', priority: 1.0 },
      { loc: '/about', changefreq: 'monthly', priority: 0.8 },
      { loc: '/services', changefreq: 'weekly', priority: 0.9 },
      { loc: '/portfolio', changefreq: 'monthly', priority: 0.8 },
      { loc: '/contact', changefreq: 'monthly', priority: 0.8 },
      { loc: '/career', changefreq: 'weekly', priority: 0.75 },
      { loc: '/blog', changefreq: 'weekly', priority: 0.7 },
      { loc: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
      { loc: '/terms-of-service', changefreq: 'yearly', priority: 0.3 },
      ...servicePaths,
      ...blogPaths,
    ];
  },
};
