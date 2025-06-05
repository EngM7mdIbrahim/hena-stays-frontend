'use client'

import React from 'react'
import Link from 'next/link'
import { navigationLinks } from '@constants'
import { Modules } from '@enums'
import { useGetUserPermissions } from '@hooks'
import { Button, Group, Stack, Text } from '@mantine/core'
import { useElementSize, useInViewport } from '@mantine/hooks'
import { BlogLoading } from '@sections/Community/BlogsSection'
import OfficialBlogCard from '@sections/OfficialBlog/OfficialBlogsSection/OfficialBlogCard'
import { useTranslations } from 'next-intl'
import { BiPlus } from 'react-icons/bi'

import { useOfficialBlogsList } from '@hooks/lists/useOfficialBlogsList'
import SearchField from '@components/CustomFields/SearchField'
import EmptyWrapper from '@components/EmptyWrapper'
import FullScreenError from '@components/FullScreenError'
import ItemsWrapper from '@components/ItemWrapper'
import LoaderScreen from '@components/LoaderScreen'
import { cn } from '@utils'

function OfficialBlogsSection() {
  const t = useTranslations()
  const { ref, inViewport } = useInViewport()
  const { ref: sizeRef, width } = useElementSize()

  const { permissions } = useGetUserPermissions(Modules.OFFICIAL_BLOGS)
  const { canAddOfficialBlog } = permissions

  const {
    blogs,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    filters,
    setFilters
  } = useOfficialBlogsList({
    inViewport
  })

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <Stack ref={sizeRef} className='gap-6 px-4 md:px-12'>
      <Group className='mt-4 w-full items-baseline justify-between'>
        <Stack>
          <Text
            component='h1'
            className='text-2xl font-bold text-neutral-700 md:text-4xl'
          >
            {t('officialBlogs.title')}
          </Text>
          <Text
            component='p'
            className='text-sm font-semibold capitalize text-neutral-600'
          >
            {blogs.length.toLocaleString('en-US')} {t('officialBlogs.subtitle')}
          </Text>
        </Stack>

        {canAddOfficialBlog && (
          <Button
            component={Link}
            href={navigationLinks.admin.officialBlogs.addOfficialBlog}
            variant='light'
            color='gray'
            className='rounded-lg font-semibold text-primary'
            size='lg'
            leftSection={<BiPlus size={24} />}
          >
            {t('officialBlogs.buttons.addBlog')}
          </Button>
        )}
      </Group>
      <SearchField
        classNames={{
          input: cn(
            'py-0 w-full border bg-default-background border-neutral-200'
          )
        }}
        size='lg'
        className='bg-transparent outline-none'
        placeholder={t('officialBlogs.fields.search')}
        radius='md'
        value={filters.text}
        onChange={(e) => setFilters({ ...filters, text: e.target.value })}
      />
      <ItemsWrapper
        loading={isLoading}
        className='my-4 flex flex-col gap-4'
        LoadingComponent={<BlogLoading />}
        EmptyComponent={
          <EmptyWrapper
            description={t('shared.emptyDescription', {
              itemName: t('officialBlogs.subtitle')
            })}
          />
        }
      >
        {blogs.map((officialBlog) => (
          <OfficialBlogCard
            width={width}
            key={officialBlog._id}
            officialBlog={officialBlog}
          />
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

export default OfficialBlogsSection
