'use client'

import React from 'react'
import { useGetNewsById } from '@hooks'
import { Anchor, Box, Group, Image, Skeleton, Stack, Text } from '@mantine/core'
import DOMPurify from 'dompurify'
import moment from 'moment'

import 'moment/locale/ar'

import { useLocale, useTranslations } from 'next-intl'

import FullScreenError from '@components/FullScreenError'

export function NewsViewSkeleton() {
  return (
    <Stack className='w-full items-center gap-5'>
      <Box className='relative w-full'>
        {/* Image Skeleton */}
        <Skeleton className='h-[500px] w-full' />

        {/* Overlay Skeleton */}
        <Box className='absolute inset-0 flex flex-col items-start justify-end gap-1 md:gap-3 md:px-6 md:py-8'>
          {/* Title Skeleton */}
          <Skeleton className='mx-auto h-12 w-3/4 max-w-3xl p-4 md:h-20' />
        </Box>
      </Box>

      <Group
        justify='space-between'
        className='mx-auto w-[50%]'
        align='center'
        gap='sm'
        py='md'
      >
        <Box>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='mt-2 h-4 w-24' />
        </Box>
        <Skeleton className='h-6 w-24' />
      </Group>

      <Skeleton className='mx-auto h-[500px] w-[50%]' />
    </Stack>
  )
}

export interface NewsViewSectionProps {
  id: string
}

function NewsViewSection({ id }: NewsViewSectionProps) {
  const { data, isError, error, isLoading } = useGetNewsById({ id })
  const t = useTranslations()
  const news = data?.news
  const sanitizedContent = DOMPurify.sanitize(news?.content || '')
  const locale = useLocale()

  if (isError) return <FullScreenError error={error} />

  if (isLoading) return <NewsViewSkeleton />

  return (
    <Stack className='w-full items-center gap-5 py-10'>
      <Box className='relative w-full'>
        {/* Image */}
        <Image
          width={400}
          height={400}
          src={news?.image}
          alt={news?.title}
          className='h-[500px] w-full object-cover brightness-75'
        />

        {/* Overlay */}
        <Box className='absolute inset-0 flex flex-col items-start justify-end gap-1 text-white md:gap-3 md:px-6 md:py-8'>
          {/* Title */}
          <Text
            component='h1'
            className='mx-auto max-w-3xl p-4 text-center text-2xl font-bold md:text-5xl'
          >
            {news?.title}
          </Text>
        </Box>
      </Box>

      <Group
        justify='space-between'
        className='mx-auto w-[50%] px-2'
        align='center'
        gap='sm'
        py='md'
      >
        <Box>
          <Text ta='center' className='font-semibold'>
            {news?.author}
          </Text>
          <Anchor
            href={news?.reference}
            target='_blank'
            size='xs'
            underline='not-hover'
          >
            {t('news.linkToTheResource')}
          </Anchor>
        </Box>
        <Text>
          {moment(news?.createdAt)
            .locale(locale)
            .format(locale?.startsWith('ar') ? 'D MMM, YYYY' : 'MMM D, YYYY')}
        </Text>
      </Group>

      <Box component='article' className='mx-auto w-[50%] px-2'>
        <div className='text-base leading-relaxed text-neutral-500'>
          {news?.subtitle}
        </div>
        <div
          className='prose mt-4 text-base leading-relaxed dark:prose-invert'
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </Box>
    </Stack>
  )
}

export default NewsViewSection
