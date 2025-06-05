import React from 'react'
import { UserRoleType } from '@commonTypes'
import { useGetUsersAnalytics } from '@hooks'
import { Box, Card, Skeleton, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import StatsCard from '@components/Analytics/StatsCard'
import FullScreenError from '@components/FullScreenError'
import { userRoleMap } from '@utils'

function UsersAnalyticsLoading() {
  return (
    <Box>
      <Box className='grid grid-cols-3 gap-4'>
        <Skeleton height={16} width='90%' mb={8} className='col-span-2' />
        <Skeleton height={16} width='60%' mb={8} />
        <Skeleton height={24} width='80%' mb={16} className='col-span-3' />
        <Skeleton height={12} width='40%' className='col-span-2' />
        <Skeleton height={12} width='20%' />
      </Box>
    </Box>
  )
}

function AdminUsersAnalytics() {
  const t = useTranslations()
  const { data, isLoading, isError, error } = useGetUsersAnalytics()

  if (isLoading) return <UsersAnalyticsLoading />
  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder>
      <Text className='mb-4 text-lg font-semibold'>
        {t('adminAnalytics.totalUsers')} ({data?.totalCount})
      </Text>
      <Box className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {data?.roles.map((item) => (
          <StatsCard
            key={item._id}
            stat={{
              title: userRoleMap(t, item._id as UserRoleType),
              value: {
                value: item.count
              }
            }}
          />
        ))}
      </Box>
    </Card>
  )
}

export default AdminUsersAnalytics
