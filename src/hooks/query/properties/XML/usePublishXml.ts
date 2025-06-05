import { publishPropertyXML } from '@apis'
import {
  PublishPropertyXMLBody,
  PublishPropertyXMLResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UsePublishXmlOptions = UseMutationOptions<
  PublishPropertyXMLResponse,
  ShowError,
  PublishPropertyXMLBody
>

export const usePublishXml = (options?: UsePublishXmlOptions) => {
  const queryClient = useQueryClient()

  return useMutation<
    PublishPropertyXMLResponse,
    ShowError,
    PublishPropertyXMLBody
  >({
    ...options,
    mutationKey: [QUERY_KEYS.PROPERTIES.XML],
    mutationFn: publishPropertyXML,
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
