import { useState } from 'react'
import { UserRole } from '@commonTypes'
import { navigationLinks } from '@constants'
import {
  Avatar,
  Box,
  Flex,
  Group,
  Skeleton,
  Stack,
  Text,
  UnstyledButton
} from '@mantine/core'
import FollowsSection from '@sections/Profile/Follows'
import { useTranslations } from 'next-intl'

import CustomRating from '@components/AppRating'
import AppModal from '@components/Modals/AppModal'
import { UserCardProps } from '@components/UserCard'
import { cn, userRoleMap } from '@utils'

function ProfileInfoLoading() {
  return (
    <>
      <Skeleton height={50} circle mb='xl' />
      <Skeleton height={8} radius='xl' />
      <Skeleton height={8} mt={6} radius='xl' />
      <Skeleton height={8} mt={6} width='70%' radius='xl' />
    </>
  )
}

export interface ProfileInfoProps extends UserCardProps {
  numOfFollowers?: number
  numOfFollowing?: number
  // responseTime?: string
  loading?: boolean
  isMyProfile?: boolean
}

export default function ProfileInfo({
  className,
  showRate,
  numOfFollowers,
  numOfFollowing,
  // responseTime,
  RatingValue,
  numberOfVotes,
  user,
  isMyProfile,
  loading
}: ProfileInfoProps) {
  const t = useTranslations()
  const [openFollowersModal, setOpenFollowersModal] = useState(false)
  const [openFollowingsModal, setOpenFollowingsModal] = useState(false)
  if (loading) {
    return <ProfileInfoLoading />
  }

  return (
    <Box>
      <Group className={cn(className)} justify='space-between'>
        <Group className='items-start'>
          <Avatar
            size='lg'
            name={user?.name}
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
            <Text size='sm' c='dimmed'>
              {user?.role && userRoleMap(t, user?.role)}
            </Text>
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

        <Stack className='text-default-text'>
          <Flex className='items-center gap-1'>
            <AppModal
              open={!isMyProfile ? false : openFollowersModal}
              setOpen={!isMyProfile ? () => {} : setOpenFollowersModal}
              size='lg'
              title={t('community.followers')}
              trigger={
                <UnstyledButton
                  className={cn(
                    'cursor-default font-bold',
                    isMyProfile && 'cursor-pointer underline hover:no-underline'
                  )}
                >
                  {numOfFollowers}
                </UnstyledButton>
              }
            >
              {isMyProfile && <FollowsSection following />}
            </AppModal>

            <Text className='capitalize'>
              {numOfFollowers === 1
                ? t('community.follower')
                : t('community.followers')}
            </Text>
          </Flex>
          <Flex className='flex items-center gap-1'>
            <AppModal
              open={!isMyProfile ? false : openFollowingsModal}
              setOpen={!isMyProfile ? () => {} : setOpenFollowingsModal}
              size='lg'
              title={t('community.followings')}
              trigger={
                <UnstyledButton
                  className={cn(
                    'cursor-default font-bold',
                    isMyProfile && 'cursor-pointer underline hover:no-underline'
                  )}
                >
                  {numOfFollowing}
                </UnstyledButton>
              }
            >
              {isMyProfile && <FollowsSection followers />}
            </AppModal>

            <Text className='capitalize'>{t('community.followings')}</Text>
          </Flex>
          {/* <Box className='text-sm'>
            <Text>
              Always responds within{' '}
              <Text component='span' className='font-bold'>
                {responseTime}
              </Text>
            </Text>
          </Box> */}
        </Stack>
      </Group>
    </Box>
  )
}
