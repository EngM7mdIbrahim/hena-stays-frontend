'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { UserRole } from '@commonTypes'
import {
  defaultLimitOptions,
  getDefaultSortOptions,
  navigationLinks,
  SEARCH_PARAM_KEYS
} from '@constants'
import { Modules } from '@enums'
import {
  useEmployeesList,
  useGetUserPermissions,
  useLinkConstructor
} from '@hooks'
import { Button, Flex, Group, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { FaUsers } from 'react-icons/fa'

import AppFragmentTabsControl from '@components/AppFragmentTabsControl'
import FullScreenError from '@components/FullScreenError'
import LimitButton from '@components/LimitButton'
import AgentIcon from '@components/RenderableSvg/AgentIcon'
import SortButton from '@components/SortButton'
import { cn } from '@utils'

import AgentsSection from './Agents'
import MyTeamSection from './MyTeam'

function EmployeesSection() {
  const t = useTranslations()
  const [activeControl, setActiveControl] = useState('Agents')
  const { constructLink } = useLinkConstructor()

  const { permissions } = useGetUserPermissions(Modules.EMPLOYEES)

  const {
    users,
    isLoading,
    data,
    isError,
    error,
    page,
    setPage,
    sort,
    setSort,
    limit,
    setLimit
  } = useEmployeesList({
    role: activeControl === 'Agents' ? UserRole.Agent : UserRole.CompanyAdmin
  })

  const controlsData = [
    {
      value: 'Agents',
      label: (
        <Flex className='items-baseline gap-2'>
          <AgentIcon
            className={cn('h-4 w-4', {
              'fill-neutral-500 stroke-neutral-500': activeControl !== 'Agents',
              'fill-white stroke-white': activeControl === 'Agents'
            })}
          />
          <Text>{t('shared.userRoles.agent')}</Text>
        </Flex>
      )
    },
    ...(permissions.canSeeMyTeam
      ? [
          {
            value: 'myTeam',
            label: (
              <Flex className='items-center gap-2'>
                <FaUsers size={24} />
                <Text>{t('employees.buttons.addAgent')}</Text>
              </Flex>
            )
          }
        ]
      : [])
  ]

  const handleChangeTab = (tab: string) => {
    setActiveControl(tab)
    setPage('1')
  }

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <Stack>
      <Text className='text-2xl font-bold text-neutral-700 md:text-4xl'>
        {t('employees.title')}
      </Text>
      <Group className='items-center justify-between'>
        <AppFragmentTabsControl
          notActiveBg='bg-brand-100/80'
          textColor='text-neutral-600'
          data={controlsData}
          value={activeControl}
          onChange={handleChangeTab}
        />

        {permissions.canAddEmployee && (
          <Button
            radius='sm'
            variant='outline'
            size='md'
            component={Link}
            href={constructLink(navigationLinks.employees.addEmployee, {
              [SEARCH_PARAM_KEYS.TYPE_KEY]:
                activeControl === 'Agents'
                  ? UserRole.Agent
                  : UserRole.CompanyAdmin
            })}
            leftSection={
              <Image
                alt='plus'
                src={navigationLinks.assets.plus}
                width={15}
                height={15}
              />
            }
            className='capitalize text-primary'
          >
            {activeControl === 'Agents'
              ? t('employees.buttons.addEmployee')
              : t('employees.buttons.addAgent')}
          </Button>
        )}
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
      </Group>
      {activeControl === 'Agents' && (
        <AgentsSection
          data={data}
          page={page}
          isLoading={isLoading}
          setPage={setPage}
          users={users}
        />
      )}
      {/* this will not render if the user is companyAdmin */}
      {activeControl === 'myTeam' && (
        <MyTeamSection
          data={data}
          page={page}
          isLoading={isLoading}
          setPage={setPage}
          users={users}
        />
      )}
    </Stack>
  )
}

export default EmployeesSection
