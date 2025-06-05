import {
  CHAT_ENDPOINTS,
  CreateChatRequestBody,
  CreateChatResponse,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const createChat = async (data: CreateChatRequestBody) => {
  const response = await axiosApi.post<CreateChatResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CHATS}${CHAT_ENDPOINTS.CREATE}`,
    data
  )
  return response.data
}
