import {
  CONTRACT_US_ENDPOINTS,
  DeleteContactUsRequestParams,
  DeleteContactUsResponse,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const deleteContactUs = async ({ id }: DeleteContactUsRequestParams) => {
  const response = await axiosApi.delete<DeleteContactUsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CONTACT_US}${CONTRACT_US_ENDPOINTS.DELETE.replace(
      ':id',
      id
    )}`
  )
  return response.data
}
