import {
  GENERAL_ENDPOINTS,
  GetOneProjectQuery,
  GetOneProjectRequestParams,
  GetOneProjectResponse,
  PROJECT_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getProjectById = async (
  params: GetOneProjectRequestParams & GetOneProjectQuery
) => {
  const response = await axiosApi.get<GetOneProjectResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.PROJECTS}${PROJECT_ENDPOINTS.GET_ONE.replace(':id', params.id)}`,
    {
      params: { ...params, id: undefined }
    }
  )
  return response.data
}
