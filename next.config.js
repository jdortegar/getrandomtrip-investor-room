/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200, 1600],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );
    config.module.rules.push(
      {
        ...fileLoaderRule,
        resourceQuery: /url/,
        test: /\.svg$/i,
      },
      {
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: /url/ },
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
      }
    );
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
};

module.exports = nextConfig;
