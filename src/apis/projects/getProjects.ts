import {
  GENERAL_ENDPOINTS,
  GetAllProjectsQuery,
  GetAllProjectsResponse,
  PROJECT_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getProjects = async (params: GetAllProjectsQuery) => {
  const response = await axiosApi.get<GetAllProjectsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.PROJECTS}${PROJECT_ENDPOINTS.GET_ALL}`,
    { params }
  )
  return response.data
}
