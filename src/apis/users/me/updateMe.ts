import {
  GENERAL_ENDPOINTS,
  UpdateUserRequestBody,
  UpdateUserResponse,
  USER_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const updateMe = async (data: UpdateUserRequestBody) => {
  const response = await axiosApi.patch<UpdateUserResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.USERS}${USER_ENDPOINTS.UPDATE_ME}`,
    data
  )
  return response.data
}
