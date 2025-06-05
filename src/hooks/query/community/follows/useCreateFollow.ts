import { createFollow } from '@apis'
import { CreateFollowRequest, CreateFollowResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type CreateFollowMutationOptions = UseMutationOptions<
  CreateFollowResponse,
  ShowError,
  CreateFollowRequest,
  unknown
>

const keys = [
  QUERY_KEYS.COMMUNITY.FOLLOWS,
  QUERY_KEYS.COMMUNITY.POSTS,
  QUERY_KEYS.COMMUNITY.PROFILE
]
export const useCreateFollow = (options?: CreateFollowMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<CreateFollowResponse, ShowError, CreateFollowRequest>({
    ...options,
    mutationFn: (data: CreateFollowRequest) => {
      return createFollow(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)

      keys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] })
      })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
