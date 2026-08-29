import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/design-test", "/_next/"],
      },
    ],
    sitemap: "https://adruvasolution.com/sitemap.xml",
    host: "https://adruvasolution.com",
  };
}
