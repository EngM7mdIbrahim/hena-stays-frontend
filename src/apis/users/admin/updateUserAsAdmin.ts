import {
  GENERAL_ENDPOINTS,
  UpdateCompanyUserRequestBody,
  UpdateCompanyUserRequestParams,
  UpdateCompanyUserResponse,
  USER_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const updateUserAsAdmin = async ({
  id,
  ...data
}: UpdateCompanyUserRequestBody & UpdateCompanyUserRequestParams) => {
  const response = await axiosApi.patch<UpdateCompanyUserResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.USERS}${USER_ENDPOINTS.UPDATE_USER_AS_ADMIN.replace(':id', id)}`,
    data
  )
  return response.data
}
