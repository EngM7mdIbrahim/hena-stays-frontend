import type { Metadata } from 'next'
import localFont from 'next/font/local'

import './globals.css'
import '@mantine/notifications/styles.css'

import { Cairo } from 'next/font/google'
import { GENERAL_METADATA } from '@constants'
import Providers from '@providers'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'

export const dynamic = 'force-dynamic'

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-arabic',
  weight: ['400', '700'],
  display: 'swap'
})

export const metadata: Metadata = {
  ...GENERAL_METADATA,

  title: 'TrueDar | Real Estate & Property Solutions in UAE',
  description: `TrueDar is revolutionizing the real estate industry in UAE by combining cutting-edge technology with trusted brokers. Discover seamless property solutions and find your ideal home or office in the UAE.`,
  robots: {
    index: true,
    follow: true
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  return (
    <html lang={locale} data-mantine-color-scheme='light'>
      <link
        rel='icon'
        href='/images/bg-logo.png'
        type='image/x-icon'
        sizes='16x16'
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${locale.startsWith('ar') ? cairo.variable : ''} antialiased`}
      >
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
