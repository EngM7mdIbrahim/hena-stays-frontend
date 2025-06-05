import {
  COMMENTS_ENDPOINTS,
  CreateCommentRequest,
  CreateCommentResponse,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const createComment = async (data: CreateCommentRequest) => {
  const response = await axiosApi.post<CreateCommentResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.COMMENTS}${COMMENTS_ENDPOINTS.CREATE}`,
    data
  )
  return response.data
}
