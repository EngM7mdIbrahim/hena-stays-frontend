'use client'

import React, { useMemo, useRef } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { User } from '@commonTypes'
import { navigationLinks, SEARCH_PARAM_KEYS } from '@constants'
import { PostTypes } from '@enums'
import { useGetBlogById, useLinkConstructor } from '@hooks'
import { Box, Card, Divider, Flex, Skeleton, Stack, Text } from '@mantine/core'
import DOMPurify from 'dompurify'
import moment from 'moment'

import 'moment/locale/ar'

import { useLocale, useTranslations } from 'next-intl'

import TableOfContent from '@components/AppEditor/TableOfContent'
import BreadcrumbWithHeader from '@components/BreadcrumbWithHeader'
import FullScreenError from '@components/FullScreenError'

export function LoadingBlogView() {
  return (
    <Card shadow='sm' padding='lg' radius='md'>
      {/* Banner Image */}
      <Skeleton height={250} mt='md' radius='md' />
      {/* Title */}
      <Skeleton height={20} mt='md' radius='xl' width='60%' />
      {/* Description */}
      <Skeleton height={15} mt='md' radius='xl' width='90%' />
      <Skeleton height={15} mt={6} radius='xl' width='80%' />
      <Skeleton height={15} mt={6} radius='xl' width='70%' />
    </Card>
  )
}

interface BlogViewSectionProps {
  params: {
    blogId: string
  }
}

function BlogViewSection({ params }: BlogViewSectionProps) {
  const { constructLink } = useLinkConstructor()
  const t = useTranslations()
  const locale = useLocale()
  const pathName = usePathname()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const { data, isLoading, isError, error } = useGetBlogById({
    id: params.blogId,
    showFields: {
      user: true
    }
  })

  const toc = useMemo(() => {
    try {
      return JSON.parse(data?.blog?.tableOfContents || '[]')
    } catch (tocError) {
      return []
    }
  }, [data?.blog?.tableOfContents])
  const sanitizedContent = DOMPurify.sanitize(data?.blog?.content || '')

  if (isLoading) return <LoadingBlogView />

  if (isError) {
    return <FullScreenError error={error} />
  }
  return (
    <Box className='p-8'>
      <BreadcrumbWithHeader
        title={data?.blog?.title}
        list={[
          {
            label: t('community.title'),
            link: navigationLinks.community.allPosts
          },
          {
            label: t('community.blogs'),
            link: constructLink(
              navigationLinks.community.profile(
                (data?.blog?.user as User)?._id
              ),
              {
                [SEARCH_PARAM_KEYS.TYPE_KEY]: PostTypes.Blog
              }
            )
          },
          { label: data?.blog?.title, link: pathName || '' }
        ]}
      />

      <Box className='relative mx-auto flex max-w-7xl gap-6 p-6'>
        <Stack className='flex-[4] gap-6'>
          {/* Header */}

          <Text
            component='h1'
            className='mb-4 text-3xl font-bold text-neutral-800'
          >
            {data?.blog?.title}
          </Text>

          {/* Image */}
          <Box className='relative self-center'>
            <Image
              width={400}
              height={400}
              src={data?.blog?.media?.[0]?.url || ''}
              alt={data?.blog?.title || ''}
              className='h-auto max-h-[400px] min-h-52 rounded-md object-cover brightness-75'
            />
          </Box>
          {/* Table of contents for mobile */}
          <TableOfContent
            className='block w-full md:hidden'
            scrollContainerRef={scrollContainerRef}
            items={toc}
          />
          {/* Content */}
          <div
            ref={scrollContainerRef}
            className='prose mt-8 max-w-full dark:prose-invert'
          >
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </div>
          <Flex className='gap-2 font-semibold capitalize text-neutral-500'>
            <Text>
              {t('shared.by')} {(data?.blog?.user as User)?.name}
            </Text>
            <Divider orientation='vertical' />
            <Text>
              {' '}
              {moment(data?.blog?.createdAt)
                .locale(locale)
                .format(
                  locale.startsWith('ar') ? 'D MMMM YYYY' : 'MMMM D, YYYY'
                )}
            </Text>
          </Flex>
        </Stack>
        <TableOfContent
          className='bottom-0 top-32 hidden h-96 md:block'
          scrollContainerRef={scrollContainerRef}
          items={toc}
          style={{
            position: 'sticky'
          }}
        />
      </Box>
    </Box>
  )
}

export default BlogViewSection
