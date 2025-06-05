'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { hideCommunityNavigationLinks } from '@constants'
import { CommunityActions } from '@enums'
import {
  useActionListener,
  useAddPostSave,
  useCreateLike,
  usePostsList
} from '@hooks'
import { Box, Card, Group, Skeleton, Stack } from '@mantine/core'
import { useInViewport } from '@mantine/hooks'
import Post from '@sections/Community/Post/Post'
import { useTranslations } from 'next-intl'

import EmptyWrapper from '@components/EmptyWrapper'
import FullScreenError from '@components/FullScreenError'
import ItemsWrapper from '@components/ItemWrapper'
import LoaderScreen from '@components/LoaderScreen'
import { appNotifications } from '@utils'

import CommunityHeader from './CommunityHeader'

export function PostLoading() {
  return (
    <Card shadow='sm' padding='lg' radius='md'>
      {/* Top Section */}
      <Group className='w-full' justify='space-between' align='center'>
        <Skeleton height={40} circle />
        <Box>
          <Skeleton height={12} width='50%' radius='xl' />
          <Skeleton height={10} width='30%' radius='xl' mt={4} />
        </Box>
        <Skeleton height={20} width={50} radius='xl' />
      </Group>
      {/* Description */}
      <Skeleton height={10} mt='md' radius='xl' width='90%' />
      <Skeleton height={10} mt={6} radius='xl' width='80%' />
      <Skeleton height={10} mt={6} radius='xl' width='70%' />
      {/* Banner Image */}
      <Skeleton height={200} mt='md' radius='md' />
      {/* Footer (likes and comments) */}
      <Group mt='md'>
        <Skeleton height={20} width={50} radius='xl' />
        <Skeleton height={20} width={50} radius='xl' />
      </Group>
    </Card>
  )
}

export interface PostsSectionProps {
  id?: string
}

function PostsSection({ id }: PostsSectionProps) {
  const { ref, inViewport } = useInViewport()
  const pathName = usePathname()
  const router = useRouter()
  const t = useTranslations()
  const { mutate: likePost } = useCreateLike({
    onSuccess: () => {
      router.replace(pathName)
      appNotifications.success(
        'Welcome to the community! You have liked that post'
      )
    }
  })

  const { mutate: savePost } = useAddPostSave({
    onSuccess: () => {
      router.replace(pathName)
      appNotifications.success('Post saved successfully')
    }
  })

  useActionListener(CommunityActions, {
    [CommunityActions.LIKE]: async ({ id: postId }) => {
      likePost({
        post: postId
      })
    },
    [CommunityActions.SAVE]: async ({ id: postId }) => {
      savePost({
        post: postId
      })
    }
  })

  const {
    posts,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    filters,
    setFilters
  } = usePostsList({
    id,
    inViewport
  })

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <Stack>
      {!hideCommunityNavigationLinks.some((link) =>
        pathName.includes(link)
      ) && <CommunityHeader filters={filters} onFiltersChange={setFilters} />}
      <ItemsWrapper
        loading={isLoading}
        className='flex flex-col gap-4'
        LoadingComponent={<PostLoading />}
        EmptyComponent={
          <EmptyWrapper
            description={t('shared.emptyDescription', {
              itemName: t('community.posts')
            })}
          />
        }
      >
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </ItemsWrapper>

      {isFetchingNextPage && <LoaderScreen />}

      {hasNextPage && (
        <button
          type='button'
          ref={ref}
          disabled={isFetchingNextPage}
          className='invisible opacity-0'
        >
          Load more
        </button>
      )}
    </Stack>
  )
}

export default PostsSection
