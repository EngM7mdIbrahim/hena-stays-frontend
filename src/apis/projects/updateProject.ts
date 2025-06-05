import {
  GENERAL_ENDPOINTS,
  PROJECT_ENDPOINTS,
  UpdateProjectRequestBody,
  UpdateProjectRequestParams,
  UpdateProjectResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const updateProject = async ({
  id,
  ...data
}: UpdateProjectRequestBody & UpdateProjectRequestParams) => {
  const response = await axiosApi.patch<UpdateProjectResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.PROJECTS}${PROJECT_ENDPOINTS.UPDATE.replace(':id', id)}`,
    data
  )
  return response.data
}
