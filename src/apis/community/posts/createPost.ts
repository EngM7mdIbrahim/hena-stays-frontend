import {
  CreatePostRequest,
  CreatePostResponse,
  GENERAL_ENDPOINTS,
  POSTS_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const createPost = async (data: CreatePostRequest) => {
  const response = await axiosApi.post<CreatePostResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.POSTS}${POSTS_ENDPOINTS.CREATE}`,
    data
  )
  return response.data
}
