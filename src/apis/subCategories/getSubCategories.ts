import {
  GENERAL_ENDPOINTS,
  GetAllSubCategoriesQuery,
  GetAllSubCategoriesResponse,
  SUB_CATEGORIES_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getSubCategories = async (params: GetAllSubCategoriesQuery) => {
  const response = await axiosApi.get<GetAllSubCategoriesResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.SUBCATEGORIES}${SUB_CATEGORIES_ENDPOINTS.GET_ALL}`,
    {
      params
    }
  )
  return response.data
}
