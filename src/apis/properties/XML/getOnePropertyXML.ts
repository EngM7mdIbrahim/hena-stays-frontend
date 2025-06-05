import {
  GENERAL_ENDPOINTS,
  GetXmlPropertyParams,
  GetXmlPropertyResponse,
  PROPERTIES_XML_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getOnePropertyXML = async (params: GetXmlPropertyParams) => {
  const response = await axiosApi.get<GetXmlPropertyResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.PROPERTIES_XML}${PROPERTIES_XML_ENDPOINTS.GET_ONE.replace(':id', params.id)}`
  )
  return response.data
}
