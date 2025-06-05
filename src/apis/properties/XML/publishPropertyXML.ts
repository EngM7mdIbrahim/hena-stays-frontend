import {
  GENERAL_ENDPOINTS,
  PROPERTIES_XML_ENDPOINTS,
  PublishPropertyXMLBody,
  PublishPropertyXMLResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const publishPropertyXML = async (data: PublishPropertyXMLBody) => {
  const response = await axiosApi.post<PublishPropertyXMLResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.PROPERTIES_XML}${PROPERTIES_XML_ENDPOINTS.PUBLISH}`,
    data
  )
  return response.data
}
