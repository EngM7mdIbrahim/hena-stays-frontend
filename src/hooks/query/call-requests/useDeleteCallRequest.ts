import { deleteCallRequest } from '@apis'
import {
  DeleteCallRequestRequestParams,
  DeleteCallRequestResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { getError } from '@utils'

type DeleteCallRequestMutationOptions = UseMutationOptions<
  DeleteCallRequestResponse,
  Error,
  DeleteCallRequestRequestParams,
  unknown
>

export const useDeleteCallRequest = (
  options?: DeleteCallRequestMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation<
    DeleteCallRequestResponse,
    Error,
    DeleteCallRequestRequestParams
  >({
    ...options,
    mutationFn: async ({ id }: DeleteCallRequestRequestParams) => {
      const response = await deleteCallRequest({ id })
      return response.data
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CALL_REQUESTS.CALL_REQUESTS]
      })
    },
    onError(err, variables, _context) {
      getError(err)
      options?.onError?.(err, variables, _context)
    }
  })
}
