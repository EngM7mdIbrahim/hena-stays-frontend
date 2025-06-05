import { getNewsById } from '@apis'
import { FindNewsRequestParams, FindNewsResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetNewsByIdOptions = UseQueryOptions<
  FindNewsResponse,
  ShowError,
  FindNewsResponse
>

export const useGetNewsById = (
  params: FindNewsRequestParams,
  options?: UseGetNewsByIdOptions
) => {
  return useQuery<FindNewsResponse, ShowError, FindNewsResponse>({
    ...options,
    queryKey: [...QUERY_KEYS.NEWS.SINGLE_NEWS(params.id), params],
    queryFn: () => getNewsById(params),
    enabled: !!params.id
  })
}
