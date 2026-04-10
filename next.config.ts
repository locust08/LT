import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const reference = "https://experience.slap-apps.de";

    return {
      beforeFiles: [
        {
          source: "/en",
          destination: `${reference}/en`,
        },
        {
          source: "/en/:path*",
          destination: `${reference}/en/:path*`,
        },
        {
          source: "/_nuxt/:path*",
          destination: `${reference}/_nuxt/:path*`,
        },
        {
          source: "/_fonts/:path*",
          destination: `${reference}/_fonts/:path*`,
        },
        {
          source: "/_i18n/:path*",
          destination: `${reference}/_i18n/:path*`,
        },
        {
          source: "/__og-image__/:path*",
          destination: `${reference}/__og-image__/:path*`,
        },
        {
          source: "/__sitemap__/:path*",
          destination: `${reference}/__sitemap__/:path*`,
        },
        {
          source: "/sitemap_index.xml",
          destination: `${reference}/sitemap_index.xml`,
        },
        {
          source: "/favicon.png",
          destination: `${reference}/favicon.png`,
        },
        {
          source: "/logo.png",
          destination: `${reference}/logo.png`,
        },
      ],
    };
  },
};

export default nextConfig;
