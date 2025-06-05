'use client'

import React from 'react'
import { useNewsList } from '@hooks'
import { Box, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import CustomPagination from '@components/AppPagination'
import EmptyWrapper from '@components/EmptyWrapper'
import FullScreenError from '@components/FullScreenError'
import ItemsWrapper from '@components/ItemWrapper'
import NewsCard, { NewsCardSkeleton } from '@components/NewsCard'

function NewsSection() {
  const t = useTranslations()
  const { news, data, isLoading, isError, error, filters, setFilters } =
    useNewsList()

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <Stack gap='md'>
      <Stack>
        <Text
          component='h1'
          className='text-2xl font-bold text-primary md:text-4xl'
        >
          {t('news.title')}
        </Text>
        <Text
          component='p'
          className='text-sm font-semibold capitalize text-neutral-600'
        >
          {data?.total === 1
            ? `${data?.total.toLocaleString('en-US') || ''} ${t('news.article')}`
            : `${data?.total.toLocaleString('en-US') || ''} ${t('news.articles')}`}
        </Text>
      </Stack>

      <ItemsWrapper
        loading={isLoading}
        className='grid grid-cols-1 place-items-center gap-4 md:grid-cols-2'
        LoadingComponent={<NewsCardSkeleton />}
        EmptyComponent={
          <EmptyWrapper
            description={t('shared.emptyDescription', {
              itemName: t('news.title')
            })}
          />
        }
      >
        {news.map((article) => (
          <NewsCard key={article._id} article={article} />
        ))}
      </ItemsWrapper>
      <Box className='mt-8 flex items-center justify-center py-4'>
        <CustomPagination
          value={data?.page || (filters.page ? Number(filters.page) : 1)}
          onChange={(value) => setFilters({ ...filters, page: String(value) })}
          total={data?.totalPages ?? 0}
        />
      </Box>
    </Stack>
  )
}

export default NewsSection
