import {
  GENERAL_ENDPOINTS,
  PROPERTIES_XML_ENDPOINTS,
  UpdateAgentEmailBody,
  UpdateAgentEmailParams,
  UpdateAgentEmailResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const updateAgentEmail = async ({
  id,
  ...data
}: UpdateAgentEmailBody & UpdateAgentEmailParams) => {
  const response = await axiosApi.patch<UpdateAgentEmailResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.PROPERTIES_XML}${PROPERTIES_XML_ENDPOINTS.UPDATE_AGENT_EMAIL.replace(':id', id)}`,
    data
  )
  return response.data
}
