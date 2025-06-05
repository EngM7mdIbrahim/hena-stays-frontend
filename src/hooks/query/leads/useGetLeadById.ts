import { getLead } from '@apis'
import { GetLeadParams, GetLeadQuery, GetLeadResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type UseGetLeadByIdOptions = UseQueryOptions<
  GetLeadResponse,
  Error,
  GetLeadResponse
>

export const useGetLeadById = (
  params: GetLeadParams & GetLeadQuery,
  options?: UseGetLeadByIdOptions
) => {
  return useQuery<GetLeadResponse, Error>({
    ...options,
    queryKey: [QUERY_KEYS.LEADS.SINGLE_LEAD(params.id)],
    queryFn: () => getLead(params),
    enabled: !!params.id
  })
}
