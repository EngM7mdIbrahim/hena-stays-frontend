import {
  FindOnePostQuery,
  FindPostRequestParams,
  FindPostResponse,
  GENERAL_ENDPOINTS,
  POSTS_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getPostById = async ({
  id,
  ...params
}: FindPostRequestParams & FindOnePostQuery) => {
  const response = await axiosApi.get<FindPostResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.POSTS}${POSTS_ENDPOINTS.GET_BY_ID.replace(':id', id)}`,
    {
      params: { ...params, id: undefined }
    }
  )
  return response.data
}
