/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  images: {
    remotePatterns: [
      {
        hostname: 'https',
        hostname: 'res.cloudinary.com',
        port: ''
      }
    ]
  },
  redirects: async () => [
    {
      source: '/',
      destination: '/products', // Change this to your desired destination
      permanent: true, // Set to true for permanent redirect (301)
    },
    // {
    //   source: '/app',
    //   destination: '/app/levels', // Change this to your desired destination
    //   permanent: false, // Set to true for permanent redirect (301)
    // }
  ]
};

export default nextConfig;
