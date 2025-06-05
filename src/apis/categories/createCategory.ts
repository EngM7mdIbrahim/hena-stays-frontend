import {
  CATEGORIES_ENDPOINTS,
  CreateCategoryRequest,
  CreateCategoryResponse,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const createCategory = async (data: CreateCategoryRequest) => {
  const response = await axiosApi.post<CreateCategoryResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CATEGORIES}${CATEGORIES_ENDPOINTS.CREATE}`,
    data
  )
  return response.data
}
