import { createChat } from '@apis'
import { CreateChatRequestBody, CreateChatResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type CreateChatMutationOptions = UseMutationOptions<
  CreateChatResponse,
  ShowError,
  CreateChatRequestBody,
  unknown
>

const keys = [QUERY_KEYS.CHATS.CHATS, QUERY_KEYS.CHATS.CHATS_MESSAGES]

export const useCreateChat = (options?: CreateChatMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<CreateChatResponse, ShowError, CreateChatRequestBody>({
    mutationFn: (data) => createChat(data),
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
