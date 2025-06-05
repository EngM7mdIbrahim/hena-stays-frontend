import { updateLead } from '@apis'
import {
  UpdateLeadsRequestBody,
  UpdateLeadsRequestParams,
  UpdateLeadsResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UpdateLeadMutationOptions = UseMutationOptions<
  UpdateLeadsResponse,
  ShowError,
  UpdateLeadsRequestBody & UpdateLeadsRequestParams,
  unknown
>

export const useUpdateLead = (options?: UpdateLeadMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateLeadsRequestBody & UpdateLeadsRequestParams) => {
      return updateLead(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.LEADS.LEADS]
      })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
