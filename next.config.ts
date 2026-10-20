import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';
// UIR only on the platform: WebKit upgrades http://localhost subresources to
// https:// (SSL error) which breaks local E2E; on Vercel (HTTPS + HSTS) it
// remains as defense-in-depth.
const isVercel = Boolean(process.env.VERCEL);

const baseHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
      'usb=()',
      'magnetometer=()',
      'gyroscope=()',
      'accelerometer=()',
    ].join(', '),
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

function getCspHeader(): string {
  const scriptSrc = isDev
    ? "'self' 'unsafe-inline' 'unsafe-eval'" // eval required by React in dev mode
    : "'self' 'unsafe-inline'"; // production: no eval needed
  const directives = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'", // Tailwind uses inline styles
    "img-src 'self' data: blob:", // Allow data URIs for images
    "font-src 'self' data:", // Local fonts + data URIs
    "connect-src 'self'", // API calls to same origin
    "object-src 'none'", // No plugins (Flash, PDF, etc.)
    "frame-ancestors 'none'", // Prevent clickjacking
    "base-uri 'self'",
    "form-action 'self'",
  ];
  if (isVercel) {
    directives.push('upgrade-insecure-requests');
  }
  return directives.join('; ');
}

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'Content-Security-Policy', value: getCspHeader() }, ...baseHeaders],
      },
      {
        source: '/admin-backup',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
