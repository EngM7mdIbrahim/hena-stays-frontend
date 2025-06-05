import {
  GENERAL_ENDPOINTS,
  SUB_CATEGORIES_ENDPOINTS,
  UpdateSubCategoryRequest,
  UpdateSubCategoryRequestParams,
  UpdateSubCategoryResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const updateSubCategory = async ({
  id,
  ...data
}: UpdateSubCategoryRequestParams & UpdateSubCategoryRequest) => {
  const response = await axiosApi.put<UpdateSubCategoryResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CATEGORIES}${SUB_CATEGORIES_ENDPOINTS.UPDATE.replace(':id', id)}`,
    data
  )
  return response.data
}
