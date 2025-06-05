import { Metadata } from 'next'

import { navigationLinks } from '../navigation'

export const GOOGLE_SITE_VERIFICATION =
  'BIZP2Ngqfrw-N5lods0TxsteDC0xbaNKJPIOxb_dT_8'
export const GOOGLE_SITE_VERIFICATION_KEY = 'google-site-verification'
export const TITLE = 'Find Your Dream Home'
export const DESCRIPTION =
  'Find your dream home. This is where you can find a dream home of your choice without stress.'
export const KEYWORDS = [
  'home',
  'dream home',
  'real estate',
  'buy property',
  'property',
  'find property',
  'property search',
  'property for sale',
  'property for rent',
  'property request',
  'property listing'
]

export const AUTHOR = 'TrueDar'

export const URL = process.env.NEXT_PUBLIC_HOST_URL

// Open Graph
export const OG_TYPE = 'website'
export const OG_IMAGE = navigationLinks.assets.logoOg
export const OG_URL = URL
export const OG_SITE_NAME = 'True Dar'
export const OG_TITLE = TITLE
export const OG_DESCRIPTION = DESCRIPTION

// Twitter
export const TWITTER_CARD = 'summary_large_image'
export const TWITTER_TITLE = TITLE
export const TWITTER_DESCRIPTION = DESCRIPTION

export const GENERAL_METADATA: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: AUTHOR }],
  openGraph: {
    type: OG_TYPE,
    url: OG_URL,
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE
      }
    ],
    siteName: OG_SITE_NAME
  },
  twitter: {
    card: TWITTER_CARD,
    title: TWITTER_TITLE,
    description: TWITTER_DESCRIPTION
  },
  other: {
    [GOOGLE_SITE_VERIFICATION_KEY]: GOOGLE_SITE_VERIFICATION
  }
}
