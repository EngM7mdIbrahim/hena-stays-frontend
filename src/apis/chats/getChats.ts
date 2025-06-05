import {
  CHAT_ENDPOINTS,
  FindAllChatsRequestQuery,
  FindAllChatsResponse,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getChats = async (params: FindAllChatsRequestQuery) => {
  const response = await axiosApi.get<FindAllChatsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CHATS}${CHAT_ENDPOINTS.READ}`,
    {
      params
    }
  )
  return response.data
}
