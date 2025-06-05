import {
  COMMENTS_ENDPOINTS,
  DeleteCommentRequest,
  DeleteCommentResponse,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const deleteComment = async ({ id }: DeleteCommentRequest) => {
  const response = await axiosApi.delete<DeleteCommentResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.COMMENTS}${COMMENTS_ENDPOINTS.DELETE.replace(':id', id)}`
  )
  return response
}
