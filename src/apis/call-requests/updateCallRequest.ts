import {
  CALL_REQUEST_ENDPOINTS,
  GENERAL_ENDPOINTS,
  UpdateCallRequestRequestBody,
  UpdateCallRequestRequestParams,
  UpdateCallRequestResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const updateCallRequest = async ({
  id,
  ...data
}: UpdateCallRequestRequestBody & UpdateCallRequestRequestParams) => {
  const response = await axiosApi.patch<UpdateCallRequestResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CALL_REQUESTS}${CALL_REQUEST_ENDPOINTS.UPDATE.replace(':id', id)}`,
    data
  )
  return response.data
}
