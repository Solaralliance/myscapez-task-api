/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // One year, this host only. includeSubDomains stays off so the header does not cover other hosts.
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://hebbkx1anhila5yf.public.blob.vercel-storage.com",
      "frame-src https://challenges.cloudflare.com",
      "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://challenges.cloudflare.com",
      "font-src 'self'",
    ].join("; "),
  },
]

const nextConfig = {
  images: {
    unoptimized: true,
  },
  async headers() {
    const noStore = { key: "Cache-Control", value: "private, no-store" }
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/crm", headers: [noStore] },
      { source: "/dashboard", headers: [noStore] },
      { source: "/login", headers: [noStore] },
      { source: "/login/:path*", headers: [noStore] },
    ]
  },
}

export default nextConfig
