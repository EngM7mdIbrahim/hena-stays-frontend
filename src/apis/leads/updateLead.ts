import {
  GENERAL_ENDPOINTS,
  LEADS_ENDPOINTS,
  UpdateLeadsRequestBody,
  UpdateLeadsRequestParams,
  UpdateLeadsResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const updateLead = async ({
  id,
  ...data
}: UpdateLeadsRequestBody & UpdateLeadsRequestParams) => {
  const response = await axiosApi.patch<UpdateLeadsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.LEADS}${LEADS_ENDPOINTS.UPDATE.replace(':id', id)}`,
    data
  )
  return response.data
}
