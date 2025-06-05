import {
  CONFIG_ENDPOINTS,
  GENERAL_ENDPOINTS,
  UpdateConfigRequestBody,
  UpdateConfigResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const updateConfig = async (data: UpdateConfigRequestBody) => {
  const response = await axiosApi.patch<UpdateConfigResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CONFIG}${CONFIG_ENDPOINTS.UPDATE}`,
    data
  )

  return response.data
}
