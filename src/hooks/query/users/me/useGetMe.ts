import { getMe } from '@apis'
import { GetOneUserResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetMeOptions = Omit<
  UseQueryOptions<GetOneUserResponse, ShowError>,
  'queryKey' | 'queryFn'
>

export const useGetMe = (options?: UseGetMeOptions) => {
  return useQuery<GetOneUserResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.USERS.ME],
    queryFn: () => getMe()
  })
}
