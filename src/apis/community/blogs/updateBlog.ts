import {
  BLOGS_ENDPOINTS,
  GENERAL_ENDPOINTS,
  UpdateBlogRequest,
  UpdateBlogResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const updateBlog = async ({ id, ...data }: UpdateBlogRequest) => {
  const response = await axiosApi.put<UpdateBlogResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.BLOGS}${BLOGS_ENDPOINTS.UPDATE.replace(':id', id)}`,
    data
  )
  return response.data
}
