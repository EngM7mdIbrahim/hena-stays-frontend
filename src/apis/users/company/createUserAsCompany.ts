import {
  CreateCompanyUserRequest,
  CreateCompanyUserResponse,
  GENERAL_ENDPOINTS,
  USER_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const createUserAsCompany = async (data: CreateCompanyUserRequest) => {
  const response = await axiosApi.post<CreateCompanyUserResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.USERS}${USER_ENDPOINTS.CREATE_AS_COMPANY}`,
    data
  )
  return response.data
}
