import {
  CONTRACT_US_ENDPOINTS,
  GENERAL_ENDPOINTS,
  UpdateContactUsRequestBody,
  UpdateContactUsRequestParams,
  UpdateContactUsResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const updateContactUs = async ({
  id,
  ...data
}: UpdateContactUsRequestParams & UpdateContactUsRequestBody) => {
  const response = await axiosApi.patch<UpdateContactUsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CONTACT_US}${CONTRACT_US_ENDPOINTS.UPDATE.replace(
      ':id',
      id
    )}`,
    data
  )
  return response.data
}
