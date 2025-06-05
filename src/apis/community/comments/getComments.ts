import {
  COMMENTS_ENDPOINTS,
  FindAllCommentsRequestQuery,
  FindAllCommentsResponse,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getComments = async (params: FindAllCommentsRequestQuery) => {
  const response = await axiosApi.get<FindAllCommentsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.COMMENTS}${COMMENTS_ENDPOINTS.READ}`,
    { params }
  )
  return response.data
}
