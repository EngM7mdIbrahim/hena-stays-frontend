import { getOnePropertyXML } from '@apis'
import { GetXmlPropertyParams, GetXmlPropertyResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetPropertyXmlOptions = Omit<
  UseQueryOptions<GetXmlPropertyResponse, ShowError>,
  'queryKey' | 'queryFn'
>

export const useGetPropertyXml = (
  params: GetXmlPropertyParams,
  options?: UseGetPropertyXmlOptions
) => {
  return useQuery<GetXmlPropertyResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.PROPERTIES.XML.SINGLE_PROPERTY_XML(params.id)],
    queryFn: () => getOnePropertyXML(params),
    refetchOnWindowFocus: false
  })
}
