'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { SEARCH_PARAM_KEYS } from '@constants'
import { PostTypes } from '@enums'
import { isPostType } from '@guards'
import { useCommunityUsersList } from '@hooks'
import { Box, Flex, Stack } from '@mantine/core'

import FullScreenError from '@components/FullScreenError'

import BlogsSection from './BlogsSection'
import MemberSuggestions from './MemberSuggestions/MemberSuggestions'
import PostsSection from './PostsSection'

function CommunitySection() {
  const {
    users: featuredMembers,
    isLoading,
    isError,
    error
  } = useCommunityUsersList()
  const searchParams = useSearchParams()
  const postTypeString = searchParams?.get(SEARCH_PARAM_KEYS.TYPE_KEY)
  const postsType = isPostType(postTypeString)
    ? postTypeString
    : PostTypes.Media

  return (
    <Box className='min-h-screen' px={48} py={20}>
      <Flex className='relative' mt={40} justify='space-between' gap={20}>
        <Stack className='md:flex-1'>
          {PostTypes.Media === postsType ? <PostsSection /> : <BlogsSection />}
        </Stack>
        {isError && error ? (
          <FullScreenError error={error} />
        ) : (
          <MemberSuggestions
            loading={isLoading}
            featuredMembers={featuredMembers?.slice(0, 5) || []}
            peopleYouMayKnow={featuredMembers?.slice(5, 10) || []}
          />
        )}
      </Flex>
    </Box>
  )
}

export default CommunitySection
