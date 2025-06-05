'use client'

import React, { useState } from 'react'
import {
  CreditRequestStatus,
  CreditRequestStatusType,
  CreditsRequest,
  CurrencyCode,
  User
} from '@commonTypes'
import { defaultLimitOptions, getDefaultSortOptions } from '@constants'
import { useCreditsRequestsList } from '@hooks'
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Group,
  ScrollArea,
  Stack,
  Text
} from '@mantine/core'
import { DataTableColumn } from 'mantine-datatable'
import moment from 'moment'
import { useLocale, useTranslations } from 'next-intl'

import AppDataTable from '@components/AppDataTable'
import AppFragmentTabsControl from '@components/AppFragmentTabsControl'
import AppPagination from '@components/AppPagination'
import SearchField from '@components/CustomFields/SearchField'
import FullScreenError from '@components/FullScreenError'
import LimitButton from '@components/LimitButton'
import SortButton from '@components/SortButton'
import CreditRequestModal from '@components/Subscription/CreditRequestModal'

type RowData = {
  user: User
  status: CreditRequestStatusType
  credits: number
  fees: number
  taxes: number
  total: number
  createdAt: string
}

function CreditRequestsPage() {
  const t = useTranslations()
  const locale = useLocale()
  const [status, setStatus] = useState<CreditRequestStatusType>(
    CreditRequestStatus.Pending
  )
  const [selectedCreditRequest, setSelectedCreditRequest] = useState<
    string | null
  >(null)
  const {
    creditsRequests,
    data,
    isLoading,
    setSort,
    setLimit,
    sort,
    limit,
    isError,
    error,
    isFetching,
    filters,
    setFilters
  } = useCreditsRequestsList({ status })

  if (isError && error) return <FullScreenError error={error} />

  const controlsData = [
    {
      label: t('creditsRequests.status.pending'),
      value: CreditRequestStatus.Pending
    },
    {
      label: t('creditsRequests.status.accepted'),
      value: CreditRequestStatus.Accepted
    },
    {
      label: t('creditsRequests.status.rejected'),
      value: CreditRequestStatus.Rejected
    }
  ]

  const columns: DataTableColumn<RowData>[] = [
    {
      accessor: 'user',
      title: t('creditsRequests.columns.user'),
      render: (row) => (
        <Flex className='items-center gap-3'>
          <Avatar
            src={row.user?.image}
            name={row.user?.name}
            size='md'
            radius='xl'
          />
          <Stack className='gap-0'>
            <Text className='text-sm font-semibold capitalize'>
              {row.user?.name}
            </Text>
            <Text className='text-sm font-semibold'>{row.user?.email}</Text>
          </Stack>
        </Flex>
      )
    },
    {
      accessor: 'status',
      title: t('creditsRequests.columns.status'),
      render: (row) => (
        <Badge
          color={
            row.status === CreditRequestStatus.Pending ? 'yellow' : 'green'
          }
          variant='light'
        >
          {row.status}
        </Badge>
      )
    },
    {
      accessor: 'credits',
      title: t('creditsRequests.columns.credits'),
      render: (row) => (
        <Text className='text-sm font-semibold capitalize'>{row.credits}</Text>
      )
    },
    {
      accessor: 'fees',
      title: t('creditsRequests.columns.fees'),
      render: (row) => (
        <Text className='text-sm font-semibold capitalize'>
          {CurrencyCode.Aed} {row.fees?.toLocaleString() ?? 0}
        </Text>
      )
    },
    {
      accessor: 'taxes',
      title: t('creditsRequests.columns.taxes'),
      render: (row) => (
        <Text className='text-sm font-semibold capitalize'>
          {CurrencyCode.Aed} {row.taxes?.toLocaleString() ?? 0}
        </Text>
      )
    },
    {
      accessor: 'total',
      title: t('creditsRequests.columns.total'),
      render: (row) => (
        <Text className='text-sm font-semibold capitalize'>
          {CurrencyCode.Aed} {row.total?.toLocaleString() ?? 0}
        </Text>
      )
    },
    {
      accessor: 'createdAt',
      title: t('creditsRequests.columns.createdAt'),
      render: (row) => (
        <Text className='text-sm font-semibold capitalize'>
          {moment(row?.createdAt)
            .locale(locale)
            .format(locale.startsWith('ar') ? 'D MMMM YYYY' : 'MMMM Do YYYY')}
        </Text>
      )
    }
  ]

  const handleChangeTab = (tab: CreditRequestStatusType) => {
    setStatus(tab)
    setFilters({})
  }
  return (
    <Stack className='gap-8 px-4 py-8 md:px-10'>
      {selectedCreditRequest && (
        <CreditRequestModal
          id={selectedCreditRequest}
          status={status}
          openModal={!!selectedCreditRequest}
          setOpenModal={() => setSelectedCreditRequest(null)}
        />
      )}
      <Text className='text-2xl font-bold text-neutral-700 md:text-4xl'>
        {t('creditsRequests.title')} ({data?.total?.toLocaleString()})
      </Text>
      <ScrollArea offsetScrollbars>
        <AppFragmentTabsControl
          notActiveBg='bg-brand-100/80'
          textColor='text-neutral-600'
          data={controlsData}
          value={status}
          onChange={(tab) => handleChangeTab(tab as CreditRequestStatusType)}
        />
      </ScrollArea>

      <Group className='w-full items-center gap-2'>
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
            input: 'py-3 bg-default-background'
          }}
          size='sm'
          className='flex-1 rounded-md bg-transparent outline-none'
          placeholder={t('creditsRequests.placeholders.search')}
          radius='xl'
          value={filters.text}
          onChange={(e) => setFilters({ ...filters, text: e.target.value })}
        />
      </Group>

      <Stack className='gap-8'>
        <AppDataTable<CreditsRequest>
          noRecordsText={t('shared.emptyDescription', {
            item: t('creditsRequests.title')
          })}
          records={creditsRequests}
          columns={columns}
          fetching={isLoading || isFetching}
          onRowClick={({ index }) => {
            // TODO: fix this
            setSelectedCreditRequest((creditsRequests[index] as any).id)
          }}
        />
        <Box className='flex items-center justify-center'>
          <AppPagination
            activeBgColor='linear-gradient(180deg, #F6A649 0%, #90612B 100%)'
            value={data?.page || (filters.page ? Number(filters.page) : 1)}
            onChange={(value) =>
              setFilters({ ...filters, page: String(value) })
            }
            total={data?.totalPages ?? 0}
          />
        </Box>
      </Stack>
    </Stack>
  )
}

export default CreditRequestsPage
