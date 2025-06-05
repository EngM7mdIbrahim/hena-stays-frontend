import { getOneContactUs } from '@apis'
import { GetContactUsRequestParams, GetContactUsResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type UseGetContactUsByIdOptions = UseQueryOptions<
  GetContactUsResponse,
  Error,
  GetContactUsResponse
>

export const useGetContactUsById = (
  params: GetContactUsRequestParams,
  options?: UseGetContactUsByIdOptions
) => {
  return useQuery<GetContactUsResponse, Error>({
    ...options,
    queryKey: [QUERY_KEYS.CONTACT_US.CONTACT_US, params],
    queryFn: () => getOneContactUs(params),
    enabled: !!params.id
  })
}
