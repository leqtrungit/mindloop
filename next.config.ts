import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone'
  /* config options here */
};

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: "public",
  register: true,
  skipWaiting: true,
})

module.exports = withPWA(withNextIntl(nextConfig))