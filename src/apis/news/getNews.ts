import {
  FindAllNewsRequestQuery,
  FindAllNewsResponse,
  GENERAL_ENDPOINTS,
  NEWS_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getNews = async (params: FindAllNewsRequestQuery) => {
  const response = await axiosApi.get<FindAllNewsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.NEWS}${NEWS_ENDPOINTS.GET_ALL}`,
    {
      params
    }
  )
  return response.data
}
