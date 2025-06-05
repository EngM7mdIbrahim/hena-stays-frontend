import { useEffect, useMemo, useState } from 'react'
import { FindAllBlogsRequestQuery } from '@commonTypes'

import { useGetBlogs } from '@hooks/query/community/blogs/useGetBlogs'
import { useInfiniteScroll } from '@hooks/useInfiniteScroll'
import { useUpdateSearchParams } from '@hooks/useUpdateSearchParams'
import { extractItems } from '@utils'

export interface UseBlogsListProps {
  id?: string
  inViewport?: boolean
}

export function useBlogsList({ id, inViewport }: UseBlogsListProps = {}) {
  const [filters, setFilters] = useState<
    Pick<FindAllBlogsRequestQuery, 'filter' | 'text'>
  >({})
  const { updateSearchParams } = useUpdateSearchParams({
    onFiltersChange: setFilters
  })

  // Update URL whenever filters change
  useEffect(() => {
    updateSearchParams(filters)
  }, [filters, updateSearchParams])

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetBlogs({
    limit: '10',
    text: filters.text,
    filter: {
      ...(id && { user: id })
    },
    showFields: {
      user: true
    }
  })

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
    filters,
    setFilters
  }
}
