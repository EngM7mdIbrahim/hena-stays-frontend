import {
  CATEGORIES_ENDPOINTS,
  GENERAL_ENDPOINTS,
  UpdateCategoryRequest,
  UpdateCategoryRequestParams,
  UpdateCategoryResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const updateCategory = async ({
  id,
  ...data
}: UpdateCategoryRequestParams & UpdateCategoryRequest) => {
  const response = await axiosApi.put<UpdateCategoryResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CATEGORIES}${CATEGORIES_ENDPOINTS.UPDATE.replace(':id', id)}`,
    data
  )
  return response.data
}
