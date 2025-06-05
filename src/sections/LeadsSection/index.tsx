'use client'

import React, { useState } from 'react'
import { LeadsStatusEnum, leadsStatusType } from '@commonTypes'
import { defaultLimitOptions, getDefaultSortOptions } from '@constants'
import { Modules } from '@enums'
import { useGetUserPermissions, useLeadsList } from '@hooks'
import { Box, Flex, Group, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import AppFragmentTabsControl from '@components/AppFragmentTabsControl'
import AppPagination from '@components/AppPagination'
import EmptyWrapper from '@components/EmptyWrapper'
import FullScreenError from '@components/FullScreenError'
import ItemsWrapper from '@components/ItemWrapper'
import LeadCard, { LeadCardSkeleton } from '@components/LeadCard'
import LimitButton from '@components/LimitButton'
import SortButton from '@components/SortButton'

function LeadsSection() {
  const t = useTranslations()
  const [status, setStatus] = useState<leadsStatusType>(
    LeadsStatusEnum.Approved
  )

  const { permissions } = useGetUserPermissions(Modules.LEADS)
  const { canSeeLeadsRequests } = permissions

  const controlsData = [
    {
      value: LeadsStatusEnum.Approved,
      label: t('leads.controls.approved')
    },

    ...(canSeeLeadsRequests
      ? [
          {
            value: LeadsStatusEnum.Pending,
            label: t('leads.controls.leadsRequests')
          }
        ]
      : [])
  ]

  const {
    leads,
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
  } = useLeadsList({ status })

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
            {t('leads.title')}{' '}
            {status === LeadsStatusEnum.Pending ? t('leads.leadsRequests') : ''}{' '}
            ({data?.total?.toLocaleString('en-US')})
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
            setStatus(value as leadsStatusType)
          }}
        />
      </Box>

      <Flex className='gap-2'>
        <SortButton
          className='max-w-full'
          radius='xl'
          size='md'
          value={sort ? JSON.stringify(sort) : null}
          onChange={(value) => {
            setSort(value ? JSON.parse(value) : null)
          }}
          data={getDefaultSortOptions(t)}
        />
        <LimitButton
          className='max-w-full'
          size='md'
          radius='xl'
          value={limit}
          onChange={(value) => {
            setLimit(value ?? defaultLimitOptions[0].value)
          }}
          data={defaultLimitOptions}
        />
      </Flex>

      <ItemsWrapper
        loading={isLoading}
        className='grid grid-cols-1 gap-4 md:grid-cols-2'
        LoadingComponent={<LeadCardSkeleton />}
        EmptyComponent={
          <EmptyWrapper
            description={t('shared.emptyDescription', {
              itemName: t('leads.title')
            })}
          />
        }
      >
        {leads.map((lead) => (
          <LeadCard key={lead._id} lead={lead} />
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

export default LeadsSection
