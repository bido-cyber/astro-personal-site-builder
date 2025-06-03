export const generateSitemap = () => {
  const baseUrl = 'https://bido-cyber.github.io/astro-personal-site-builder';
  const currentDate = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: `${baseUrl}/`, priority: '1.0', changefreq: 'weekly' },
    { url: `${baseUrl}/projects`, priority: '0.8', changefreq: 'weekly' },
    { url: `${baseUrl}/blog`, priority: '0.8', changefreq: 'daily' },
  ];

  // Add project pages
  const projectPages = [
    { url: `${baseUrl}/projects/ecommerce-platform`, priority: '0.7', changefreq: 'monthly' },
    { url: `${baseUrl}/projects/mobile-app`, priority: '0.7', changefreq: 'monthly' },
  ];

  // Add blog pages
  const blogPages = [
    { url: `${baseUrl}/blog/getting-started-with-react`, priority: '0.6', changefreq: 'monthly' },
  ];

  const allPages = [...staticPages, ...projectPages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return sitemap;
};

// Function to download sitemap
export const downloadSitemap = () => {
  const sitemap = generateSitemap();
  const blob = new Blob([sitemap], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
