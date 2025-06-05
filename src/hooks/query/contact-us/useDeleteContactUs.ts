import { deleteContactUs } from '@apis'
import {
  DeleteContactUsRequestParams,
  DeleteContactUsResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { getError } from '@utils'

type DeleteContactUsMutationOptions = UseMutationOptions<
  DeleteContactUsResponse,
  Error,
  DeleteContactUsRequestParams,
  unknown
>

export const useDeleteContactUs = (
  options?: DeleteContactUsMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation<
    DeleteContactUsResponse,
    Error,
    DeleteContactUsRequestParams
  >({
    ...options,
    mutationFn: async ({ id }: DeleteContactUsRequestParams) => {
      const response = await deleteContactUs({ id })
      return response
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CONTACT_US.CONTACT_US]
      })
    },
    onError(err, variables, _context) {
      getError(err)
      options?.onError?.(err, variables, _context)
    }
  })
}
