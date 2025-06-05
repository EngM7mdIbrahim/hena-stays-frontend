import { useMemo } from 'react'

import { useGetNotifications } from '@hooks/query/notifications/useGetNotifications'
import { useInfiniteScroll } from '@hooks/useInfiniteScroll'
import { extractItems } from '@utils'

export interface UseNotificationsListProps {
  inViewport?: boolean
}

export function useNotificationsList({
  inViewport
}: UseNotificationsListProps = {}) {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetNotifications({
    limit: '10'
  })

  const notifications = useMemo(() => extractItems(data), [data])

  useInfiniteScroll(fetchNextPage, hasNextPage, [inViewport])

  return {
    notifications,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    data
  }
}
