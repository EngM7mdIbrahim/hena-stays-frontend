import { getSubCategories } from '@apis'
import {
  GetAllSubCategoriesQuery,
  GetAllSubCategoriesResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

export type UseGetSubCategoriesOptions = UseQueryOptions<
  GetAllSubCategoriesResponse,
  ShowError,
  GetAllSubCategoriesResponse
>

export const useGetSubCategories = (
  params: GetAllSubCategoriesQuery,
  options?: UseGetSubCategoriesOptions
) => {
  return useQuery<GetAllSubCategoriesResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.CATEGORIES, params],
    queryFn: () => getSubCategories(params)
  })
}
