import { getInteraction } from '@apis'
import {
  GetOneInteractionsRequestParams,
  GetOneInteractionsRequestQuery,
  GetOneInteractionsResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type UseGetInteractionByIdOptions = UseQueryOptions<
  GetOneInteractionsResponse,
  Error,
  GetOneInteractionsResponse
>

export const useGetInteractionById = (
  params: GetOneInteractionsRequestParams & GetOneInteractionsRequestQuery,
  options?: UseGetInteractionByIdOptions
) => {
  return useQuery<GetOneInteractionsResponse, Error>({
    ...options,
    queryKey: [QUERY_KEYS.INTERACTIONS.SINGLE_INTERACTION(params.id)],
    queryFn: () => getInteraction(params),
    enabled: !!params.id
  })
}
