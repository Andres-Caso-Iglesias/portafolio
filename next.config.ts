import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

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
  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'", // Tailwind uses inline styles
    "img-src 'self' data: blob:", // Allow data URIs for images
    "font-src 'self' data:", // Local fonts + data URIs
    "connect-src 'self'", // API calls to same origin
    "frame-ancestors 'none'", // Prevent clickjacking
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
}

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'Content-Security-Policy', value: getCspHeader() }, ...baseHeaders],
      },
    ];
  },
};

export default nextConfig;
