import {
  CONFIG_ENDPOINTS,
  GENERAL_ENDPOINTS,
  GetConfigResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const getConfig = async () => {
  const response = await axiosApi.get<GetConfigResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CONFIG}${CONFIG_ENDPOINTS.GET}`
  )

  return response.data
}
