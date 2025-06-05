'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { User } from '@commonTypes'
import { navigationLinks, SEARCH_PARAM_KEYS } from '@constants'
import { PostTypes } from '@enums'
import { isPopulated } from '@guards'
import {
  useGetUserCommunityProfile,
  useGetUserPermissions,
  useLinkConstructor
} from '@hooks'
import { ActionIcon, Box, Flex, Stack } from '@mantine/core'
import AddPost from '@sections/Community/AddPost/AddPost'
import BlogsSection from '@sections/Community/BlogsSection'
import PostsSection from '@sections/Community/PostsSection'
import { useTranslations } from 'next-intl'

import AppFragmentTabsControl from '@components/AppFragmentTabsControl'
import BreadcrumbWithHeader from '@components/BreadcrumbWithHeader'
import MethodsCommunication from '@components/MethodsCommunication'
import AppModal from '@components/Modals/AppModal'
import ProfileInfo from '@components/ProfileInfo'

export interface ProfileSectionProps {
  params: { profileId: string }
}

function ProfileSection({ params }: ProfileSectionProps) {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const postsType = searchParams?.get(SEARCH_PARAM_KEYS.TYPE_KEY) as PostTypes
  const router = useRouter()
  const { constructLink } = useLinkConstructor()
  const [openAddPostModal, setOpenAddPostModal] = useState(false)

  const getProfile = useGetUserCommunityProfile({
    id: params.profileId
  })

  const { user } = useGetUserPermissions()

  const handleMovingBetweenPages = (value: string) => {
    if (value?.toLocaleLowerCase() === PostTypes.Blog) {
      router.push(
        constructLink(navigationLinks.community.profile(params.profileId), {
          [SEARCH_PARAM_KEYS.TYPE_KEY]: PostTypes.Blog
        })
      )
    } else {
      router.push(
        constructLink(navigationLinks.community.profile(params.profileId), {
          [SEARCH_PARAM_KEYS.TYPE_KEY]: PostTypes.Media
        })
      )
    }
  }

  let defaultValue
  if (postsType) {
    if (postsType === PostTypes.Media) {
      defaultValue = 'Posts'
    } else {
      defaultValue = 'Blog'
    }
  } else {
    defaultValue = 'Posts'
  }

  return (
    <>
      <BreadcrumbWithHeader
        title={getProfile?.data?.user?.name || ''}
        list={[
          {
            label: t('community.title'),
            link: navigationLinks.community.allPosts
          },
          {
            label: getProfile?.data?.user?.name || '',
            link: `${navigationLinks.community.profile(params.profileId)}` || ''
          }
        ]}
      />
      <Box className='py-8'>
        <Stack className='mb-4 border-b py-6'>
          <ProfileInfo
            user={
              isPopulated<User>(getProfile?.data?.user)
                ? getProfile?.data?.user
                : null
            }
            isMyProfile={user?._id === params.profileId}
            // TODO: add rating
            // RatingValue={4}
            // numberOfVotes={100}
            // showRate
            numOfFollowers={getProfile?.data?.totalFollowers}
            numOfFollowing={getProfile?.data?.totalFollowing}
            // responseTime='1 day'
            loading={getProfile.isLoading}
          />
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
          {/* commented because there is no bio */}
          {/* <Stack className='gap-2'>
          <Text className='font-semibold text-gray-900'>Bio</Text>
          <Text className='text-gray-900'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
            eius neque tempora cupiditate et magni incidunt commodi. Suscipit
            reiciendis veritatis, tempora sapiente hic neque unde, vitae
            repellat dolores officiis quis.
          </Text>
        </Stack> */}
        </Stack>
        <Flex className='relative' justify='space-between' align='center'>
          <AppFragmentTabsControl
            defaultValue={defaultValue}
            onChange={handleMovingBetweenPages}
            data={[
              {
                label: t('community.controls.posts'),
                value: 'Posts'
              },
              {
                label: t('community.controls.blogs'),
                value: 'Blog'
              }
            ]}
          />
          {user?._id === params.profileId && (
            <Flex className='gap-4' justify='space-between' align='center'>
              {postsType === PostTypes.Blog ? (
                <ActionIcon
                  component={Link}
                  href={navigationLinks.community.addBlogPost}
                  className='text-primary'
                  variant='outline'
                  size={40}
                  aria-label='blog posts'
                >
                  <Image
                    alt='plus'
                    src={navigationLinks.assets.plus}
                    width={15}
                    height={15}
                  />
                </ActionIcon>
              ) : (
                <AppModal
                  open={openAddPostModal}
                  setOpen={setOpenAddPostModal}
                  size='lg'
                  title={t('community.postForm.title')}
                  trigger={
                    <ActionIcon
                      className='text-primary'
                      variant='outline'
                      size={40}
                      aria-label='Video posts'
                    >
                      <Image
                        alt='plus'
                        src={navigationLinks.assets.plus}
                        width={15}
                        height={15}
                      />
                    </ActionIcon>
                  }
                >
                  <AddPost setOpen={setOpenAddPostModal} />
                </AppModal>
              )}
            </Flex>
          )}
        </Flex>
        <Box className='mt-4'>
          {postsType === PostTypes.Media ? (
            <PostsSection id={params.profileId} />
          ) : (
            <BlogsSection id={params.profileId} />
          )}
        </Box>
      </Box>
    </>
  )
}

export default ProfileSection
