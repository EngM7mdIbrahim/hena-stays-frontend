import {
  CALL_REQUEST_ENDPOINTS,
  GENERAL_ENDPOINTS,
  GetOneCallRequestRequestParams,
  GetOneCallRequestResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const getOneCallRequest = async (
  params: GetOneCallRequestRequestParams
) => {
  const response = await axiosApi.get<GetOneCallRequestResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CALL_REQUESTS}${CALL_REQUEST_ENDPOINTS.GET_ONE.replace(':id', params.id)}`,
    {
      params: { ...params, id: undefined }
    }
  )
  return response.data
}
