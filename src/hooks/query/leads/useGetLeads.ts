import { getLeads } from '@apis'
import { GetAllLeadsQuery, GetAllLeadsResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

export type UseGetLeadsOptions = UseQueryOptions<
  GetAllLeadsResponse,
  ShowError,
  GetAllLeadsResponse
>

export const useGetLeads = (
  params: GetAllLeadsQuery,
  options?: Partial<UseGetLeadsOptions>
) => {
  return useQuery<GetAllLeadsResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.LEADS.LEADS, params],
    queryFn: () => getLeads(params)
  })
}
