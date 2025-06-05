import { getNews } from '@apis'
import { navigationLinks } from '@constants'

export async function getNewsSitemapData() {
  const baseUrl = process.env.NEXT_PUBLIC_HOST_URL

  try {
    const { items } = await getNews({
      limit: String(Number.MAX_SAFE_INTEGER)
    })

    // Map news articles to a sitemap-friendly format
    return items?.map((news) => ({
      url: `${baseUrl}${navigationLinks.news.viewNews(news?._id)}`,
      lastModified: news?.createdAt || new Date(),
      changeFrequency: 'daily' as const
    }))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error fetching news for sitemap: ${error}`)
    return []
  }
}
