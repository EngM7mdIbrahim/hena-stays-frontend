import { getPropertiesXML } from '@apis'
import {
  GetAllXmlPropertiesQuery,
  GetAllXmlPropertiesResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetXmlsOptions = Omit<
  UseQueryOptions<GetAllXmlPropertiesResponse, ShowError>,
  'queryKey' | 'queryFn'
>

export const useGetPropertiesXml = (
  params: GetAllXmlPropertiesQuery,
  options?: UseGetXmlsOptions
) => {
  return useQuery<GetAllXmlPropertiesResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.PROPERTIES.XML, params],
    queryFn: () => getPropertiesXML(params),
    refetchOnWindowFocus: false
  })
}
