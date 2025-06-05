import { getAllContactUs } from '@apis'
import { FindAllContactUsResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

export type UseGetContactUsOptions = UseQueryOptions<
  FindAllContactUsResponse,
  ShowError,
  FindAllContactUsResponse
>

export const useGetContactUs = (
  params: any,
  options?: Partial<UseGetContactUsOptions>
) => {
  return useQuery<FindAllContactUsResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.CONTACT_US.CONTACT_US, params],
    queryFn: () => getAllContactUs(params)
  })
}
