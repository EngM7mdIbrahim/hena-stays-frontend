import {
  FindAllPostSavesRequestQuery,
  FindAllPostSavesResponse,
  GENERAL_ENDPOINTS,
  POSTS_SAVES_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getPostSaves = async (params: FindAllPostSavesRequestQuery) => {
  const response = await axiosApi.get<FindAllPostSavesResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.POSTS_SAVES}${POSTS_SAVES_ENDPOINTS.READ}`,
    {
      params
    }
  )
  return response.data
}
