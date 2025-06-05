import {
  GENERAL_ENDPOINTS,
  POSTS_ENDPOINTS,
  UpdatePostRequest,
  UpdatePostResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const updatePost = async ({ id, ...data }: UpdatePostRequest) => {
  const response = await axiosApi.put<UpdatePostResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.POSTS}${POSTS_ENDPOINTS.UPDATE.replace(':id', id)}`,
    data
  )
  return response.data
}
