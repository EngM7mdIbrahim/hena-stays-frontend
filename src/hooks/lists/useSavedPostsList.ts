import { useMemo } from 'react'

import { useGetPostSaves } from '@hooks/query'
import { useInfiniteScroll } from '@hooks/useInfiniteScroll'
import { useUser } from '@hooks/useUser'
import { extractItems } from '@utils'

import { UsePostsListProps } from './usePostsList'

export function useSavedPostsList({ inViewport }: UsePostsListProps = {}) {
  const { user: loggedInUser } = useUser()

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetPostSaves({
    limit: '10',
    filter: {
      user: loggedInUser?._id
    },
    showFields: {
      post: {
        user: true
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
    data
  }
}
