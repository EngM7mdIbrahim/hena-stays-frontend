import { getProjects } from '@apis'
import { navigationLinks } from '@constants'

export async function getProjectsSitemapData() {
  const baseUrl = process.env.NEXT_PUBLIC_HOST_URL

  try {
    const { items } = await getProjects({
      limit: String(Number.MAX_SAFE_INTEGER)
    })

    // Map projects to a sitemap-friendly format
    return items?.map((project) => ({
      url: `${baseUrl}${navigationLinks.projects.viewProject(project?._id)}`,
      lastModified: project?.createdAt || new Date(),
      changeFrequency: 'daily' as const
    }))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error fetching projects for sitemap: ${error}`)
    return []
  }
}
