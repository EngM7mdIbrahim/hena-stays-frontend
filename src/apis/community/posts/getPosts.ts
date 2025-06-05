import {
  FindAllPostsRequestQuery,
  FindAllPostsResponse,
  GENERAL_ENDPOINTS,
  POSTS_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getPosts = async (params: FindAllPostsRequestQuery) => {
  const response = await axiosApi.get<FindAllPostsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.POSTS}${POSTS_ENDPOINTS.READ}`,
    {
      params
    }
  )
  return response.data
}
