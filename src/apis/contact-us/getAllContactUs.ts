import {
  CONTRACT_US_ENDPOINTS,
  FindAllContactUsRequestQuery,
  FindAllContactUsResponse,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getAllContactUs = async (
  params?: FindAllContactUsRequestQuery
) => {
  const response = await axiosApi.get<FindAllContactUsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CONTACT_US}${CONTRACT_US_ENDPOINTS.GET_ALL}`,
    { params }
  )
  return response.data
}
