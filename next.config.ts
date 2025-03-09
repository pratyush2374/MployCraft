import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental : {
    serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium']
  }
};

export default nextConfig;
