import {
  CREDITS_REQUESTS_ENDPOINTS,
  GENERAL_ENDPOINTS,
  UpdateCreditRequestsBody,
  UpdateCreditRequestsParam,
  UpdateCreditRequestsResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const updateCreditRequestStatus = async ({
  id,
  ...data
}: UpdateCreditRequestsBody & UpdateCreditRequestsParam) => {
  const response = await axiosApi.patch<UpdateCreditRequestsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CREDITS_REQUESTS}${CREDITS_REQUESTS_ENDPOINTS.UPDATE_STATUS.replace(':id', id)}`,
    data
  )
  return response.data
}
