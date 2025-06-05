import {
  GENERAL_ENDPOINTS,
  GetAllInteractionsQuery,
  GetAllInteractionsResponse,
  INTERACTIONS_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getInteractions = async (params: GetAllInteractionsQuery) => {
  const response = await axiosApi.get<GetAllInteractionsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.INTERACTIONS}${INTERACTIONS_ENDPOINTS.GET_ALL}`,
    { params }
  )
  return response.data
}
