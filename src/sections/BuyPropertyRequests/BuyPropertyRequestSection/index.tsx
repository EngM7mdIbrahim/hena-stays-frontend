'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  defaultLimitOptions,
  navigationLinks,
  propertySortOptions
} from '@constants'
import { Modules } from '@enums'
import { useBuyPropertyRequestsList, useGetUserPermissions } from '@hooks'
import { Box, Button, Group, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import AppPagination from '@components/AppPagination'
import ChangeLayoutButton from '@components/Buttons/ChangeLayoutButton'
import EmptyWrapper from '@components/EmptyWrapper'
import Filters from '@components/Filters/BuyPropertyRequestFilters'
import FullScreenError from '@components/FullScreenError'
import ItemsWrapper from '@components/ItemWrapper'
import LimitButton from '@components/LimitButton'
import { LayoutType } from '@components/PropertyCard'
import PropertyRequestCard, {
  PropertyRequestCardSkeleton
} from '@components/PropertyRequestCard'
import SortButton from '@components/SortButton'

function BuyPropertyRequestsSection() {
  const t = useTranslations()
  const [layout, setLayout] = useState<LayoutType>('vertical')

  const { permissions } = useGetUserPermissions(Modules.BUY_PROPERTY_REQUESTS)
  const {
    canViewAllBuyPropertyRequests,
    canViewMyBuyPropertyRequests,
    canAddBuyPropertyRequest
  } = permissions

  const {
    buyPropertyRequests,
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
  } = useBuyPropertyRequestsList({
    mine: `${canViewMyBuyPropertyRequests}`,
    enabled: canViewAllBuyPropertyRequests || canViewMyBuyPropertyRequests
  })

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
            {t('buyPropertyRequests.title')} (
            {data?.total.toLocaleString('en-US')})
          </Text>
        </Stack>
        <Group>
          {canAddBuyPropertyRequest && (
            <Button
              variant='light'
              color='gray'
              className='w-fit rounded-lg font-semibold text-primary'
              size='lg'
              component={Link}
              href={
                navigationLinks.buyPropertyRequests.chooseBuyPropertyRequest
              }
            >
              {t('buyPropertyRequests.addRequest')}
            </Button>
          )}
        </Group>
      </Group>

      <Filters filters={filters} onFiltersChange={setFilters} />

      <Group className='justify-between'>
        <Box className='flex w-full max-w-[410px] items-center gap-2'>
          <SortButton
            radius='xl'
            value={sort ? JSON.stringify(sort) : null}
            onChange={(value) => {
              setSort(value ? JSON.parse(value) : null)
            }}
            data={propertySortOptions(t)}
          />
          <LimitButton
            radius='xl'
            value={limit}
            onChange={(value) => {
              setLimit(value ?? defaultLimitOptions[0].value)
            }}
            data={defaultLimitOptions}
          />
        </Box>
        <Group>
          <ChangeLayoutButton
            className='border border-black/20'
            layout={layout}
            setLayout={setLayout}
          />
        </Group>
      </Group>
      <ItemsWrapper
        loading={isLoading}
        className={`grid grid-cols-1 gap-4 ${layout === 'horizontal' ? 'grid-cols-1 md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}
        LoadingComponent={<PropertyRequestCardSkeleton />}
        EmptyComponent={
          <EmptyWrapper
            description={t('shared.emptyDescription', {
              itemName: t('properties.title')
            })}
          />
        }
      >
        {buyPropertyRequests.map((buyPropertyRequest) => (
          <PropertyRequestCard
            key={buyPropertyRequest._id}
            {...buyPropertyRequest}
          />
        ))}
      </ItemsWrapper>
      <Box className='mt-8 flex items-center justify-center'>
        <AppPagination
          value={data?.page || (filters.page ? Number(filters.page) : 1)}
          onChange={(value) => setFilters({ ...filters, page: String(value) })}
          total={data?.totalPages ?? 0}
        />
      </Box>
    </Stack>
  )
}

export default BuyPropertyRequestsSection
