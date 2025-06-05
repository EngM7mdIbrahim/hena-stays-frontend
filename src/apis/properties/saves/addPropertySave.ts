import {
  AddPropertySaveRequest,
  AddPropertySaveResponse,
  GENERAL_ENDPOINTS,
  PROPERTY_SAVES_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const addPropertySave = async (data: AddPropertySaveRequest) => {
  const response = await axiosApi.post<AddPropertySaveResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.PROPERTY_SAVES}${PROPERTY_SAVES_ENDPOINTS.CREATE}`,
    data
  )
  return response.data
}
