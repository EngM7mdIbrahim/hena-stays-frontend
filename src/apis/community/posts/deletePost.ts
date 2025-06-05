import {
  DeletePostRequest,
  DeletePostResponse,
  GENERAL_ENDPOINTS,
  POSTS_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const deletePost = async ({ id }: DeletePostRequest) => {
  const response = await axiosApi.delete<DeletePostResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.POSTS}${POSTS_ENDPOINTS.DELETE.replace(':id', id)}`
  )
  return response
}
