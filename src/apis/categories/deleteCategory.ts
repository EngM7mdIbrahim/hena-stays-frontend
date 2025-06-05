import {
  CATEGORIES_ENDPOINTS,
  DeleteCategoryParams,
  DeleteCategoryResponse,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const deleteCategory = async ({ id }: DeleteCategoryParams) => {
  const response = await axiosApi.delete<DeleteCategoryResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CATEGORIES}${CATEGORIES_ENDPOINTS.DELETE.replace(':id', id)}`
  )
  return response
}
