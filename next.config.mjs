/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.github.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**.github.com",
        port: "",
        pathname: "**",
      },
      {
        hostname: "utfs.io",
      },
    ],
  },
};

// export default nextConfig
export default bundleAnalyzer(nextConfig);
