import { getPostSaveById } from '@apis'
import { FindPostSaveRequest, FindPostSaveResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetPostSaveByIdOptions = UseQueryOptions<
  FindPostSaveResponse,
  ShowError
>

export const useGetPostSaveById = (
  { id }: FindPostSaveRequest,
  options?: UseGetPostSaveByIdOptions
) => {
  return useQuery<FindPostSaveResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.COMMUNITY.SAVES, id],
    queryFn: () => getPostSaveById({ id }),
    enabled: !!id || options?.enabled
  })
}
