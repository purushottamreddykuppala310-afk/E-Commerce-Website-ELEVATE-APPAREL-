/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com',
      'assets.myntassets.com',
      'static.zara.net',
      'static.nike.com'
    ],
  },
};

module.exports = nextConfig;
