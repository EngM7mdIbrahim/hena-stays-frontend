import {
  AddPostSaveRequest,
  AddPostSaveResponse,
  GENERAL_ENDPOINTS,
  POSTS_SAVES_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const addPostSave = async (data: AddPostSaveRequest) => {
  const response = await axiosApi.post<AddPostSaveResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.POSTS_SAVES}${POSTS_SAVES_ENDPOINTS.CREATE}`,
    data
  )
  return response.data
}
