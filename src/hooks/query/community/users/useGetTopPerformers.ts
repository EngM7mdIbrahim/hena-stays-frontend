import { getTopPerformers } from '@apis'
import { GetTopPerformersQuery, GetTopPerformersResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

export type UseGetTopPerformersOptions = UseQueryOptions<
  GetTopPerformersResponse,
  ShowError,
  GetTopPerformersResponse
>

export const useGetTopPerformers = (
  params: GetTopPerformersQuery,
  options?: Partial<UseGetTopPerformersOptions>
) => {
  return useQuery<GetTopPerformersResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.COMMUNITY.USERS, params],
    queryFn: () => getTopPerformers(params),
    refetchOnWindowFocus: false
  })
}
