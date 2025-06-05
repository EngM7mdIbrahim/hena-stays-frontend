'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  FindAllBlogsRequestQuery,
  FindAllPostsRequestQuery
} from '@commonTypes'
import { navigationLinks, SEARCH_PARAM_KEYS } from '@constants'
import { Modules, PostTypes } from '@enums'
import { useGetUserPermissions, useLinkConstructor } from '@hooks'
import { ActionIcon, Button, Flex, Skeleton, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { BiUser } from 'react-icons/bi'
import { FaBookmark } from 'react-icons/fa'

import AppFragmentTabsControl from '@components/AppFragmentTabsControl'
import SearchField from '@components/CustomFields/SearchField'
import AppModal from '@components/Modals/AppModal'

import AddPost from './AddPost/AddPost'

export function CommunityHeaderLoading() {
  return (
    <Stack className='gap-8'>
      <Flex
        className='relative flex-wrap gap-2'
        justify='space-between'
        align='center'
      >
        <Skeleton height={40} width={250} />
        <Flex
          className='flex-wrap gap-4'
          justify='space-between'
          align='center'
        >
          <Skeleton height={30} width={100} />
          <Skeleton height={30} width={100} />
          <Skeleton height={30} width={100} />
        </Flex>
      </Flex>
      <Flex className='relative' justify='space-between' align='center'>
        <Flex justify='start' gap={10} align='center'>
          <Skeleton height={30} width={80} />
          <Skeleton height={30} width={80} />
        </Flex>
        <Flex className='gap-4' justify='space-between' align='center'>
          <Skeleton height={30} width={30} />
        </Flex>
      </Flex>
    </Stack>
  )
}

export interface CommunityHeaderProps {
  filters:
    | Pick<FindAllPostsRequestQuery, 'filter' | 'text'>
    | Pick<FindAllBlogsRequestQuery, 'filter' | 'text'>
  onFiltersChange: (
    filters:
      | Pick<FindAllPostsRequestQuery, 'filter' | 'text'>
      | Pick<FindAllBlogsRequestQuery, 'filter' | 'text'>
  ) => void
}

function CommunityHeader({ filters, onFiltersChange }: CommunityHeaderProps) {
  const t = useTranslations()
  const [openAddPostModal, setOpenAddPostModal] = useState(false)
  const { user, permissions, loading } = useGetUserPermissions(
    Modules.COMMUNITY
  )
  const {
    canSeeCommunityHeaderTitle,
    canCreatePost,
    canInteractWithPost,
    canCreateBlogPost,
    canCheckMyProfile,
    canSearchWithInPage
  } = permissions
  const { constructLink } = useLinkConstructor()

  const router = useRouter()

  const handleMovingBetweenPages = (value: string) => {
    if (value?.toLocaleLowerCase() === PostTypes.Blog) {
      router.push(
        constructLink(navigationLinks.community.allPosts, {
          [SEARCH_PARAM_KEYS.TYPE_KEY]: PostTypes.Blog
        })
      )
    } else {
      router.push(
        constructLink(navigationLinks.community.allPosts, {
          [SEARCH_PARAM_KEYS.TYPE_KEY]: PostTypes.Media
        })
      )
    }
  }

  const postsType = useSearchParams()?.get(SEARCH_PARAM_KEYS.TYPE_KEY)

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

  return loading ? (
    <CommunityHeaderLoading />
  ) : (
    <Stack className='gap-8'>
      <Flex
        className='relative flex-wrap gap-2'
        justify='space-between'
        align='center'
      >
        {canSeeCommunityHeaderTitle && (
          <Text className='text-3xl font-bold text-neutral-700'>
            {t('community.title')}
          </Text>
        )}
        <Flex
          className='flex-wrap gap-4'
          justify='space-between'
          align='center'
        >
          {canCreatePost && (
            <AppModal
              open={openAddPostModal}
              setOpen={setOpenAddPostModal}
              size='lg'
              title={t('community.postForm.title')}
              trigger={
                <Button
                  radius='sm'
                  variant='outline'
                  size='md'
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
                  {t('community.buttons.newPost')}
                </Button>
              }
            >
              <AddPost setOpen={setOpenAddPostModal} />
            </AppModal>
          )}
          {canCreateBlogPost && (
            <Button
              component={Link}
              href={navigationLinks.community.addBlogPost}
              radius='sm'
              variant='outline'
              size='md'
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
              {t('community.buttons.newBlog')}
            </Button>
          )}
          {canCheckMyProfile && (
            <Button
              component={Link}
              href={constructLink(
                navigationLinks.community.profile(user?._id),
                {
                  [SEARCH_PARAM_KEYS.TYPE_KEY]: PostTypes.Media
                }
              )}
              radius='sm'
              variant='light'
              color='gray'
              size='md'
              leftSection={<BiUser size={20} />}
              className='capitalize text-primary'
            >
              {t('community.buttons.myProfile')}
            </Button>
          )}
        </Flex>
      </Flex>
      <Flex
        className='relative mb-6 flex-wrap gap-6'
        justify='space-between'
        align='center'
      >
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
          className='order-2 md:order-1'
          textColor='text-neutral-600'
          notActiveBg='bg-brand-100/80'
        />
        {canSearchWithInPage && (
          <SearchField
            className='order-1 w-full rounded-full py-3 md:order-2 md:w-[400px]'
            placeholder={t('community.fields.search')}
            radius='lg'
            value={filters.text || ''}
            onChange={(e) =>
              onFiltersChange({ ...filters, text: e.target.value })
            }
          />
        )}

        {canInteractWithPost && (
          <ActionIcon
            className='order-3 text-primary'
            variant='light'
            component={Link}
            href={navigationLinks.community.savedPosts}
            size={40}
            color='gray'
            aria-label='Saved posts'
          >
            <FaBookmark className='text-primary' size={20} />
          </ActionIcon>
        )}
      </Flex>
    </Stack>
  )
}

export default CommunityHeader
