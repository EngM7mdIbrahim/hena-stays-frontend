'use client'

import { useTopPerformersList } from '@hooks'
import { Card, Flex, ScrollArea, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import FullScreenError from '@components/FullScreenError'
import ItemsWrapper from '@components/ItemWrapper'
import UserCard, { UserCardSkeleton } from '@components/UserCard'

function AdminTopPerformers() {
  const t = useTranslations()
  const { topPerformers, isLoading, isError, error } = useTopPerformersList()

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <Card className='w-full' shadow='sm' padding='lg' radius='md' withBorder>
      <Stack>
        <Text className='text-lg font-semibold'>
          {t('adminAnalytics.topCompaniesAndAgents')}
        </Text>
        <ScrollArea offsetScrollbars className='h-full'>
          <ItemsWrapper
            loading={isLoading}
            className='flex flex-col gap-4'
            LoadingComponent={<UserCardSkeleton />}
            EmptyComponent={<Text>No users found</Text>}
          >
            {topPerformers?.map((user, index) => (
              <Flex className='items-center gap-4' key={user.user._id}>
                <Flex className='h-6 w-6 items-center justify-center rounded-full bg-neutral-400'>
                  <Text className='text-sm font-semibold'>{index + 1}</Text>
                </Flex>
                <UserCard user={user.user} />
              </Flex>
            ))}
          </ItemsWrapper>
        </ScrollArea>
      </Stack>
    </Card>
  )
}

export default AdminTopPerformers
