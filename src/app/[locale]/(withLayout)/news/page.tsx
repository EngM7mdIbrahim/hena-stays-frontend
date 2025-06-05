import { Box } from '@mantine/core'
import NewsSection from '@sections/News/NewsSection'

export const metadata = {
  title: 'News | TrueDar Real Estate Updates & Insights in UAE',
  description: `Stay updated with the latest real estate news, market insights, and property trends in UAE. Explore TrueDar's news section for valuable updates and information.`,
  robots: {
    index: true,
    follow: true
  }
}

export default function NewsPage() {
  return (
    <Box className='px-4 py-10 md:px-8 lg:px-12'>
      <NewsSection />
    </Box>
  )
}
