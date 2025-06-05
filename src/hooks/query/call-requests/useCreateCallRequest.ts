import { createCallRequest } from '@apis'
import {
  CreateCallRequestRequest,
  CreateCallRequestResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { getError } from '@utils'

type CreateCallRequestMutationOptions = UseMutationOptions<
  CreateCallRequestResponse,
  Error,
  CreateCallRequestRequest
>

export const useCreateCallRequest = (
  options?: CreateCallRequestMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCallRequestRequest) => {
      return createCallRequest(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CALL_REQUESTS.CALL_REQUESTS]
      })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
