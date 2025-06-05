import { getInteractions } from '@apis'
import {
  GetAllInteractionsQuery,
  GetAllInteractionsResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

export type UseGetInteractionsOptions = UseQueryOptions<
  GetAllInteractionsResponse,
  ShowError,
  GetAllInteractionsResponse
>

export const useGetInteractions = (
  params: GetAllInteractionsQuery,
  options?: Partial<UseGetInteractionsOptions>
) => {
  return useQuery<GetAllInteractionsResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.INTERACTIONS.INTERACTIONS, params],
    queryFn: () => getInteractions(params)
  })
}
