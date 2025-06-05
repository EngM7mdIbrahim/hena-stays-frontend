import {
  DeleteUserRequestParams,
  DeleteUserResponse,
  GENERAL_ENDPOINTS,
  USER_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const deleteUserAsAdmin = async ({ id }: DeleteUserRequestParams) => {
  const response = await axiosApi.delete<DeleteUserResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.USERS}${USER_ENDPOINTS.DELETE_AS_ADMIN.replace(':id', id)}`
  )
  return response
}
