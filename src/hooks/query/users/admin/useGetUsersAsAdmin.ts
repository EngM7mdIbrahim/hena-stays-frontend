import { getUsersAsAdmin } from '@apis'
import { GetAllUsersRequestQuery, GetAllUsersResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

export type UseGetUsersAsAdminOptions = UseQueryOptions<
  GetAllUsersResponse,
  ShowError,
  GetAllUsersResponse
>

export const useGetUsersAsAdmin = (
  params: GetAllUsersRequestQuery,
  options?: Partial<UseGetUsersAsAdminOptions>
) => {
  return useQuery<GetAllUsersResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.USERS.USERS, params],
    queryFn: () => getUsersAsAdmin(params)
  })
}
