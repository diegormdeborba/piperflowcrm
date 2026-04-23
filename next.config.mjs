/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production"

const csp = [
  "default-src 'self'",
  // 'unsafe-eval' removido em produção — Next.js prod build não precisa
  // Stripe.js e Next.js funcionam sem ele
  isProd
    ? "script-src 'self' 'unsafe-inline' https://js.stripe.com"
    : "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self'",
  // Stripe Checkout iframe
  "frame-src https://js.stripe.com https://hooks.stripe.com",
  // Supabase + Stripe API calls
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.stripe.com",
].join("; ")

const securityHeaders = [
  { key: "X-Frame-Options",        value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Referrer-Policy",        value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",     value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Content-Security-Policy", value: csp },
  // HSTS: força HTTPS por 2 anos em produção
  ...(isProd ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }] : []),
]

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
