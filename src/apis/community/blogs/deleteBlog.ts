import {
  BLOGS_ENDPOINTS,
  DeleteBlogRequestParams,
  DeleteBlogResponse,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const deleteBlog = async ({ id }: DeleteBlogRequestParams) => {
  const response = await axiosApi.delete<DeleteBlogResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.BLOGS}${BLOGS_ENDPOINTS.DELETE.replace(':id', id)}`
  )
  return response
}
