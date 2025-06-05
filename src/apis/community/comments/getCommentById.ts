import {
  COMMENTS_ENDPOINTS,
  FindCommentRequestParams,
  FindCommentResponse,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getCommentById = async ({ id }: FindCommentRequestParams) => {
  const response = await axiosApi.get<FindCommentResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.COMMENTS}${COMMENTS_ENDPOINTS.GET_BY_ID}${id}`
  )
  return response.data
}
