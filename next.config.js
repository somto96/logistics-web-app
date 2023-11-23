/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    // remotePatterns: [
    //   {
    //     protocol: 'http',
    //     hostname: 'localhost',
    //     port: '1337',
    //     pathname: '*',
    //   },
    // ],
    domains: ['res.cloudinary.com', 'localhost', 'images.unsplash.com']
  },
};

module.exports = nextConfig;
