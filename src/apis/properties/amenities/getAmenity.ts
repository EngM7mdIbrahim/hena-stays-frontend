import {
  AMENITY_ENDPOINTS,
  GENERAL_ENDPOINTS,
  GetAmenityRequestParams,
  GetAmenityResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const getAmenity = async (params: GetAmenityRequestParams) => {
  const response = await axiosApi.get<GetAmenityResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.AMENITIES}${AMENITY_ENDPOINTS.GET_BY_ID.replace(':id', params.id)}`
  )
  return response.data
}
