import {
  AMENITY_ENDPOINTS,
  DeleteAmenityRequestParams,
  DeleteAmenityResponse,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const deleteAmenity = async ({ id }: DeleteAmenityRequestParams) => {
  const response = await axiosApi.delete<DeleteAmenityResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.AMENITIES}${AMENITY_ENDPOINTS.DELETE.replace(':id', id)}`
  )
  return response
}
