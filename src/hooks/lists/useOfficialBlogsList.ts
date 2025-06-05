import { useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { FindAllOfficialBlogsRequestQuery } from '@commonTypes'
import { navigationLinks } from '@constants'

import { useGetOfficialBlogs } from '@hooks/query/official-blogs/useGetOfficialBlogs'
import { useInfiniteScroll } from '@hooks/useInfiniteScroll'
import { extractItems } from '@utils'

export interface UseOfficialBlogsListProps {
  inViewport?: boolean
}

export function useOfficialBlogsList({
  inViewport
}: UseOfficialBlogsListProps = {}) {
  const pathName = usePathname()

  // this will be for the dropdown when adding official blog
  const [text, setText] = useState<FindAllOfficialBlogsRequestQuery['text']>('')

  const [filters, setFilters] = useState<
    Pick<FindAllOfficialBlogsRequestQuery, 'text'>
  >({})

  const handleEnabled = () => {
    return (
      text?.trim() !== '' ||
      !pathName.includes(navigationLinks.admin.officialBlogs.addOfficialBlog)
    )
  }

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetOfficialBlogs(
    {
      limit: '10',
      text: filters.text || text
    },
    {
      enabled: handleEnabled()
    }
  )

  useInfiniteScroll(fetchNextPage, hasNextPage, [inViewport])

  const blogs = useMemo(() => extractItems(data), [data])

  return {
    data,
    blogs,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    text,
    setText,
    filters,
    setFilters
  }
}
