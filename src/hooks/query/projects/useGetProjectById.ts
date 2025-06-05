import { getProjectById } from '@apis'
import {
  GetOneProjectQuery,
  GetOneProjectRequestParams,
  GetOneProjectResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetProjectByIdOptions = UseQueryOptions<
  GetOneProjectResponse,
  ShowError,
  GetOneProjectResponse
>

export const useGetProjectById = (
  params: GetOneProjectRequestParams & GetOneProjectQuery,
  options?: UseGetProjectByIdOptions
) => {
  return useQuery<GetOneProjectResponse, ShowError>({
    queryKey: [QUERY_KEYS.PROJECTS.SINGLE_PROJECT(params.id), params],
    queryFn: () => getProjectById(params),
    enabled: !!params.id,
    ...options
  })
}
