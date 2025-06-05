import { deletePropertySave } from '@apis'
import {
  DeletePropertySaveRequest,
  DeletePropertySaveResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type DeletePropertySaveMutationOptions = UseMutationOptions<
  DeletePropertySaveResponse,
  ShowError,
  DeletePropertySaveRequest,
  unknown
>

const keys = [QUERY_KEYS.PROPERTIES.PROPERTIES, QUERY_KEYS.PROPERTIES.SAVES]

export const useDeletePropertySave = (
  options?: DeletePropertySaveMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation<
    DeletePropertySaveResponse,
    ShowError,
    DeletePropertySaveRequest
  >({
    ...options,
    mutationFn: async (data: DeletePropertySaveRequest) => {
      const response = await deletePropertySave(data)
      return response.data
    },
    onSuccess(data, variables, _context) {
      options?.onSuccess?.(data, variables, _context)

      keys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] })
      })
    },
    onError(err, variables, _context) {
      getError(err)
      options?.onError?.(err, variables, _context)
    }
  })
}
