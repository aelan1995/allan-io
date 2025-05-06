module.exports = {
  siteUrl: "https://allan-io.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 1,
  exclude: [], // make sure no page is excluded
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: "monthly",
      priority: 1.0,
      lastmod: new Date().toISOString(),
    };
  },
};
