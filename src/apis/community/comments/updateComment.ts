import {
  COMMENTS_ENDPOINTS,
  GENERAL_ENDPOINTS,
  UpdateCommentRequest,
  UpdateCommentResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const updateComment = async ({ id, ...data }: UpdateCommentRequest) => {
  const response = await axiosApi.put<UpdateCommentResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.COMMENTS}${COMMENTS_ENDPOINTS.UPDATE.replace(':id', id)}`,
    data
  )
  return response.data
}
