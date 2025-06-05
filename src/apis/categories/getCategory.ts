import {
  CATEGORIES_ENDPOINTS,
  GENERAL_ENDPOINTS,
  GetCategoryParams,
  GetCategoryResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const getCategory = async ({ id }: GetCategoryParams) => {
  const response = await axiosApi.get<GetCategoryResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CATEGORIES}${CATEGORIES_ENDPOINTS.GET_BY_ID.replace(':id', id)}`
  )
  return response.data
}
