import { PaginationResponse } from '@commonTypes'
import { InfiniteData } from '@tanstack/react-query'

export const extractItems = <T>(
  data: InfiniteData<PaginationResponse<T>> | undefined
) => data?.pages?.flatMap((page) => page.items) ?? []
