import { useEffect, useMemo, useState } from 'react'
import {
  GetPaymentTransactionsRequestQuery,
  PaymentStatusValues
} from '@commonTypes'
import { defaultLimitOptions } from '@constants'

import { useGetPayments } from '@hooks/query/payments'
import { useUpdateSearchParams } from '@hooks/useUpdateSearchParams'
import { useUser } from '@hooks/useUser'

export interface UsePaymentsListProps {}

export function usePaymentsList() {
  const { user } = useUser()
  const [filters, setFilters] = useState<
    Pick<
      GetPaymentTransactionsRequestQuery,
      'status' | 'starting_after' | 'ending_before'
    >
  >({
    status: PaymentStatusValues.Complete,
    starting_after: '',
    ending_before: ''
  })

  const [limit, setLimit] = useState<
    Required<GetPaymentTransactionsRequestQuery>['limit']
  >(Number(defaultLimitOptions[0].value))

  const { updateSearchParams } = useUpdateSearchParams({
    onFiltersChange: setFilters,
    scroll: true
  })

  // Update URL whenever filters change
  useEffect(() => {
    updateSearchParams(filters)
  }, [filters, updateSearchParams])

  const { data, isLoading, isError, error, isFetching } = useGetPayments({
    limit,
    status: filters.status,
    starting_after: filters.starting_after,
    ending_before: filters.ending_before,
    userId: user?._id || ''
  })

  const payments = useMemo(() => {
    return (data ?? { transactions: [] }).transactions
  }, [data])

  return {
    payments,
    data,
    isLoading,
    isError,
    error,
    limit,
    setLimit,
    filters,
    setFilters,
    isFetching
  }
}
