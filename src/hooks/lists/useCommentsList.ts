import { useMemo } from 'react'

import { useGetComments } from '@hooks/query/community/comments/useGetComments'
import { extractItems } from '@utils'

export interface UseCommentsListProps {
  postId?: string
}

export function useCommentsList({ postId }: UseCommentsListProps = {}) {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetComments({
    limit: '5',
    filter: {
      ...(postId && { post: postId })
    },
    showFields: {
      user: true
    }
  })

  const comments = useMemo(() => extractItems(data), [data])

  return {
    comments,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    data,
    fetchNextPage
  }
}
