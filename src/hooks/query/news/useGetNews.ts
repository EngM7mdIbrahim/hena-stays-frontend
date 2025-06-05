import { getNews } from '@apis'
import { FindAllNewsRequestQuery, FindAllNewsResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetNewsOptions = UseQueryOptions<
  FindAllNewsResponse,
  ShowError,
  FindAllNewsResponse
>

export const useGetNews = (
  params: FindAllNewsRequestQuery = {},
  options?: UseGetNewsOptions
) => {
  return useQuery<FindAllNewsResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.NEWS.NEWS, params],
    queryFn: () => getNews(params),
    refetchOnWindowFocus: false
  })
}
