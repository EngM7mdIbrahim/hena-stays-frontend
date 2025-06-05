'use client'

import React from 'react'
import { PropertyXMLStatus, PropertyXMLStatusType } from '@commonTypes'
import { defaultLimitOptions, getDefaultSortOptions } from '@constants'
import { useXmlPropertiesList } from '@hooks'
import { Box, Group, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import AppFragmentTabsControl from '@components/AppFragmentTabsControl'
import AppPagination from '@components/AppPagination'
import SearchField from '@components/CustomFields/SearchField'
import EmptyWrapper from '@components/EmptyWrapper'
import FullScreenError from '@components/FullScreenError'
import ItemsWrapper from '@components/ItemWrapper'
import LimitButton from '@components/LimitButton'
import SortButton from '@components/SortButton'
import XmlCard, { XmlCardSkeleton } from '@components/Xml/XmlCard'

function AdminXmlRequestsSection() {
  const t = useTranslations()
  const [status, setStatus] = React.useState<PropertyXMLStatusType>(
    PropertyXMLStatus.Approved
  )

  const controlsData = [
    {
      label: t('xml.xmlRequests.status.approved'),
      value: PropertyXMLStatus.Approved
    },
    {
      label: t('xml.xmlRequests.status.rejected'),
      value: PropertyXMLStatus.Rejected
    },
    {
      label: t('xml.xmlRequests.status.pending'),
      value: PropertyXMLStatus.Pending
    }
  ]

  const {
    properties,
    isLoading,
    data,
    isError,
    error,
    filters,
    setFilters,
    sort,
    setSort,
    limit,
    setLimit
  } = useXmlPropertiesList({ status })

  const handleChangeTab = (tab: PropertyXMLStatusType) => {
    setStatus(tab)
    setFilters({ ...filters, page: '1' })
  }

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <Stack className='px-4 py-8 md:px-10'>
      <Text className='text-2xl font-bold text-neutral-700 md:text-4xl'>
        {t('xml.xmlRequests.title')} ({data?.total || 0})
      </Text>

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
            input: 'border border-neutral-200'
          }}
          size='sm'
          className='flex-1 rounded-md bg-transparent outline-none'
          placeholder={t('xml.xmlRequests.search')}
          radius='xl'
          value={filters.text}
          onChange={(e) => setFilters({ ...filters, text: e.target.value })}
        />
      </Group>

      <AppFragmentTabsControl
        notActiveBg='bg-brand-100/50'
        textColor='text-neutral-600'
        data={controlsData}
        value={status}
        onChange={(tab) => handleChangeTab(tab as PropertyXMLStatusType)}
      />
      <Stack className='gap-8'>
        <ItemsWrapper
          loading={isLoading}
          className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'
          LoadingComponent={<XmlCardSkeleton />}
          EmptyComponent={
            <EmptyWrapper
              description={t('shared.emptyDescription', {
                itemName: t('xml.xmlRequests.title')
              })}
            />
          }
        >
          {properties?.map((property) => (
            <XmlCard data={property} key={property._id} />
          ))}
        </ItemsWrapper>
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

export default AdminXmlRequestsSection
