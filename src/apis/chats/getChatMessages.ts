import {
  CHAT_ENDPOINTS,
  FindAllMessagesByChatQuery,
  FindAllMessagesByChatRequestParams,
  FindAllMessagesByChatResponse,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getChatMessages = async (
  params: FindAllMessagesByChatRequestParams & FindAllMessagesByChatQuery
) => {
  const response = await axiosApi.get<FindAllMessagesByChatResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CHATS}${CHAT_ENDPOINTS.GET_MESSAGES.replace(':id', params.id)}`,
    {
      params
    }
  )
  return response.data
}
