/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  compiler: {
    styledComponents: true
  },
  images: {
    remotePatterns: [
      {
        hostname: 'https',
        hostname: 'res.cloudinary.com',
        port: ''
      }
    ]
  },
  // redirects: async () => [
  //   {
  //     source: '/',
  //     destination: '/app', // Change this to your desired destination
  //     permanent: false, // Set to true for permanent redirect (301)
  //   }
  // ],
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    return config;
  },
};

export default nextConfig;
