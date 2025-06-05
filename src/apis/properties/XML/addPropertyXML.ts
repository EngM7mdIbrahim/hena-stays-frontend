import {
  AddPropertyXMLBody,
  AddPropertyXMLResponse,
  GENERAL_ENDPOINTS,
  PROPERTIES_XML_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const addPropertyXML = async (data: AddPropertyXMLBody) => {
  const response = await axiosApi.post<AddPropertyXMLResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.PROPERTIES_XML}${PROPERTIES_XML_ENDPOINTS.CREATE}`,
    data
  )
  return response.data
}
