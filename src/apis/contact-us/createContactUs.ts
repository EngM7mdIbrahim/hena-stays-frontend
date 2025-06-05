import {
  CONTRACT_US_ENDPOINTS,
  CreateContactUsRequest,
  CreateContactUsResponse,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const createContactUs = async (data: CreateContactUsRequest) => {
  const response = await axiosApi.post<CreateContactUsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CONTACT_US}${CONTRACT_US_ENDPOINTS.CREATE}`,
    data
  )
  return response.data
}
