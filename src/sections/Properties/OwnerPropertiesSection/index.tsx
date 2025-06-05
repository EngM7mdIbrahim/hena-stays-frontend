'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  PropertyStatusEnum,
  PropertyStatusEnumType,
  UserRole
} from '@commonTypes'
import {
  defaultLimitOptions,
  navigationLinks,
  propertySortOptions
} from '@constants'
import { Modules } from '@enums'
import { useGetUserPermissions, usePropertiesList, useUser } from '@hooks'
import { Box, Button, Flex, Group, Skeleton, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { BiPlus } from 'react-icons/bi'
import {
  FaBuildingCircleExclamation,
  FaBuildingUser,
  FaCoins
} from 'react-icons/fa6'

import { useGetMySubscription } from '@hooks/query/subscriptions/useGetMySubscription'
import AppFragmentTabsControl from '@components/AppFragmentTabsControl'
import AppPagination from '@components/AppPagination'
import ChangeLayoutButton from '@components/Buttons/ChangeLayoutButton'
import SavedButton from '@components/Buttons/SavedButton'
import EmptyWrapper from '@components/EmptyWrapper'
import Filters from '@components/Filters/PropertyFilters'
import FullScreenError from '@components/FullScreenError'
import ItemsWrapper from '@components/ItemWrapper'
import LimitButton from '@components/LimitButton'
import PropertyCard, {
  LayoutType,
  PropertyCardSkeleton
} from '@components/PropertyCard'
import SortButton from '@components/SortButton'

export interface OwnerPropertiesSectionProps {
  mine?: boolean
  userId?: string
}

function OwnerPropertiesSection({
  mine = true,
  userId
}: OwnerPropertiesSectionProps) {
  const t = useTranslations()
  const { user } = useUser()
  const controlsData = [
    {
      value: PropertyStatusEnum.Active,
      label: (
        <Flex className='items-center gap-2'>
          <FaBuildingUser size={24} />
          <Text>{t('properties.controls.activeListings')}</Text>
        </Flex>
      )
    },
    {
      value: PropertyStatusEnum.Inactive,
      label: (
        <Flex className='items-center gap-2'>
          <FaBuildingCircleExclamation size={24} />
          <Text>{t('properties.controls.heldListings')}</Text>
        </Flex>
      )
    }
  ]
  const handleShowCredits = () => {
    if (user?.role === UserRole.Company) return true
    if (user?.role === UserRole.Broker) return true

    return false
  }
  const { data: subscriptionData, isLoading: isSubscriptionLoading } =
    useGetMySubscription({
      enabled: handleShowCredits()
    })
  const { permissions } = useGetUserPermissions(Modules.PROPERTIES)
  const {
    canCreateProperty,
    canAddXml,
    canViewXmlRequests,
    canViewSavedProperties
  } = permissions

  const [layout, setLayout] = useState<LayoutType>('vertical')
  const [status, setStatus] = useState<PropertyStatusEnumType>(
    PropertyStatusEnum.Inactive
  )
  const {
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
  } = usePropertiesList({ mine: String(mine), status, createdBy: userId })

  const handleMovingBetweenTabs = (tab: PropertyStatusEnumType) => {
    setStatus(tab)
    setFilters({})
  }

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <Stack gap='md'>
      {isSubscriptionLoading && <Skeleton height={20} width={60} />}
      {handleShowCredits() && !isSubscriptionLoading && (
        <Flex className='items-center gap-2 text-sm'>
          <Text>
            {t('premium.availableCredits')}:{' '}
            {subscriptionData?.subscription.credits}
          </Text>
          <FaCoins className='text-primary' />
        </Flex>
      )}
      <Group className='w-full items-baseline justify-between'>
        <Stack>
          <Text
            component='h1'
            className='text-2xl font-bold text-neutral-700 md:text-4xl'
          >
            {mine ? t('properties.mineTitle') : t('properties.properties')} (
            {data?.total?.toLocaleString('en-US')})
          </Text>
        </Stack>
        <Group>
          {canViewXmlRequests && (
            <Button
              component={Link}
              href={navigationLinks.admin.properties.xmlRequests}
              variant='light'
              color='gray'
              className='rounded-lg font-semibold text-primary'
              size='lg'
            >
              {t('properties.buttons.xmlRequests')}
            </Button>
          )}
          {canCreateProperty && (
            <Button
              component={Link}
              href={navigationLinks.properties.addProperty}
              variant='light'
              color='gray'
              className='rounded-lg font-semibold text-primary'
              size='lg'
              leftSection={<BiPlus size={24} />}
            >
              {t('properties.mainBanner.buttonTitle')}
            </Button>
          )}
          {canAddXml && (
            <Button
              component={Link}
              href={navigationLinks.properties.addXml}
              variant='light'
              color='gray'
              className='rounded-lg font-semibold text-primary'
              size='lg'
              leftSection={<BiPlus size={24} />}
            >
              {t('properties.buttons.addXml')}
            </Button>
          )}
          {canViewSavedProperties && <SavedButton />}
        </Group>
      </Group>
      <Filters filters={filters} onFiltersChange={setFilters} />
      <Box>
        <AppFragmentTabsControl
          notActiveBg='bg-brand-100/80'
          textColor='text-neutral-600'
          data={controlsData}
          value={status}
          onChange={(value) =>
            handleMovingBetweenTabs(value as PropertyStatusEnumType)
          }
        />
      </Box>

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
        LoadingComponent={<PropertyCardSkeleton />}
        EmptyComponent={
          <EmptyWrapper
            description={t('shared.emptyDescription', {
              itemName: t('properties.properties')
            })}
          />
        }
      >
        {properties.map((property) => (
          <PropertyCard
            key={property._id}
            layout={layout}
            property={property}
          />
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

export default OwnerPropertiesSection
