import {
  GENERAL_ENDPOINTS,
  GetUserCommunityProfileRequestParams,
  GetUserCommunityProfileResponse,
  USER_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getUserCommunityProfile = async ({
  id
}: GetUserCommunityProfileRequestParams) => {
  const response = await axiosApi.get<GetUserCommunityProfileResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.USERS}${USER_ENDPOINTS.GET_ONE_COMMUNITY.replace(':id', id)}`
  )
  return response.data
}
