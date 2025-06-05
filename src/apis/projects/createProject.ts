import {
  CreateProjectRequestBody,
  CreateProjectResponse,
  GENERAL_ENDPOINTS,
  PROJECT_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const createProject = async (data: CreateProjectRequestBody) => {
  const response = await axiosApi.post<CreateProjectResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.PROJECTS}${PROJECT_ENDPOINTS.CREATE}`,
    data
  )
  return response.data
}
