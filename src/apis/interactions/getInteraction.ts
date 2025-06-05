import {
  GENERAL_ENDPOINTS,
  GetOneInteractionsRequestParams,
  GetOneInteractionsRequestQuery,
  GetOneInteractionsResponse,
  INTERACTIONS_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getInteraction = async (
  params: GetOneInteractionsRequestParams & GetOneInteractionsRequestQuery
) => {
  const response = await axiosApi.get<GetOneInteractionsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.INTERACTIONS}${INTERACTIONS_ENDPOINTS.GET_ONE.replace(':id', params.id)}`,
    {
      params: { ...params, id: undefined }
    }
  )
  return response.data
}
