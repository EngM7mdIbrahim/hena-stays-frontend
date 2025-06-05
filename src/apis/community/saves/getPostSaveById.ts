import {
  FindPostSaveRequest,
  FindPostSaveResponse,
  GENERAL_ENDPOINTS,
  POSTS_SAVES_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getPostSaveById = async ({ id }: FindPostSaveRequest) => {
  const response = await axiosApi.get<FindPostSaveResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.POSTS_SAVES}${POSTS_SAVES_ENDPOINTS.GET_BY_ID}${id}`
  )
  return response.data
}
