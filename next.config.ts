import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["mdx", "ts", "js", "tsx"],
  /* config options here */
  images: {
    remotePatterns: [
      {
        // hostname: "lh3.googleusercontent.com",
        hostname: "*",
      },
    ],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
