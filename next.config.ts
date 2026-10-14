import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "minimax-algeng-chat-tts-us.oss-us-east-1.aliyuncs.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
