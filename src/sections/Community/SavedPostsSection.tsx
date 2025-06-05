'use client'

import React from 'react'
import { useSavedPostsList } from '@hooks'
import { Stack, Text } from '@mantine/core'
import { useInViewport } from '@mantine/hooks'
import Post from '@sections/Community/Post/Post'
import { useTranslations } from 'next-intl'

import EmptyWrapper from '@components/EmptyWrapper'
import FullScreenError from '@components/FullScreenError'
import ItemsWrapper from '@components/ItemWrapper'
import LoaderScreen from '@components/LoaderScreen'

import { PostLoading } from './PostsSection'

function SavedPostsSection() {
  const t = useTranslations()
  const { ref, inViewport } = useInViewport()

  const { posts, isLoading, isError, error, isFetchingNextPage, hasNextPage } =
    useSavedPostsList({
      inViewport
    })

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <Stack>
      <Text component='h2' className='text-2xl font-semibold text-neutral-700'>
        {t('community.savedPosts')}
      </Text>

      <ItemsWrapper
        loading={isLoading}
        className='flex flex-col gap-4'
        LoadingComponent={<PostLoading />}
        EmptyComponent={
          <EmptyWrapper
            description={t('shared.emptyDescription', {
              itemName: t('community.savedPosts')
            })}
          />
        }
      >
        {posts.map((post) => (
          <Post key={post._id} post={{ ...post, isSavedByMe: true }} />
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

export default SavedPostsSection
