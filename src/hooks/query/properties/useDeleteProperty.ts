import { deleteProperty } from '@apis'
import {
  DeletePropertyRequestBody,
  DeletePropertyRequestParams,
  DeletePropertyResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type DeletePropertyMutationOptions = UseMutationOptions<
  DeletePropertyResponse,
  ShowError,
  DeletePropertyRequestParams,
  unknown
>
export const useDeleteProperty = (options?: DeletePropertyMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<
    DeletePropertyResponse,
    ShowError,
    DeletePropertyRequestParams & DeletePropertyRequestBody
  >({
    ...options,
    mutationFn: async ({
      id,
      reasonDelete
    }: DeletePropertyRequestParams & DeletePropertyRequestBody) => {
      const response = await deleteProperty({ id, reasonDelete })
      return response.data
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PROPERTIES.PROPERTIES]
      })
    },
    onError(err, variables, _context) {
      getError(err)
      options?.onError?.(err, variables, _context)
    }
  })
}
