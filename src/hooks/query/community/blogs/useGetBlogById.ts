import { getBlog } from '@apis'
import {
  FindBlogQuery,
  FindBlogRequestParams,
  FindBlogResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetBlogByIdOptions = UseQueryOptions<
  FindBlogResponse,
  ShowError,
  FindBlogResponse
>

export const useGetBlogById = (
  params: FindBlogRequestParams & FindBlogQuery,
  options?: UseGetBlogByIdOptions
) => {
  return useQuery<FindBlogResponse, ShowError, FindBlogResponse>({
    ...options,
    queryKey: [QUERY_KEYS.COMMUNITY.Blogs, params],
    queryFn: () => getBlog(params),
    enabled: !!params.id
  })
}
