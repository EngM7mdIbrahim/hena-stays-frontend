import {
  CreateAsAdminRequest,
  CreateCompanyUserResponse,
  GENERAL_ENDPOINTS,
  USER_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const createUserAsAdmin = async (data: CreateAsAdminRequest) => {
  const response = await axiosApi.post<CreateCompanyUserResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.USERS}${USER_ENDPOINTS.CREATE_AS_ADMIN}`,
    data
  )
  return response.data
}
