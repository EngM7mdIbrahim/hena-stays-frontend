import {
  GENERAL_ENDPOINTS,
  GetTopPerformersQuery,
  GetTopPerformersResponse,
  USER_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getTopPerformers = async (params: GetTopPerformersQuery) => {
  const response = await axiosApi.get<GetTopPerformersResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.USERS}${USER_ENDPOINTS.GET_TOP_PERFORMERS}`,
    {
      params
    }
  )
  return response.data
}
