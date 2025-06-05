'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { User, UserRole } from '@commonTypes'
import { navigationLinks, SEARCH_PARAM_KEYS } from '@constants'
import { PostTypes } from '@enums'
import { useLinkConstructor } from '@hooks'
import { Avatar, Box, Flex, Group, Skeleton, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import { cn, userRoleMap } from '@utils'

import CustomRating from '../AppRating'

export function UserCardSkeleton() {
  return (
    <Group justify='space-between' className='my-4'>
      <Group className='items-start'>
        <Skeleton height={40} circle />
        <Box>
          <Skeleton height={16} width={100} mb={4} />
          <Skeleton height={14} width={80} />
        </Box>
      </Group>

      <Stack align='center' gap='sm'>
        <Skeleton height={22} width={22} circle />
        <Skeleton height={14} width={60} />
      </Stack>
    </Group>
  )
}

export interface UserCardProps {
  showRate?: boolean
  showUnfollow?: boolean
  showFollow?: boolean
  RatingValue?: number
  numberOfVotes?: number
  user: User | null
  className?: string
  onUnfollow?: (id: string) => void
  onFollow?: (id: string) => void
}

function UserCard({
  showRate,
  showUnfollow,
  showFollow,
  RatingValue,
  numberOfVotes,
  user,
  onUnfollow,
  onFollow,
  className
}: UserCardProps) {
  const t = useTranslations()
  const router = useRouter()
  const { constructLink } = useLinkConstructor()

  const handleUserClick = () => {
    if (user?.role === UserRole.User) return
    router.push(
      constructLink(navigationLinks.community.profile(user?._id), {
        [SEARCH_PARAM_KEYS.TYPE_KEY]: PostTypes.Media
      })
    )
  }

  return (
    <Group className={cn(className)} justify='space-between'>
      <Group
        onClick={handleUserClick}
        className={cn('items-start', {
          'cursor-pointer': user?.role !== UserRole.User
        })}
      >
        <Avatar
          name={user?.name}
          size={40}
          src={
            user?.role === UserRole.Admin
              ? navigationLinks.assets.logo
              : user?.image
          }
          radius='xl'
        />
        <Box>
          <Text className='capitalize' size='sm' fw={500}>
            {user?.name}
          </Text>
          {user?.role && (
            <Text size='sm' c='dimmed'>
              {userRoleMap(t, user?.role)}
            </Text>
          )}
          {showRate && (
            <Flex className='items-center gap-2'>
              <CustomRating size={16} readOnly value={RatingValue || 2} />
              <Text fz='sm' c='dimmed'>
                ({numberOfVotes}) votes
              </Text>
            </Flex>
          )}
        </Box>
      </Group>
      {/* this because the user can not have followers */}
      {showFollow && user?.role !== UserRole.User && (
        <Stack
          className='cursor-pointer'
          onClick={() => onFollow && user?._id && onFollow(user._id)}
          align='center'
          gap='0'
        >
          <Image
            src={navigationLinks.assets.userFollow}
            alt='Follow'
            width={30}
            height={30}
            className='dark:brightness-200'
          />
          <Text size='sm' className='text-secondary'>
            {t('community.follow')}
          </Text>
        </Stack>
      )}

      {showUnfollow && (
        <Stack
          className='cursor-pointer'
          onClick={() => onUnfollow && user?._id && onUnfollow(user._id)}
          align='center'
          gap='0'
        >
          <Image
            src={navigationLinks.assets.userUnfollow}
            alt='Unfollow'
            width={30}
            height={30}
            className='dark:brightness-200'
          />

          <Text size='sm' className='text-neutral-700'>
            {t('community.unfollow')}
          </Text>
        </Stack>
      )}
    </Group>
  )
}

export default UserCard
