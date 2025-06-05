import {
  BLOGS_ENDPOINTS,
  CreateBlogRequest,
  CreateBlogResponse,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const createBlog = async (data: CreateBlogRequest) => {
  const response = await axiosApi.post<CreateBlogResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.BLOGS}${BLOGS_ENDPOINTS.CREATE}`,
    data
  )
  return response.data
}
