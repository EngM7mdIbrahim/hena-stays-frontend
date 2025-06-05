'use client'

import React, { useState } from 'react'
import { CallRequestStatus, CallRequestStatusType } from '@commonTypes'
import { defaultLimitOptions, getDefaultSortOptions } from '@constants'
import { useCallRequestsList } from '@hooks'
import { Box, Group, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import AppFragmentTabsControl from '@components/AppFragmentTabsControl'
import AppPagination from '@components/AppPagination'
import CallRequestCard, {
  CallRequestCardSkeleton
} from '@components/CallRequestCard'
import SearchField from '@components/CustomFields/SearchField'
import EmptyWrapper from '@components/EmptyWrapper'
import FullScreenError from '@components/FullScreenError'
import ItemsWrapper from '@components/ItemWrapper'
import LimitButton from '@components/LimitButton'
import SortButton from '@components/SortButton'

function CallRequestsSection() {
  const t = useTranslations()
  const [status, setStatus] = useState<CallRequestStatusType>(
    CallRequestStatus.Approved
  )

  const controlsData = [
    {
      value: CallRequestStatus.Approved,
      label: t('callRequests.status.approved')
    },
    {
      value: CallRequestStatus.Pending,
      label: t('callRequests.status.pending')
    },
    {
      value: CallRequestStatus.Rejected,
      label: t('callRequests.status.rejected')
    }
  ]

  let title = ''
  if (status === CallRequestStatus.Approved) {
    title = `${t('callRequests.status.approved')} ${t('callRequests.title')}`
  } else if (status === CallRequestStatus.Pending) {
    title = `${t('callRequests.status.pending')} ${t('callRequests.title')}`
  } else {
    title = `${t('callRequests.status.rejected')} ${t('callRequests.title')}`
  }

  const {
    callRequests,
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
  } = useCallRequestsList({ status })

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <Stack gap='md'>
      <Group className='w-full items-baseline justify-between'>
        <Stack>
          <Text
            component='h1'
            className='text-2xl font-bold text-neutral-700 md:text-4xl'
          >
            {title} ({data?.total?.toLocaleString('en-US')})
          </Text>
        </Stack>
      </Group>

      <Box>
        <AppFragmentTabsControl
          notActiveBg='bg-brand-100/80'
          textColor='text-neutral-600'
          data={controlsData}
          value={String(status)}
          onChange={(value) => {
            setFilters({ ...filters, page: '1' })
            setStatus(value as CallRequestStatusType)
          }}
        />
      </Box>

      <Group className='flex w-full items-center gap-2'>
        <SortButton
          radius='xl'
          value={sort ? JSON.stringify(sort) : null}
          onChange={(value) => {
            setSort(value ? JSON.parse(value) : null)
          }}
          data={getDefaultSortOptions(t)}
        />
        <LimitButton
          radius='xl'
          value={limit}
          onChange={(value) => {
            setLimit(value ?? defaultLimitOptions[0].value)
          }}
          data={defaultLimitOptions}
        />
        <SearchField
          classNames={{
            input: 'py-0 bg-default-background'
          }}
          size='sm'
          className='flex-1 rounded-md outline-none'
          placeholder={t('callRequests.placeholders.search')}
          radius='xl'
          value={filters.text}
          onChange={(e) => setFilters({ ...filters, text: e.target.value })}
        />
      </Group>

      <ItemsWrapper
        loading={isLoading}
        className='grid grid-cols-1 gap-4 md:grid-cols-2'
        LoadingComponent={<CallRequestCardSkeleton />}
        EmptyComponent={
          <EmptyWrapper
            description={t('shared.emptyDescription', {
              itemName: t('callRequests.title')
            })}
          />
        }
      >
        {callRequests.map((callRequest) => (
          <CallRequestCard key={callRequest._id} request={callRequest} />
        ))}
      </ItemsWrapper>
      <Box className='mt-8 flex items-center justify-center'>
        <AppPagination
          activeBgColor='linear-gradient(180deg, #F6A649 0%, #90612B 100%)'
          value={data?.page || (filters.page ? Number(filters.page) : 1)}
          onChange={(value) => setFilters({ ...filters, page: String(value) })}
          total={data?.totalPages ?? 0}
        />
      </Box>
    </Stack>
  )
}

export default CallRequestsSection
