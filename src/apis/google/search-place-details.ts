import {
  GENERAL_ENDPOINTS,
  GOOGLE_ENDPOINTS,
  SearchPlaceRequestQuery,
  SearchPlaceResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export async function searchPlaceDetails(params: SearchPlaceRequestQuery) {
  const response = await axiosApi.get<SearchPlaceResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.GOOGLE}${GOOGLE_ENDPOINTS.PLACE_SEARCH}`,
    { params }
  )
  return response.data
}
