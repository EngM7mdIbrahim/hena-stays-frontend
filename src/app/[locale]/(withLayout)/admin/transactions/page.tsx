'use client'

import React, { useState } from 'react'
import {
  CurrencyCode,
  PaymentStatus,
  PaymentStatusValues,
  PaymentTransaction,
  User
} from '@commonTypes'
import { defaultLimitOptions } from '@constants'
import { usePaymentsList } from '@hooks'
import {
  ActionIcon,
  Avatar,
  Badge,
  Flex,
  Group,
  ScrollArea,
  Stack,
  Text
} from '@mantine/core'
import { DataTableColumn } from 'mantine-datatable'
import moment from 'moment'
import { useLocale, useTranslations } from 'next-intl'

import 'moment/locale/ar'

import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

import AppDataTable from '@components/AppDataTable'
import AppFragmentTabsControl from '@components/AppFragmentTabsControl'
import FullScreenError from '@components/FullScreenError'
import LimitButton from '@components/LimitButton'

type RowData = {
  customerDetails: Pick<User, 'name' | 'email'>
  credits: number
  totalAmount: number
  creditsCost: number
  taxAmount: number
  status: string
  createdAt: string
}

function TransactionsPage() {
  const t = useTranslations()
  const locale = useLocale()
  const [page, setPage] = useState(1)
  const {
    payments,
    data,
    isLoading,

    setLimit,

    limit,
    isError,
    error,
    isFetching,
    filters,
    setFilters
  } = usePaymentsList()

  if (isError && error) return <FullScreenError error={error} />

  const controlsData = [
    {
      label: t('transactions.controls.completed'),
      value: PaymentStatusValues.Complete
    },
    {
      label: t('transactions.controls.pending'),
      value: PaymentStatusValues.Open
    },
    {
      label: t('transactions.controls.expired'),
      value: PaymentStatusValues.Expired
    }
  ]

  const columns: DataTableColumn<RowData>[] = [
    {
      accessor: 'customerDetails',
      title: t('transactions.columns.user'),
      render: (row) => (
        <Flex className='items-center gap-3'>
          <Avatar
            src={null}
            name={row.customerDetails?.name}
            size='md'
            radius='xl'
          />
          <Stack className='gap-0'>
            <Text className='text-sm font-semibold capitalize'>
              {row.customerDetails?.name || '-'}
            </Text>
            <Text className='text-sm font-semibold'>
              {row.customerDetails?.email || '-'}
            </Text>
          </Stack>
        </Flex>
      )
    },
    {
      accessor: 'credits',
      title: t('transactions.columns.credits'),
      render: (row) => (
        <Text className='text-sm font-semibold capitalize'>{row.credits}</Text>
      )
    },
    {
      accessor: 'totalAmount',
      title: t('transactions.columns.priceWithTaxes'),
      render: (row) => (
        <Text className='text-sm font-semibold capitalize'>
          {CurrencyCode.Aed} {row.totalAmount?.toLocaleString() ?? 0}
        </Text>
      )
    },
    {
      accessor: 'creditsCost',
      title: t('transactions.columns.priceWithoutTaxes'),
      render: (row) => (
        <Text className='text-sm font-semibold capitalize'>
          {CurrencyCode.Aed} {row.creditsCost?.toLocaleString() ?? 0}
        </Text>
      )
    },
    {
      accessor: 'taxAmount',
      title: t('transactions.columns.taxAmount'),
      render: (row) => (
        <Text className='text-sm font-semibold capitalize'>
          {CurrencyCode.Aed} {row.taxAmount?.toLocaleString() ?? 0}
        </Text>
      )
    },
    {
      accessor: 'status',
      title: t('creditsRequests.columns.status'),
      render: (row) => {
        let color = ''
        if (row.status === 'open') color = 'yellow'
        if (row.status === 'complete') color = 'green'
        if (row.status === 'expired') color = 'red'

        return (
          <Badge color={color} variant='light'>
            {row.status}
          </Badge>
        )
      }
    },
    {
      accessor: 'createdAt',
      title: t('transactions.columns.createdAt'),
      render: (row) => (
        <Text className='text-sm font-semibold capitalize'>
          {moment(row.createdAt)
            .locale(locale)
            .format(locale.startsWith('ar') ? 'D MMMM YYYY' : 'MMMM Do YYYY')}
        </Text>
      )
    }
  ]

  const handleNextPage = () => {
    if (data?.hasNext) {
      setPage(page + 1)
      setFilters({
        ...filters,
        starting_after: payments.at(-1)?.id || '',
        ending_before: ''
      })
    }
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
      setFilters({
        ...filters,
        ending_before: payments.at(0)?.id || '',
        starting_after: ''
      })
    }
  }

  return (
    <Stack className='gap-8 px-4 py-8 md:px-10'>
      <Text className='text-2xl font-bold text-neutral-700 md:text-4xl'>
        {t('transactions.title')}
      </Text>
      <ScrollArea offsetScrollbars>
        <AppFragmentTabsControl
          notActiveBg='bg-brand-100/80'
          textColor='text-neutral-600'
          data={controlsData}
          value={filters.status}
          onChange={(tab) =>
            setFilters({ ...filters, status: tab as PaymentStatus })
          }
        />
      </ScrollArea>

      <Group className='w-full items-center gap-2'>
        <LimitButton
          radius='xl'
          value={limit.toString()}
          onChange={(value) => {
            setLimit(Number(value ?? defaultLimitOptions[0].value))
          }}
          data={defaultLimitOptions}
        />
      </Group>

      <Stack className='gap-8'>
        <AppDataTable<PaymentTransaction>
          noRecordsText={t('shared.emptyDescription', {
            item: t('transactions.title')
          })}
          records={payments}
          columns={columns}
          fetching={isLoading || isFetching}
        />
        <Flex className='flex items-center justify-center'>
          <Flex className='items-center gap-2'>
            <ActionIcon disabled={page === 1} onClick={handlePreviousPage}>
              {locale.startsWith('ar') ? <BiChevronRight /> : <BiChevronLeft />}
            </ActionIcon>

            <Text className='font-semibold capitalize'>{page}</Text>

            <ActionIcon disabled={!data?.hasNext} onClick={handleNextPage}>
              {locale.startsWith('ar') ? <BiChevronLeft /> : <BiChevronRight />}
            </ActionIcon>
          </Flex>
        </Flex>
      </Stack>
    </Stack>
  )
}

export default TransactionsPage
