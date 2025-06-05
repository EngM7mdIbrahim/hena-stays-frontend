import { getUserCommunityProfile } from '@apis'
import {
  GetUserCommunityProfileRequestParams,
  GetUserCommunityProfileResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type useGetUserCommunityProfileType = UseQueryOptions<
  GetUserCommunityProfileRequestParams,
  ShowError,
  GetUserCommunityProfileResponse
>

export const useGetUserCommunityProfile = (
  { id }: GetUserCommunityProfileRequestParams,
  options?: useGetUserCommunityProfileType
) => {
  return useQuery({
    ...options,
    queryKey: [QUERY_KEYS.COMMUNITY.PROFILE, id],
    queryFn: () => getUserCommunityProfile({ id }) as any,
    enabled: !!id
  })
}
