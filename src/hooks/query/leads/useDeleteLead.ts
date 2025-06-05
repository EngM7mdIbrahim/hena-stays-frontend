import { deleteLead } from '@apis'
import { DeleteLeadsRequestParams, DeleteLeadsResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type DeleteLeadMutationOptions = UseMutationOptions<
  DeleteLeadsResponse,
  ShowError,
  DeleteLeadsRequestParams,
  unknown
>

export const useDeleteLead = (options?: DeleteLeadMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<DeleteLeadsResponse, ShowError, DeleteLeadsRequestParams>({
    ...options,
    mutationFn: async ({ id }: DeleteLeadsRequestParams) => {
      const response = await deleteLead({ id })
      return response
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.LEADS.LEADS]
      })
    },
    onError(err, variables, _context) {
      getError(err)
      options?.onError?.(err, variables, _context)
    }
  })
}
