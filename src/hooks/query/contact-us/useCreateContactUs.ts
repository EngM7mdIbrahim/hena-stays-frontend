import { createContactUs } from '@apis'
import { CreateContactUsRequest, CreateContactUsResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { getError } from '@utils'

type CreateContactUsMutationOptions = UseMutationOptions<
  CreateContactUsResponse,
  Error,
  CreateContactUsRequest
>

export const useCreateContactUs = (
  options?: CreateContactUsMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateContactUsRequest) => {
      return createContactUs(data)
    },
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
