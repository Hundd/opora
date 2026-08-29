import type { Metadata, Viewport } from 'next'
import { Fraunces, Manrope } from 'next/font/google'
import type { ReactNode } from 'react'
import { Layout } from '../components/Layout'
import { pageMeta, siteUrl } from '../data/meta'
import '../index.css'
import { Providers } from './providers'

const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-serif',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  variable: '--font-sans',
  display: 'swap',
})

const home = pageMeta('home')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: home.title,
  description: home.description,
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: home.openGraph,
  twitter: home.twitter,
}

export const viewport: Viewport = {
  themeColor: '#2F4A3C',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
