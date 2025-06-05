import { updateProperty } from '@apis'
import {
  UpdatePropertyRequestBody,
  UpdatePropertyRequestParams,
  UpdatePropertyResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UpdatePropertyMutationOptions = UseMutationOptions<
  UpdatePropertyResponse,
  ShowError,
  UpdatePropertyRequestParams & UpdatePropertyRequestBody,
  unknown
>
export const useUpdateProperty = (options?: UpdatePropertyMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<
    UpdatePropertyResponse,
    ShowError,
    UpdatePropertyRequestParams & UpdatePropertyRequestBody
  >({
    ...options,
    mutationFn: (
      data: UpdatePropertyRequestParams & UpdatePropertyRequestBody
    ) => {
      return updateProperty(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PROPERTIES.PROPERTIES]
      })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
