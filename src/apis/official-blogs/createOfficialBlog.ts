import {
  CreateOfficialBlogRequest,
  CreateOfficialBlogResponse,
  GENERAL_ENDPOINTS,
  OFFICIAL_BLOGS_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const createOfficialBlog = async (data: CreateOfficialBlogRequest) => {
  const response = await axiosApi.post<CreateOfficialBlogResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.OFFICIAL_BLOGS}${OFFICIAL_BLOGS_ENDPOINTS.CREATE}`,
    data
  )
  return response.data
}
