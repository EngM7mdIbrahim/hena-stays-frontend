'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { UserRole, UserRoleType } from '@commonTypes'
import {
  defaultLimitOptions,
  getDefaultSortOptions,
  navigationLinks,
  SEARCH_PARAM_KEYS
} from '@constants'
import { useLinkConstructor, useUsersList } from '@hooks'
import { Box, Button, Group, ScrollArea, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { PiPlus } from 'react-icons/pi'

import AdminUserCard from '@components/AdminUserCard'
import AppFragmentTabsControl from '@components/AppFragmentTabsControl'
import AppPagination from '@components/AppPagination'
import SearchField from '@components/CustomFields/SearchField'
import { EmployeeAgentCardSkeleton } from '@components/EmployeeAgentCard'
import EmptyWrapper from '@components/EmptyWrapper'
import FullScreenError from '@components/FullScreenError'
import ItemsWrapper from '@components/ItemWrapper'
import LimitButton from '@components/LimitButton'
import SortButton from '@components/SortButton'

function UsersSection() {
  const t = useTranslations()
  const [activeControl, setActiveControl] = useState<UserRoleType>(
    UserRole.Company
  )

  const { constructLink } = useLinkConstructor()

  const {
    users,
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
  } = useUsersList({
    role: activeControl
  })
  let label = ''
  if (activeControl === UserRole.Company) {
    label = `${t('shared.userRoles.company')} (${data?.total || 0})`
  } else if (activeControl === UserRole.Broker) {
    label = `${t('shared.userRoles.broker')} (${data?.total || 0})`
  } else if (activeControl === UserRole.User) {
    label = `${t('shared.userRoles.user')} (${data?.total || 0})`
  } else if (activeControl === UserRole.Support) {
    label = `${t('shared.userRoles.support')} (${data?.total || 0})`
  }

  const controlsData = [
    {
      value: UserRole.Company,
      label: t('shared.userRoles.company')
    },
    {
      value: UserRole.Broker,
      label: t('shared.userRoles.broker')
    },
    {
      value: UserRole.User,
      label: t('shared.userRoles.user')
    },
    {
      value: UserRole.Support,
      label: t('shared.userRoles.support')
    }
  ]

  const handleChangeTab = (tab: UserRoleType) => {
    setActiveControl(tab)
    setFilters({})
  }

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <Stack className='gap-4 px-4 py-8 md:px-10'>
      <Group className='items-center justify-between'>
        <Text className='text-2xl font-bold text-neutral-700 md:text-4xl'>
          {label}
        </Text>
        <Group gap='sm'>
          <Button
            component={Link}
            href={navigationLinks.admin.users.viewCallRequests}
            radius='sm'
            variant='light'
            color='gray'
            size='md'
            className='capitalize text-primary'
          >
            {t('adminUsers.viewCallRequest')}
          </Button>
          <Button
            component={Link}
            href={navigationLinks.admin.users.viewContactUsRequests}
            radius='sm'
            variant='light'
            color='gray'
            size='md'
            className='capitalize text-primary'
          >
            {t('adminUsers.viewContactUsRequest')}
          </Button>
        </Group>
      </Group>
      <Group className='items-center justify-between'>
        <ScrollArea offsetScrollbars>
          <AppFragmentTabsControl
            notActiveBg='bg-brand-100/80'
            textColor='text-neutral-600'
            data={controlsData}
            value={activeControl}
            onChange={(tab) => handleChangeTab(tab as UserRoleType)}
          />
        </ScrollArea>

        <Button
          component={Link}
          href={constructLink(navigationLinks.admin.users.addUser, {
            [SEARCH_PARAM_KEYS.TYPE_KEY]: activeControl
          })}
          radius='sm'
          variant='light'
          color='gray'
          size='md'
          leftSection={<PiPlus />}
          className='capitalize text-primary'
        >
          {t('shared.buttons.add')}{' '}
          {
            controlsData.find((control) => control.value === activeControl)
              ?.label
          }
        </Button>
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
            input: 'py-3 bg-default-background'
          }}
          size='sm'
          className='flex-1 rounded-md bg-transparent outline-none'
          placeholder={t('adminUsers.search')}
          radius='xl'
          value={filters.text}
          onChange={(e) => setFilters({ ...filters, text: e.target.value })}
        />
      </Group>
      <Stack className='gap-8'>
        <ItemsWrapper
          loading={isLoading}
          className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          LoadingComponent={<EmployeeAgentCardSkeleton />}
          EmptyComponent={
            <EmptyWrapper
              description={t('shared.emptyDescription', {
                itemName: t('adminUsers.title')
              })}
            />
          }
        >
          {users?.map((user) => <AdminUserCard key={user._id} user={user} />)}
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

export default UsersSection
