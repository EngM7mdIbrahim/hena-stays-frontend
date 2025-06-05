import { getOfficialBlog } from '@apis'
import {
  FindOneOfficialBlogQuery,
  FindOneOfficialBlogResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetOfficialBlogBySlugOptions = UseQueryOptions<
  FindOneOfficialBlogResponse,
  ShowError,
  FindOneOfficialBlogResponse
>

export const useGetOfficialBlogBySlug = (
  params: { slug: string } & FindOneOfficialBlogQuery,
  options?: UseGetOfficialBlogBySlugOptions
) => {
  return useQuery<
    FindOneOfficialBlogResponse,
    ShowError,
    FindOneOfficialBlogResponse
  >({
    ...options,
    queryKey: [QUERY_KEYS.OFFICIAL_BLOGS.OFFICIAL_BLOGS, params],
    queryFn: () => getOfficialBlog(params),
    enabled: !!params.slug
  })
}
