import { getBlogs } from '@apis'
import { User } from '@commonTypes'
import { navigationLinks } from '@constants'
import { isPopulated } from '@guards'

export async function getBlogsSitemapData() {
  const baseUrl = process.env.NEXT_PUBLIC_HOST_URL

  try {
    const { items } = await getBlogs({
      limit: String(Number.MAX_SAFE_INTEGER),

      showFields: {
        user: true
      }
    })

    // Map blogs to a sitemap-friendly format
    return items?.map((blog) => {
      if (!isPopulated<User>(blog?.user))
        return {
          url: '',
          lastModified: new Date(),
          changeFrequency: 'never' as const,
          priority: 0
        }
      return {
        url: `${baseUrl}${navigationLinks.community.profileBlogView(blog?.user?._id, blog?._id)}`,
        lastModified: blog?.createdAt || new Date(),
        changeFrequency: 'weekly' as const
      }
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error fetching blogs for sitemap: ${error}`)
    return []
  }
}
