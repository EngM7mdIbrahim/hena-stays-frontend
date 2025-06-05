import { MetadataRoute } from 'next'
import {
  getBlogsSitemapData,
  getNewsSitemapData,
  getPostSitemapData,
  getProjectsSitemapData,
  getPropertiesSitemapData
} from '@sitemaps'

export const dynamic = 'auto'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = process.env.NEXT_PUBLIC_HOST_URL

  return [
    {
      url: host || '',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 1
    },
    ...(await getBlogsSitemapData()),
    ...(await getPropertiesSitemapData()),
    ...(await getProjectsSitemapData()),
    ...(await getPostSitemapData()),
    ...(await getNewsSitemapData())
  ]
}
