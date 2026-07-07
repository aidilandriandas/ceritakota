import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/provinsi/:province/:city',
        destination: '/kota/:city',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
