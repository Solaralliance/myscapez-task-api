import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/public-pages"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/crm", "/dashboard", "/login", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
