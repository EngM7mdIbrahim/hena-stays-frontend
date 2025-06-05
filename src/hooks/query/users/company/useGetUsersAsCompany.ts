import { getUsersAsCompany } from '@apis'
import { GetAllUsersRequestQuery, GetAllUsersResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetUsersAsCompanyOptions = UseQueryOptions<
  GetAllUsersResponse,
  ShowError,
  GetAllUsersResponse
>

export const useGetUsersAsCompany = (
  params: GetAllUsersRequestQuery,
  options?: UseGetUsersAsCompanyOptions
) => {
  return useQuery<GetAllUsersResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.USERS.USERS, params],
    queryFn: () => getUsersAsCompany(params),
    refetchOnWindowFocus: false
  })
}
