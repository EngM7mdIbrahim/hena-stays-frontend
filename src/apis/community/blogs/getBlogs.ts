import {
  BLOGS_ENDPOINTS,
  FindAllBlogsRequestQuery,
  FindAllBlogsResponse,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getBlogs = async (params: FindAllBlogsRequestQuery) => {
  const response = await axiosApi.get<FindAllBlogsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.BLOGS}${BLOGS_ENDPOINTS.READ}`,
    {
      params
    }
  )
  return response.data
}
