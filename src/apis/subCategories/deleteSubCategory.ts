import {
  DeleteSubCategoryRequestParams,
  DeleteSubCategoryResponse,
  GENERAL_ENDPOINTS,
  SUB_CATEGORIES_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const deleteSubCategory = async ({
  id
}: DeleteSubCategoryRequestParams) => {
  const response = await axiosApi.delete<DeleteSubCategoryResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.SUBCATEGORIES}${SUB_CATEGORIES_ENDPOINTS.DELETE.replace(':id', id)}`
  )
  return response
}
