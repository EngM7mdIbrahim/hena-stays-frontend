import { getSubCategory } from '@apis'
import {
  GetOneSubCategoryRequestParams,
  GetOneSubCategoryResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetSubCategoryByIdOptions = UseQueryOptions<
  GetOneSubCategoryResponse,
  ShowError,
  GetOneSubCategoryResponse
>

export const useGetSubCategoryById = (
  { id }: GetOneSubCategoryRequestParams,
  options?: UseGetSubCategoryByIdOptions
) => {
  return useQuery<
    GetOneSubCategoryResponse,
    ShowError,
    GetOneSubCategoryResponse
  >({
    ...options,
    queryKey: [QUERY_KEYS.COMMUNITY.Blogs, id],
    queryFn: () => getSubCategory({ id }),
    enabled: !!id
  })
}
