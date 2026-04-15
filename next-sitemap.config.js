/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://lifepathnumerologycalculator.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
  exclude: ['/report/*', '/report/success', '/api/*'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
};
