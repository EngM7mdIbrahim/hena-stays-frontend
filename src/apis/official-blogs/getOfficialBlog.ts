import {
  FindOneOfficialBlogQuery,
  FindOneOfficialBlogResponse,
  GENERAL_ENDPOINTS,
  OFFICIAL_BLOGS_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getOfficialBlog = async ({
  slug,
  ...params
}: { slug: string } & FindOneOfficialBlogQuery) => {
  const response = await axiosApi.get<FindOneOfficialBlogResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.OFFICIAL_BLOGS}${OFFICIAL_BLOGS_ENDPOINTS.GET_BY_SLUG.replace(':slug', slug)}`,
    {
      params: { ...params, slug: undefined }
    }
  )
  return response.data
}
