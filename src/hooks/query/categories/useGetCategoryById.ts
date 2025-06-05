import { getCategory } from '@apis'
import { GetCategoryParams, GetCategoryResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetCategoryByIdOptions = UseQueryOptions<
  GetCategoryResponse,
  ShowError,
  GetCategoryResponse
>

export const useGetCategoryById = (
  { id }: GetCategoryParams,
  options?: UseGetCategoryByIdOptions
) => {
  return useQuery<GetCategoryResponse, ShowError, GetCategoryResponse>({
    ...options,
    queryKey: [QUERY_KEYS.COMMUNITY.Blogs, id],
    queryFn: () => getCategory({ id }),
    enabled: !!id
  })
}
