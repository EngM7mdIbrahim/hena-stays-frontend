'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { hideCommunityNavigationLinks } from '@constants'
import { useBlogsList } from '@hooks'
import { Box, Card, Group, Skeleton } from '@mantine/core'
import { useElementSize, useInViewport } from '@mantine/hooks'
import BlogCard from '@sections/Community/BlogsSection/BlogCard'
import { PostsSectionProps } from '@sections/Community/PostsSection'
import { useTranslations } from 'next-intl'

import EmptyWrapper from '@components/EmptyWrapper'
import FullScreenError from '@components/FullScreenError'
import ItemsWrapper from '@components/ItemWrapper'
import LoaderScreen from '@components/LoaderScreen'

import CommunityHeader from '../CommunityHeader'

export function BlogLoading() {
  return (
    <Card p={0} pr={10} radius='md' shadow='sm' className='my-4'>
      <Group>
        <Skeleton width={200} height={200} />

        <Box className='flex-1'>
          <Skeleton height={10} mt='md' radius='xl' width='90%' />
          <Skeleton height={10} mt={6} radius='xl' width='80%' />
          <Skeleton height={10} mt={6} radius='xl' width='70%' />
        </Box>

        <Group className='self-start p-10 pt-12'>
          <Skeleton width={20} height={20} mt='xs' />
          <Skeleton width={20} height={20} mt='xs' />
        </Group>
      </Group>
    </Card>
  )
}

function BlogsSection({ id }: PostsSectionProps) {
  const pathName = usePathname()
  const { ref, inViewport } = useInViewport()
  const t = useTranslations()
  const { ref: sizeRef, width } = useElementSize()

  const {
    blogs,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    filters,
    setFilters
  } = useBlogsList({
    id,
    inViewport
  })

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <div ref={sizeRef}>
      {!hideCommunityNavigationLinks.some((link) =>
        pathName.includes(link)
      ) && <CommunityHeader filters={filters} onFiltersChange={setFilters} />}

      <ItemsWrapper
        loading={isLoading}
        className='flex flex-col gap-4'
        LoadingComponent={<BlogLoading />}
        EmptyComponent={
          <EmptyWrapper
            description={t('shared.emptyDescription', {
              itemName: t('community.blogs')
            })}
          />
        }
      >
        {blogs.map((blog) => (
          <BlogCard width={width} key={blog._id} blog={blog} />
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
    </div>
  )
}

export default BlogsSection
