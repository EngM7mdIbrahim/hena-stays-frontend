'use client'

import React from 'react'
import { defaultLimitOptions, getDefaultSortOptions } from '@constants'
import { useContactUsList } from '@hooks'
import { Box, Group, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import AppPagination from '@components/AppPagination'
import { CallRequestCardSkeleton } from '@components/CallRequestCard'
import ContactUsAdminCard from '@components/ContactUsAdminCard'
import SearchField from '@components/CustomFields/SearchField'
import EmptyWrapper from '@components/EmptyWrapper'
import FullScreenError from '@components/FullScreenError'
import ItemsWrapper from '@components/ItemWrapper'
import LimitButton from '@components/LimitButton'
import SortButton from '@components/SortButton'

function ContactUsSection() {
  const t = useTranslations()
  const {
    contactUsRequests,
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
  } = useContactUsList()

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
            {t('contactUsRequests.title')} (
            {data?.total?.toLocaleString('en-US')})
          </Text>
        </Stack>
      </Group>

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
          placeholder={t('contactUsRequests.placeholders.search')}
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
              itemName: t('contactUsRequests.title')
            })}
          />
        }
      >
        {contactUsRequests.map((request) => (
          <ContactUsAdminCard key={request._id} request={request} />
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

export default ContactUsSection
