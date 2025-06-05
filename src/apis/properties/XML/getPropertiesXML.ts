import {
  GENERAL_ENDPOINTS,
  GetAllXmlPropertiesQuery,
  GetAllXmlPropertiesResponse,
  PROPERTIES_XML_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getPropertiesXML = async (params: GetAllXmlPropertiesQuery) => {
  const response = await axiosApi.get<GetAllXmlPropertiesResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.PROPERTIES_XML}${PROPERTIES_XML_ENDPOINTS.GET_ALL}`,
    {
      params
    }
  )
  return response.data
}
