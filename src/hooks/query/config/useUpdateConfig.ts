import { updateConfig } from '@apis'
import { UpdateConfigRequestBody, UpdateConfigResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UpdateConfigMutationOptions = UseMutationOptions<
  UpdateConfigResponse,
  ShowError,
  UpdateConfigRequestBody,
  unknown
>

export const useUpdateConfig = (options?: UpdateConfigMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<UpdateConfigResponse, ShowError, UpdateConfigRequestBody>({
    ...options,
    mutationFn: (data: UpdateConfigRequestBody) => {
      return updateConfig(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CONFIG.CONFIG]
      })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
