import {
  GENERAL_ENDPOINTS,
  OFFICIAL_BLOGS_ENDPOINTS,
  UpdateOfficialBlogRequest,
  UpdateOfficialBlogResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const updateOfficialBlog = async ({
  id,
  ...data
}: UpdateOfficialBlogRequest) => {
  const response = await axiosApi.patch<UpdateOfficialBlogResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.OFFICIAL_BLOGS}${OFFICIAL_BLOGS_ENDPOINTS.UPDATE.replace(':id', id)}`,
    data
  )
  return response.data
}
