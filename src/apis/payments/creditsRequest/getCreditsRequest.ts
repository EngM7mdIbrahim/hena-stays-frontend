import {
  CREDITS_REQUESTS_ENDPOINTS,
  GENERAL_ENDPOINTS,
  GetCreditRequestParam,
  GetCreditRequestQuery,
  GetCreditRequestResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const getCreditsRequest = async (
  params: GetCreditRequestParam & GetCreditRequestQuery
) => {
  const response = await axiosApi.get<GetCreditRequestResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CREDITS_REQUESTS}${CREDITS_REQUESTS_ENDPOINTS.GET_ONE.replace(':id', params.id)}`,
    {
      params: { ...params, id: undefined }
    }
  )
  return response.data
}
