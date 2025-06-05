import {
  DeletePropertySaveRequest,
  DeletePropertySaveResponse,
  GENERAL_ENDPOINTS,
  PROPERTY_SAVES_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const deletePropertySave = async (data: DeletePropertySaveRequest) => {
  const response = await axiosApi.delete<DeletePropertySaveResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.PROPERTY_SAVES}${PROPERTY_SAVES_ENDPOINTS.DELETE}`,
    {
      data
    }
  )
  return response
}
