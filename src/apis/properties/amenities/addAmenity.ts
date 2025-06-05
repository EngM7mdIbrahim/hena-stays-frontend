import {
  AddAmenityRequest,
  AddAmenityResponse,
  AMENITY_ENDPOINTS,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const addAmenity = async (data: AddAmenityRequest) => {
  const response = await axiosApi.post<AddAmenityResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.AMENITIES}${AMENITY_ENDPOINTS.CREATE}`,
    data
  )
  return response.data
}
