import { quickRegister } from '@apis'
import {
  QuickGuestRegisterRequest,
  QuickGuestRegisterResponse
} from '@commonTypes'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type QuickRegisterMutationOptions = UseMutationOptions<
  QuickGuestRegisterResponse,
  ShowError,
  QuickGuestRegisterRequest,
  unknown
>

export const useQuickRegister = (options?: QuickRegisterMutationOptions) => {
  return useMutation<
    QuickGuestRegisterResponse,
    ShowError,
    QuickGuestRegisterRequest
  >({
    ...options,
    mutationFn: (data: QuickGuestRegisterRequest) => {
      return quickRegister(data)
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
