import {
  GENERAL_ENDPOINTS,
  GetOneRequestSellPropertyQuery,
  GetOneRequestSellPropertyRequestParams,
  GetOneRequestSellPropertyResponse,
  REQUEST_SELL_PROPERTIES_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getOneSellPropertyRequest = async (
  params: GetOneRequestSellPropertyQuery &
    GetOneRequestSellPropertyRequestParams
) => {
  const response = await axiosApi.get<GetOneRequestSellPropertyResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.REQUEST_SELL_PROPERTY}${REQUEST_SELL_PROPERTIES_ENDPOINTS.GET_ONE.replace(':id', params.id)}`,
    {
      params: { ...params, id: undefined }
    }
  )
  return response.data
}
