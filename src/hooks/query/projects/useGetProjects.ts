import { getProjects } from '@apis'
import { GetAllProjectsQuery, GetAllProjectsResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetProjectsOptions = UseQueryOptions<
  GetAllProjectsResponse,
  ShowError,
  GetAllProjectsResponse
>

export const useGetProjects = (
  params: GetAllProjectsQuery,
  options?: UseGetProjectsOptions
) => {
  return useQuery<GetAllProjectsResponse, ShowError>({
    queryKey: [QUERY_KEYS.PROJECTS.PROJECTS, params],
    queryFn: () => getProjects(params),
    ...options
  })
}
