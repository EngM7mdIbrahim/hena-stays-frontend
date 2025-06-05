import { getPosts } from '@apis'
import { navigationLinks } from '@constants'

export async function getPostSitemapData() {
  const baseUrl = process.env.NEXT_PUBLIC_HOST_URL

  try {
    const { items } = await getPosts({
      limit: String(Number.MAX_SAFE_INTEGER),
      showFields: {
        user: true
      }
    })

    // Map posts to a sitemap-friendly format
    return items?.map((post) => {
      return {
        url: `${baseUrl}${navigationLinks.community.viewPost(post?._id)}`,
        lastModified: post?.createdAt || new Date(),
        changeFrequency: 'weekly' as const
      }
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error fetching posts for sitemap: ${error}`)
    return []
  }
}
