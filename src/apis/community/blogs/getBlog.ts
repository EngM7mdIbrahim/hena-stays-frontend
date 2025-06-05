import {
  BLOGS_ENDPOINTS,
  FindBlogQuery,
  FindBlogRequestParams,
  FindBlogResponse,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getBlog = async ({
  id,
  ...params
}: FindBlogRequestParams & FindBlogQuery) => {
  const response = await axiosApi.get<FindBlogResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.BLOGS}${BLOGS_ENDPOINTS.GET_BY_ID.replace(':id', id)}`,
    {
      params: { ...params, id: undefined }
    }
  )
  return response.data
}
