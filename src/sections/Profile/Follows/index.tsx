'use client'

import React from 'react'
import { User } from '@commonTypes'
import { useCreateFollow, useDeleteFollow, useFollowsList } from '@hooks'
import { Box, ScrollArea } from '@mantine/core'
import { useTranslations } from 'next-intl'

import AppPagination from '@components/AppPagination'
import EmptyWrapper from '@components/EmptyWrapper'
import FullScreenError from '@components/FullScreenError'
import ItemsWrapper from '@components/ItemWrapper'
import UserCard, { UserCardSkeleton } from '@components/UserCard'
import { appNotifications } from '@utils'

export interface FollowsSectionProps {
  following?: boolean
  followers?: boolean
}

function FollowsSection({ following, followers }: FollowsSectionProps) {
  const t = useTranslations()
  const { follows, data, isLoading, isError, error, page, setPage } =
    useFollowsList({
      following,
      followers
    })
  const createFollow = useCreateFollow({
    onSuccess: () => {
      appNotifications.success(t('community.successMessages.followed'))
    }
  })

  const deleteFollow = useDeleteFollow({
    onSuccess: () => {
      appNotifications.success(t('community.successMessages.unfollowed'))
    }
  })

  const onUnfollow = (id: string) => {
    deleteFollow.mutate({
      following: id
    })
  }

  const onFollow = (id: string) => {
    createFollow.mutate({
      following: id
    })
  }

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <ScrollArea offsetScrollbars className='h-screen w-full max-w-7xl'>
      <ItemsWrapper
        loading={isLoading}
        className='flex flex-col'
        LoadingComponent={<UserCardSkeleton />}
        EmptyComponent={
          <EmptyWrapper
            description={
              following
                ? t('shared.emptyDescription', {
                    itemName: t('community.followers')
                  })
                : t('community.noFollowingsFound')
            }
          />
        }
      >
        {follows.map((follow) => (
          <Box
            key={follow?._id}
            className='border-b border-neutral-400 px-2 py-4 transition-colors'
          >
            <UserCard
              showFollow={following}
              onFollow={onFollow}
              onUnfollow={onUnfollow}
              showUnfollow={followers}
              user={(following ? follow?.follower : follow?.following) as User}
            />
          </Box>
        ))}
      </ItemsWrapper>
      {data && data?.totalPages > 10 && (
        <Box className='mt-8 flex items-center justify-center'>
          <AppPagination
            value={data?.page || (page ? Number(page) : 1)}
            onChange={(value) => setPage(String(value))}
            total={data?.totalPages ?? 0}
          />
        </Box>
      )}
    </ScrollArea>
  )
}

export default FollowsSection
