import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compress: true,
  async headers() {
    return [
      {
        source: '/:path*.pdf',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/pdf',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
