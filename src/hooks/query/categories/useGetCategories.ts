import { getCategories } from '@apis'
import { GetAllCategoryResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetCategoriesOptions = UseQueryOptions<
  GetAllCategoryResponse,
  ShowError,
  GetAllCategoryResponse
>

export const useGetCategories = (
  params: {},
  options?: UseGetCategoriesOptions
) => {
  return useQuery<GetAllCategoryResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.CATEGORIES, params],
    queryFn: () => getCategories(params)
  })
}
