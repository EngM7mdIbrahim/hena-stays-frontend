import {
  GENERAL_ENDPOINTS,
  GetAllLeadsQuery,
  GetAllLeadsResponse,
  LEADS_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getLeads = async (params: GetAllLeadsQuery) => {
  const response = await axiosApi.get<GetAllLeadsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.LEADS}${LEADS_ENDPOINTS.GET_ALL}`,
    {
      params
    }
  )
  return response.data
}
