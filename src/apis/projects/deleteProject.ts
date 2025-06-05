import {
  DeleteProjectRequestParams,
  DeleteProjectResponse,
  GENERAL_ENDPOINTS,
  PROJECT_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const deleteProject = async (params: DeleteProjectRequestParams) => {
  const response = await axiosApi.delete<DeleteProjectResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.PROJECTS}${PROJECT_ENDPOINTS.DELETE.replace(':id', params.id)}`
  )
  return response.data
}
