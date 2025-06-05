import {
  GENERAL_ENDPOINTS,
  GetLeadParams,
  GetLeadQuery,
  GetLeadResponse,
  LEADS_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getLead = async (params: GetLeadParams & GetLeadQuery) => {
  const response = await axiosApi.get<GetLeadResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.LEADS}${LEADS_ENDPOINTS.GET_ONE.replace(':id', params.id)}`,
    {
      params: { ...params, id: undefined }
    }
  )
  return response.data
}
