import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: [
        '/stats/',
        '/admin/',
        '/adserver/',
        '/cp/',
        '/search/',
        '/v3/',
        '/ajax/',
        '/account',
        '/api/',
        '/manual-search/',
        '/sign-in',
        '*?*price=*',
        '*?*location=*',
        '/search?*'
      ]
    },
    sitemap: `${process.env.NEXT_PUBLIC_HOST_URL}/sitemap.xml`
  }
}
