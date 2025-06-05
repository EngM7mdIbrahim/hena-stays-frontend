import {
  AdminApprovementBody,
  AdminApprovementResponse,
  GENERAL_ENDPOINTS,
  PROPERTIES_XML_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const adminApproval = async ({
  id,
  ...data
}: AdminApprovementBody & { id: string }) => {
  const response = await axiosApi.patch<AdminApprovementResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.PROPERTIES_XML}${PROPERTIES_XML_ENDPOINTS.ADMIN_APPROVEMENT.replace(':id', id)}`,
    data
  )
  return response.data
}
