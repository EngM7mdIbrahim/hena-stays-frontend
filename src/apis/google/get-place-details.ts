import {
  GENERAL_ENDPOINTS,
  GOOGLE_ENDPOINTS,
  PlaceDetailsRequestQuery,
  PlaceDetailsResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const getPlaceDetails = async (params: PlaceDetailsRequestQuery) => {
  const response = await axiosApi.get<PlaceDetailsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.GOOGLE}${GOOGLE_ENDPOINTS.PLACE_DETAILS}`,
    { params }
  )
  return response.data
}
