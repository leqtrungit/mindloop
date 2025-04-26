import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: "public",
  register: true,
  skipWaiting: true,
})

module.exports = withPWA(nextConfig)