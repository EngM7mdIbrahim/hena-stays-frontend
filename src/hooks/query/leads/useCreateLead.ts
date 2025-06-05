import { createLead } from '@apis'
import { CreateLeadsRequest, CreateLeadsResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { getError } from '@utils'

type CreateLeadMutationOptions = UseMutationOptions<
  CreateLeadsResponse,
  Error,
  CreateLeadsRequest
>

export const useCreateLead = (options?: CreateLeadMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateLeadsRequest) => {
      return createLead(data)
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
