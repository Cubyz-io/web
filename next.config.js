/** @type {import('next').NextConfig} */
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const nextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'anykddktnhkzncxnvlwm.supabase.co',
                pathname: '**',
            },
        ],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.plugins.push(new MiniCssExtractPlugin())
      return config;
    },
    experimental: {
      serverActions: {
        bodySizeLimit: '500mb',
          allowedOrigins: ['*'],
      },
    },
};

export default nextConfig;
