import {
  AMENITY_ENDPOINTS,
  GENERAL_ENDPOINTS,
  UpdateAmenityRequestBody,
  UpdateAmenityRequestParams,
  UpdateAmenityResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const updateAmenity = async ({
  id,
  ...data
}: UpdateAmenityRequestBody & UpdateAmenityRequestParams) => {
  const response = await axiosApi.put<UpdateAmenityResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.AMENITIES}${AMENITY_ENDPOINTS.UPDATE.replace(':id', id)}`,
    data
  )
  return response.data
}
