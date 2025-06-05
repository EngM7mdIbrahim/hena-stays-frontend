import { useMemo } from 'react'

import { useGetTopPerformers } from '@hooks/query/community/users/useGetTopPerformers'

export function useTopPerformersList() {
  const { data, isLoading, isError, error } = useGetTopPerformers({
    limit: '10'
  })
  const topCompanies = useMemo(() => {
    return (data ?? { topCompanies: [] }).topCompanies
  }, [data])
  const topAgents = useMemo(() => {
    return (data ?? { topAgents: [] }).topAgents
  }, [data])
  const topPerformers = useMemo(() => {
    return [...topCompanies, ...topAgents]
  }, [topCompanies, topAgents])

  return {
    topPerformers,
    data,
    isLoading,
    isError,
    error
  }
}
