import {
  DeleteOfficialBlogRequest,
  DeleteOfficialBlogResponse,
  GENERAL_ENDPOINTS,
  OFFICIAL_BLOGS_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const deleteOfficialBlog = async ({ id }: DeleteOfficialBlogRequest) => {
  const response = await axiosApi.delete<DeleteOfficialBlogResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.OFFICIAL_BLOGS}${OFFICIAL_BLOGS_ENDPOINTS.DELETE.replace(':id', id)}`
  )
  return response
}
