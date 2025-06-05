import { getConfig } from '@apis'
import { GetConfigResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetConfigOptions = UseQueryOptions<
  GetConfigResponse,
  ShowError,
  GetConfigResponse
>

export const useGetConfig = (options?: UseGetConfigOptions) => {
  return useQuery<GetConfigResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.CONFIG.CONFIG],
    queryFn: () => getConfig(),
    refetchOnWindowFocus: false
  })
}
