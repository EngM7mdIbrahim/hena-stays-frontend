import { useEffect, useMemo, useState } from 'react'
import { GetAllXmlPropertiesQuery, PropertyXMLStatusType } from '@commonTypes'
import { defaultLimitOptions, propertySortOptions } from '@constants'
import { useTranslations } from 'next-intl'

import { useGetPropertiesXml } from '@hooks/query/properties/XML/useGetPropertiesXml'
import { useUpdateSearchParams } from '@hooks/useUpdateSearchParams'

export type UseXmlPropertiesListProps = {
  status?: PropertyXMLStatusType
}

export function useXmlPropertiesList({
  status
}: UseXmlPropertiesListProps = {}) {
  const t = useTranslations()
  const [filters, setFilters] = useState<
    Pick<GetAllXmlPropertiesQuery, 'filter' | 'text' | 'page'>
  >({})
  const [sort, setSort] = useState<GetAllXmlPropertiesQuery['sort'] | null>(
    JSON.parse(propertySortOptions(t)[0].value)
  )
  const [limit, setLimit] = useState<
    Required<GetAllXmlPropertiesQuery>['limit']
  >(defaultLimitOptions[0].value)

  const { updateSearchParams } = useUpdateSearchParams({
    onFiltersChange: setFilters,
    scroll: true
  })

  useEffect(() => {
    updateSearchParams(filters)
  }, [filters, updateSearchParams])

  const { data, isLoading, isError, error } = useGetPropertiesXml({
    showFields: {
      creator: true
    },
    limit,
    page: filters.page,
    text: filters.text,
    filter: {
      ...filters.filter,
      ...(status ? { status } : {})
    },
    ...(sort ? { sort } : {})
  })

  const properties = useMemo(() => {
    return (data ?? { items: [] }).items
  }, [data])

  return {
    properties,
    data,
    isLoading,
    isError,
    error,
    sort,
    setSort,
    limit,
    setLimit,
    filters,
    setFilters
  }
}
