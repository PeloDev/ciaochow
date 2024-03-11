/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    windowHistorySupport: true,
  },
};

export default nextConfig;
