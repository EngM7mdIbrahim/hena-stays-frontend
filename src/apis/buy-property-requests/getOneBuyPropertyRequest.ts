import {
  GENERAL_ENDPOINTS,
  GetOneRequestBuyPropertyQuery,
  GetOneRequestBuyPropertyRequestParams,
  GetOneRequestBuyPropertyResponse,
  REQUEST_BUY_PROPERTIES_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getOneBuyPropertyRequest = async (
  params: GetOneRequestBuyPropertyQuery & GetOneRequestBuyPropertyRequestParams
) => {
  const response = await axiosApi.get<GetOneRequestBuyPropertyResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.REQUEST_BUY_PROPERTY}${REQUEST_BUY_PROPERTIES_ENDPOINTS.GET_ONE.replace(':id', params.id)}`,
    {
      params: { ...params, id: undefined }
    }
  )
  return response.data
}
