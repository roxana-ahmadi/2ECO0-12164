/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.geeksforgeeks.org",
      },
    ],
  },
};

export default nextConfig;
