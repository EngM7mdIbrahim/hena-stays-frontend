import { getDefaultSupportUser } from '@apis'
import { GetDefaultSupportUserResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetDefaultSupportUserOptions = Omit<
  UseQueryOptions<GetDefaultSupportUserResponse, ShowError>,
  'queryKey' | 'queryFn'
>

export const useGetDefaultSupportUser = (
  options?: UseGetDefaultSupportUserOptions
) => {
  return useQuery<GetDefaultSupportUserResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.USERS.DEFAULT_SUPPORT_USER],
    queryFn: () => getDefaultSupportUser(),
    enabled: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    // check every day
    staleTime: 24 * 60 * 60 * 1000
  })
}
