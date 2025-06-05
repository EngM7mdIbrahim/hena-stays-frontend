import {
  CreateSubCategoryRequest,
  CreateSubCategoryResponse,
  GENERAL_ENDPOINTS,
  SUB_CATEGORIES_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const createSubCategory = async (data: CreateSubCategoryRequest) => {
  const response = await axiosApi.post<CreateSubCategoryResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.SUBCATEGORIES}${SUB_CATEGORIES_ENDPOINTS.CREATE}`,
    data
  )
  return response.data
}
