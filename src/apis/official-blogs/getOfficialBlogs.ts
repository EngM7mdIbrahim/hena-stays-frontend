import {
  FindAllOfficialBlogsRequestQuery,
  FindAllOfficialBlogsResponse,
  GENERAL_ENDPOINTS,
  OFFICIAL_BLOGS_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getOfficialBlogs = async (
  params: FindAllOfficialBlogsRequestQuery
) => {
  const response = await axiosApi.get<FindAllOfficialBlogsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.OFFICIAL_BLOGS}${OFFICIAL_BLOGS_ENDPOINTS.READ}`,
    {
      params
    }
  )
  return response.data
}
