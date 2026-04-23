/** @type {import('next').NextConfig} */

const csp = [
  "default-src 'self'",
  // Next.js dev + Stripe.js
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com",
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
  { key: "Permissions-Policy",     value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: csp },
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
