import { getUserAsAdmin } from '@apis'
import {
  GetOneUserParams,
  GetOneUserQuery,
  GetOneUserResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

export type UseGetUserAsAdminOptions = UseQueryOptions<
  GetOneUserResponse,
  ShowError,
  GetOneUserResponse
>

export const useGetUserAsAdmin = (
  params: GetOneUserQuery & GetOneUserParams,
  options?: Partial<UseGetUserAsAdminOptions>
) => {
  return useQuery<GetOneUserResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.USERS.SINGLE_USER(params.id), params],
    queryFn: () => getUserAsAdmin(params),
    enabled: !!params.id
  })
}
