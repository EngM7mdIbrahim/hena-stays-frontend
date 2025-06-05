import {
  GENERAL_ENDPOINTS,
  REQUEST_BUY_PROPERTIES_ENDPOINTS,
  UpdateRequestBuyPropertyRequestBody,
  UpdateRequestBuyPropertyRequestParams,
  UpdateRequestBuyPropertyResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const updateBuyPropertyRequest = async ({
  id,
  ...data
}: UpdateRequestBuyPropertyRequestBody &
  UpdateRequestBuyPropertyRequestParams) => {
  const response = await axiosApi.patch<UpdateRequestBuyPropertyResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.REQUEST_BUY_PROPERTY}${REQUEST_BUY_PROPERTIES_ENDPOINTS.UPDATE.replace(':id', id)}`,
    data
  )
  return response.data
}
