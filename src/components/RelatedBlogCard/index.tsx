import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { OfficialBlog } from '@commonTypes'
import { navigationLinks } from '@constants'
import { Box, Card, Text } from '@mantine/core'

export interface RelatedBlogCardProps {
  blog?: OfficialBlog | null
}

function RelatedBlogCard({ blog }: RelatedBlogCardProps) {
  const router = useRouter()

  return (
    <Card
      onClick={() =>
        router.push(
          navigationLinks.officialBlogs.viewOfficialBlog(
            encodeURIComponent(blog?.slug || '')
          )
        )
      }
      className='flex cursor-pointer flex-col overflow-hidden rounded-lg bg-default-background p-0 shadow-md'
    >
      {/* Image Section */}
      <Box className='relative h-52 w-full overflow-hidden'>
        <Image
          src={blog?.media?.url || ''}
          alt={blog?.media?.alt || 'Blog image'}
          width={400}
          height={400}
          className='h-full w-full object-cover'
        />
      </Box>

      {/* Content Section */}
      <Box className='flex flex-1 flex-col gap-2 px-5 py-4'>
        <Text
          component='h3'
          className='line-clamp-1 text-xl font-semibold text-neutral-900'
        >
          {blog?.title}
        </Text>
        <Text className='line-clamp-1 text-sm text-neutral-600'>
          {blog?.description}
        </Text>
      </Box>
    </Card>
  )
}

export default RelatedBlogCard
