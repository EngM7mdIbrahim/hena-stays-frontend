import { useEffect, useMemo, useState } from 'react'
import { FindAllPostsRequestQuery } from '@commonTypes'

import { useGetPosts } from '@hooks/query/community/posts/useGetPosts'
import { useInfiniteScroll } from '@hooks/useInfiniteScroll'
import { useUpdateSearchParams } from '@hooks/useUpdateSearchParams'
import { extractItems } from '@utils'

export interface UsePostsListProps {
  id?: string
  inViewport?: boolean
}

export function usePostsList({ id, inViewport }: UsePostsListProps = {}) {
  const [filters, setFilters] = useState<
    Pick<FindAllPostsRequestQuery, 'filter' | 'text'>
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
  } = useGetPosts({
    limit: '10',
    text: filters.text,
    filter: {
      ...(id && { user: id })
    },
    showFields: {
      user: {
        company: true
      }
    }
  })

  const posts = useMemo(() => extractItems(data), [data])

  useInfiniteScroll(fetchNextPage, hasNextPage, [inViewport])

  return {
    posts,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    data,
    filters,
    setFilters
  }
}
