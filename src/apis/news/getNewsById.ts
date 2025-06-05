import {
  FindNewsRequestParams,
  FindNewsResponse,
  GENERAL_ENDPOINTS,
  NEWS_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getNewsById = async (params: FindNewsRequestParams) => {
  const response = await axiosApi.get<FindNewsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.NEWS}${NEWS_ENDPOINTS.GET_ONE.replace(':id', params.id)}`,
    {
      params: { ...params, id: undefined }
    }
  )
  return response.data
}
