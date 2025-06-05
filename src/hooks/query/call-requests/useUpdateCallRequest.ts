import { updateCallRequest } from '@apis'
import {
  UpdateCallRequestRequestBody,
  UpdateCallRequestRequestParams,
  UpdateCallRequestResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { getError } from '@utils'

type UpdateCallRequestMutationOptions = UseMutationOptions<
  UpdateCallRequestResponse,
  Error,
  UpdateCallRequestRequestBody & UpdateCallRequestRequestParams,
  unknown
>

export const useUpdateCallRequest = (
  options?: UpdateCallRequestMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation<
    UpdateCallRequestResponse,
    Error,
    UpdateCallRequestRequestBody & UpdateCallRequestRequestParams
  >({
    ...options,
    mutationFn: (
      data: UpdateCallRequestRequestBody & UpdateCallRequestRequestParams
    ) => updateCallRequest(data),
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
