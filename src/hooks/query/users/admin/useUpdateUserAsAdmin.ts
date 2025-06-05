import { updateUserAsAdmin } from '@apis'
import {
  UpdateCompanyUserRequestBody,
  UpdateCompanyUserRequestParams,
  UpdateCompanyUserResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UpdateUserMutationOptions = UseMutationOptions<
  UpdateCompanyUserResponse,
  ShowError,
  UpdateCompanyUserRequestBody & UpdateCompanyUserRequestParams
>

export const useUpdateUserAsAdmin = (options?: UpdateUserMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<
    UpdateCompanyUserResponse,
    ShowError,
    UpdateCompanyUserRequestBody & UpdateCompanyUserRequestParams
  >({
    ...options,
    mutationFn: (
      data: UpdateCompanyUserRequestBody & UpdateCompanyUserRequestParams
    ) => {
      return updateUserAsAdmin(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS.USERS]
      })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
