import {
  DeleteLeadsRequestParams,
  DeleteLeadsResponse,
  GENERAL_ENDPOINTS,
  LEADS_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const deleteLead = async ({ id }: DeleteLeadsRequestParams) => {
  const response = await axiosApi.delete<DeleteLeadsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.LEADS}${LEADS_ENDPOINTS.DELETE.replace(':id', id)}`
  )
  return response.data
}
