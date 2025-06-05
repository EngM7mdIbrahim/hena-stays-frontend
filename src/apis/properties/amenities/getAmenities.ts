import {
  AMENITY_ENDPOINTS,
  FindAllAmenitiesRequestQuery,
  FindAllAmenitiesResponse,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getAmenities = async (params: FindAllAmenitiesRequestQuery) => {
  const response = await axiosApi.get<FindAllAmenitiesResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.AMENITIES}${AMENITY_ENDPOINTS.GET_ALL}`,
    {
      params
    }
  )
  return response.data
}
