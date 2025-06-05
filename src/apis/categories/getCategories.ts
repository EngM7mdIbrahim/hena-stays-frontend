import {
  CATEGORIES_ENDPOINTS,
  GENERAL_ENDPOINTS,
  GetAllCategoryQuery,
  GetAllCategoryResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const getCategories = async (params: GetAllCategoryQuery) => {
  const response = await axiosApi.get<GetAllCategoryResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CATEGORIES}${CATEGORIES_ENDPOINTS.GET_ALL}`,
    {
      params
    }
  )
  return response.data
}
