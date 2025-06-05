import {
  GENERAL_ENDPOINTS,
  GetOneUserParams,
  GetOneUserQuery,
  GetOneUserResponse,
  USER_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getUserAsAdmin = async (
  params: GetOneUserQuery & GetOneUserParams
) => {
  const response = await axiosApi.get<GetOneUserResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.USERS}${USER_ENDPOINTS.GET_ONE.replace(':id', params.id)}`,
    {
      params: { ...params, id: undefined }
    }
  )
  return response.data
}
