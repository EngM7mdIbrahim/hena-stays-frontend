import { addPropertySave } from '@apis'
import { AddPropertySaveRequest, AddPropertySaveResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type AddPropertySaveMutationOptions = UseMutationOptions<
  AddPropertySaveResponse,
  ShowError,
  AddPropertySaveRequest,
  unknown
>

const keys = [QUERY_KEYS.PROPERTIES.PROPERTIES, QUERY_KEYS.PROPERTIES.SAVES]

export const useAddPropertySave = (
  options?: AddPropertySaveMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation<
    AddPropertySaveResponse,
    ShowError,
    AddPropertySaveRequest
  >({
    ...options,
    mutationFn: (data: AddPropertySaveRequest) => {
      return addPropertySave(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)

      keys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] })
      })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
