import {
  CALL_REQUEST_ENDPOINTS,
  DeleteCallRequestRequestParams,
  DeleteCallRequestResponse,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const deleteCallRequest = async ({
  id
}: DeleteCallRequestRequestParams) => {
  const response = await axiosApi.delete<DeleteCallRequestResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CALL_REQUESTS}${CALL_REQUEST_ENDPOINTS.DELETE.replace(':id', id)}`
  )
  return response
}
