import {
  DeletePostSaveRequest,
  DeletePostSaveResponse,
  GENERAL_ENDPOINTS,
  POSTS_SAVES_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const deletePostSave = async (data: DeletePostSaveRequest) => {
  const response = await axiosApi.delete<DeletePostSaveResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.POSTS_SAVES}${POSTS_SAVES_ENDPOINTS.DELETE}`,
    {
      data
    }
  )
  return response
}
