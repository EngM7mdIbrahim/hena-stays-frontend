import { updateAgentEmail } from '@apis'
import {
  UpdateAgentEmailBody,
  UpdateAgentEmailParams,
  UpdateAgentEmailResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UseUpdateAgentEmailOptions = UseMutationOptions<
  UpdateAgentEmailResponse,
  ShowError,
  UpdateAgentEmailBody & UpdateAgentEmailParams
>

export const useUpdateAgentEmail = (options?: UseUpdateAgentEmailOptions) => {
  const queryClient = useQueryClient()

  return useMutation<
    UpdateAgentEmailResponse,
    ShowError,
    UpdateAgentEmailBody & UpdateAgentEmailParams
  >({
    ...options,
    mutationKey: [QUERY_KEYS.PROPERTIES.XML],
    mutationFn: updateAgentEmail,
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PROPERTIES.XML]
      })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
