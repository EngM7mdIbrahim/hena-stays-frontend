'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { User } from '@commonTypes'
import { isPopulated } from '@guards'
import { useGetUserCommunityProfile } from '@hooks'
import { Box, Flex, Stack } from '@mantine/core'
import BlogsSection from '@sections/Community/BlogsSection'
import PostsSection from '@sections/Community/PostsSection'
import OwnerPropertiesSection from '@sections/Properties/OwnerPropertiesSection'
import { useTranslations } from 'next-intl'

import AppFragmentTabsControl from '@components/AppFragmentTabsControl'
import MethodsCommunication from '@components/MethodsCommunication'
import AppModal from '@components/Modals/AppModal'
import ProfileInfo from '@components/ProfileInfo'

export interface AdminUserViewPageProps {
  params: { userId: string }
}

function AdminUserViewPage({ params }: AdminUserViewPageProps) {
  const t = useTranslations()
  const [activeTab, setActiveTab] = useState<string>('Posts')
  const [openWatermarkModal, setOpenWatermarkModal] = useState(false)

  const getProfile = useGetUserCommunityProfile({
    id: params.userId
  })

  const handleMovingBetweenPages = (value: string) => {
    setActiveTab(value)
  }

  return (
    <Box className='px-4 py-8 md:px-10'>
      <Stack className='mb-4 border-b py-6'>
        <ProfileInfo
          user={
            isPopulated<User>(getProfile?.data?.user)
              ? getProfile?.data?.user
              : null
          }
          isMyProfile
          numOfFollowers={getProfile?.data?.totalFollowers}
          numOfFollowing={getProfile?.data?.totalFollowing}
          // responseTime='1 day'
          loading={getProfile.isLoading}
        />
        {getProfile?.data?.user?.watermark && (
          <AppModal
            open={openWatermarkModal}
            setOpen={setOpenWatermarkModal}
            size='lg'
            title={t('adminUsers.viewWatermark')}
            trigger={
              <button
                type='button'
                className='cursor-pointer self-end font-bold text-primary underline hover:no-underline'
              >
                {t('adminUsers.viewWatermark')}
              </button>
            }
          >
            <Flex className='items-center justify-center'>
              <Image
                src={getProfile?.data?.user?.watermark || ''}
                width={100}
                height={100}
                alt={t('adminUsers.viewWatermark')}
              />
            </Flex>
          </AppModal>
        )}
        <MethodsCommunication
          wrap
          {...(getProfile?.data?.user as User)}
          contactWays={{
            email: true,
            phone: true,
            truedar: true,
            whatsapp: true
          }}
        />
      </Stack>
      <Flex className='relative' justify='space-between' align='center'>
        <AppFragmentTabsControl
          defaultValue={activeTab}
          onChange={handleMovingBetweenPages}
          data={[
            {
              label: t('community.posts'),
              value: 'Posts'
            },
            {
              label: t('community.blogs'),
              value: 'Blog'
            },
            {
              label: t('properties.title'),
              value: 'Properties'
            }
          ]}
        />
      </Flex>
      <Box className='mt-4'>
        {activeTab === 'Posts' && <PostsSection id={params.userId} />}
        {activeTab === 'Blog' && <BlogsSection id={params.userId} />}
        {activeTab === 'Properties' && (
          <OwnerPropertiesSection userId={params.userId} />
        )}
      </Box>
    </Box>
  )
}

export default AdminUserViewPage
