import {
  CONTRACT_US_ENDPOINTS,
  GENERAL_ENDPOINTS,
  GetContactUsRequestParams,
  GetContactUsResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const getOneContactUs = async ({ id }: GetContactUsRequestParams) => {
  const response = await axiosApi.get<GetContactUsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CONTACT_US}${CONTRACT_US_ENDPOINTS.GET_BY_ID.replace(
      ':id',
      id
    )}`
  )
  return response.data
}
