import { addPropertyXML } from '@apis'
import { AddPropertyXMLBody, AddPropertyXMLResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type AddXmlMutationOptions = UseMutationOptions<
  AddPropertyXMLResponse,
  ShowError,
  AddPropertyXMLBody
>

export const useAddPropertyXml = (options?: AddXmlMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AddPropertyXMLBody) => addPropertyXML(data),
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
