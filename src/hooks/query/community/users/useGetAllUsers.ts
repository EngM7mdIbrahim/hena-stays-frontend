import { getAllUsers } from '@apis'
import {
  GetUserCommunityRequestQuery,
  GetUserCommunityResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

export type UseGetAllUsersOptions = UseQueryOptions<
  GetUserCommunityResponse,
  ShowError,
  GetUserCommunityResponse
>

export const useGetAllUsers = (
  params: GetUserCommunityRequestQuery,
  options?: Partial<UseGetAllUsersOptions>
) => {
  return useQuery<GetUserCommunityResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.COMMUNITY.USERS, params],
    queryFn: () => getAllUsers(params),
    refetchOnWindowFocus: false
  })
}
