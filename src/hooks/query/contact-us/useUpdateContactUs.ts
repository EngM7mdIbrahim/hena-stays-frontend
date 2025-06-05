import { updateContactUs } from '@apis'
import {
  UpdateContactUsRequestBody,
  UpdateContactUsRequestParams,
  UpdateContactUsResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { getError } from '@utils'

type UpdateContactUsMutationOptions = UseMutationOptions<
  UpdateContactUsResponse,
  Error,
  UpdateContactUsRequestParams & UpdateContactUsRequestBody,
  unknown
>

export const useUpdateContactUs = (
  options?: UpdateContactUsMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation<
    UpdateContactUsResponse,
    Error,
    UpdateContactUsRequestParams & UpdateContactUsRequestBody
  >({
    ...options,
    mutationFn: (
      data: UpdateContactUsRequestParams & UpdateContactUsRequestBody
    ) => updateContactUs(data),
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CONTACT_US.CONTACT_US]
      })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
