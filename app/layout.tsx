import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { brandUrl, siteUrl } from '@/lib/public-pages'
import './globals.css'

const description = 'Request a local mow, edge or garden tidy. The MyScapez directory is for lawn mowing, lawn care and landscaping in South East Queensland.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'MyScapez | Local lawn care', template: '%s | MyScapez' },
  description,
  authors: [{ name: 'Jai Butchers', url: siteUrl }],
  creator: 'Jai Butchers',
  publisher: 'Myscapez',
  alternates: { canonical: '/' },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
  openGraph: { title: 'MyScapez | Local lawn care', description, url: siteUrl, siteName: 'MyScapez', type: 'website', locale: 'en_AU' },
  robots: { index: true, follow: true },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
  themeColor: '#050605',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Organization',
              '@id': `${brandUrl}/#organization`,
              name: 'MyScapez',
              url: brandUrl,
              email: 'admin@myscapez.com',
              telephone: '+61480733936',
              taxID: '79 501 664 159',
              description,
            },
            {
              '@type': 'WebSite',
              '@id': `${siteUrl}/#website`,
              name: 'MyScapez',
              url: siteUrl,
              description,
              publisher: { '@id': `${brandUrl}/#organization` },
            },
          ],
        }) }} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
