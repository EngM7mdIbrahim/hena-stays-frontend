import { getUserAsCompany } from '@apis'
import {
  GetOneUserParams,
  GetOneUserQuery,
  GetOneUserResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetUserOptions = Omit<
  UseQueryOptions<GetOneUserResponse, ShowError>,
  'queryKey' | 'queryFn'
>

export const useGetUserAsCompany = (
  params: GetOneUserQuery & GetOneUserParams,
  options?: UseGetUserOptions
) => {
  return useQuery<GetOneUserResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.USERS.SINGLE_USER(params.id)],
    queryFn: () => getUserAsCompany(params),
    enabled: !!params.id
  })
}
