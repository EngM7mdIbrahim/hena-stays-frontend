import {
  CreateLeadsRequest,
  CreateLeadsResponse,
  GENERAL_ENDPOINTS,
  LEADS_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const createLead = async (data: CreateLeadsRequest) => {
  const response = await axiosApi.post<CreateLeadsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.LEADS}${LEADS_ENDPOINTS.CREATE}`,
    data
  )
  return response.data
}
