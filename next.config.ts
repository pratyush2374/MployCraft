import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    serverComponentsExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
};

export default nextConfig;
