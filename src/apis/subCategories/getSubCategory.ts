import {
  GENERAL_ENDPOINTS,
  GetOneSubCategoryRequestParams,
  GetOneSubCategoryResponse,
  SUB_CATEGORIES_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getSubCategory = async ({
  id
}: GetOneSubCategoryRequestParams) => {
  const response = await axiosApi.get<GetOneSubCategoryResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.SUBCATEGORIES}${SUB_CATEGORIES_ENDPOINTS.GET_BY_ID.replace(':id', id)}`
  )
  return response.data
}
