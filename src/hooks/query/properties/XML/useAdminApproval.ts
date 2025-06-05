import { adminApproval } from '@apis'
import { AdminApprovementBody, AdminApprovementResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UseAdminApprovalOptions = UseMutationOptions<
  AdminApprovementResponse,
  ShowError,
  AdminApprovementBody & { id: string }
>

export const useAdminApproval = (options?: UseAdminApprovalOptions) => {
  const queryClient = useQueryClient()

  return useMutation<
    AdminApprovementResponse,
    ShowError,
    AdminApprovementBody & { id: string }
  >({
    ...options,
    mutationKey: [QUERY_KEYS.PROPERTIES.XML],
    mutationFn: adminApproval,
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
