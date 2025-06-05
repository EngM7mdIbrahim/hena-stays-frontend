import { useEffect, useMemo, useState } from 'react'
import { GetAllPropertiesQuery, Property } from '@commonTypes'
import { defaultLimitOptions, propertySortOptions } from '@constants'
import { useTranslations } from 'next-intl'

import { useGetProperties } from '@hooks/query/properties/useGetProperties'
import { useUpdateSearchParams } from '@hooks/useUpdateSearchParams'

export type UsePropertiesListProps = Pick<
  GetAllPropertiesQuery,
  'savedByMe' | 'mine'
> &
  Partial<Pick<Property, 'status' | 'recommended'>> & {
    createdBy?: string
    project?: string
  }

export function usePropertiesList({
  savedByMe,
  createdBy,
  mine,
  status,
  project,
  recommended
}: UsePropertiesListProps = {}) {
  const t = useTranslations()
  const [filters, setFilters] = useState<
    Pick<GetAllPropertiesQuery, 'filter' | 'text' | 'page' | 'startLocation'>
  >({})
  const [search, setSearch] = useState<GetAllPropertiesQuery['text']>('')
  const [sort, setSort] = useState<GetAllPropertiesQuery['sort'] | null>(
    JSON.parse(propertySortOptions(t)[0].value)
  )
  const [limit, setLimit] = useState<Required<GetAllPropertiesQuery>['limit']>(
    defaultLimitOptions[0].value
  )

  // this here with filters because this used in project properties to handle pagination without scroll to the top of the page
  const [page, setPage] = useState<Required<GetAllPropertiesQuery>['page']>('1')

  const { updateSearchParams } = useUpdateSearchParams({
    onFiltersChange: setFilters,
    scroll: true
  })

  const [selectedMapProperties, setSelectedMapProperties] = useState<
    Property[]
  >([])

  // Update URL whenever filters change
  useEffect(() => {
    updateSearchParams(filters)
    setSelectedMapProperties([])
  }, [filters, updateSearchParams])

  const { data, isLoading, isError, error, isFetching } = useGetProperties({
    limit,
    showFields: {
      createdBy: true,
      amenities: {
        basic: true
      }
    },
    startLocation: filters.startLocation,
    page: filters.page || page,
    text: filters.text || search,
    filter: {
      ...filters.filter,
      ...(createdBy ? { createdBy } : {}),
      ...(status ? { status } : {}),
      ...(project ? { project } : {}),
      ...(recommended ? { recommended } : {})
    },
    ...(sort ? { sort } : {}),
    ...(savedByMe ? { savedByMe } : {}),
    ...(mine ? { mine } : {})
  })

  const properties = useMemo(() => {
    return (data ?? { items: [] }).items
  }, [data])

  const mapProperties = useMemo(() => {
    return properties?.filter((property) => property.location) as (Property & {
      location: Location
    })[]
  }, [properties])

  return {
    properties,
    selectedMapProperties,
    setSelectedMapProperties,
    mapProperties,
    data,
    isLoading,
    isError,
    error,
    sort,
    setSort,
    limit,
    setLimit,
    page,
    setPage,
    filters,
    setFilters,
    search,
    setSearch,
    isFetching
  }
}
