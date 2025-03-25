export const dynamic = "force-static";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Your Site Name',
    template: '%s | Your Site Name'
  },
  description: 'A comprehensive description of your website',
  metadataBase: new URL('https://www.yourwebsite.com'),
  openGraph: {
    title: 'Your Site Name',
    description: 'A comprehensive description of your website',
    images: ['/og-image.png'],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Site Name',
    description: 'A comprehensive description of your website',
    images: ['/twitter-image.png']
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ]
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'your-google-site-verification-code',
    // Add other verification codes as needed
  }
}

export default function Head() {
  return null // In Next.js 13+ and App Router, metadata is typically defined statically
}