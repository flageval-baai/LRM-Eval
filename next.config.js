/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.DEPLOY_TARGET === 'GH_PAGES';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGitHubPages ? '/LRM-Eval' : '',
  assetPrefix: isGitHubPages ? '/LRM-Eval/' : '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };
    return config;
  },
};

module.exports = nextConfig;
