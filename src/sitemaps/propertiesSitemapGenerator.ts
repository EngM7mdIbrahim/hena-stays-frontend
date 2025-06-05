import { getProperties } from '@apis'
import { navigationLinks } from '@constants'

export async function getPropertiesSitemapData() {
  const baseUrl = process.env.NEXT_PUBLIC_HOST_URL

  try {
    const { items } = await getProperties({
      limit: String(Number.MAX_SAFE_INTEGER)
    })

    // Map properties to a sitemap-friendly format
    return items?.map((property) => ({
      url: `${baseUrl}${navigationLinks.properties.viewProperty(property?._id)}`,
      lastModified: property?.createdAt || new Date(),
      changeFrequency: 'daily' as const
    }))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error fetching properties for sitemap: ${error}`)
    return []
  }
}
