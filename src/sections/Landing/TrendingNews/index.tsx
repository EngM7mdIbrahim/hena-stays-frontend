import React from 'react'
import { useRouter } from 'next/navigation'
import { navigationLinks } from '@constants'
import { useNewsList } from '@hooks'
import { BackgroundImage, Box, Flex, Stack, Text } from '@mantine/core'
import moment from 'moment'
import 'moment/locale/ar'
import { useTranslations } from 'next-intl'

import FullScreenError from '@components/FullScreenError'
import HeaderSection from '@components/HeaderSection'
import NewsHomeCard from '@components/NewsHomeCard'
import { useLocale } from 'next-intl'
function TrendingNews() {
  const router = useRouter()
  const t = useTranslations()
  const locale = useLocale()
  const { news, isLoading, isError, error } = useNewsList('4')

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  if (isLoading) {
    return null
  }
  return (
    <Flex className='flex-col justify-between gap-4 px-4 py-10 font-lexend md:px-8 lg:flex-row lg:px-12'>
      <Stack className='gap-6 lg:w-[50%]'>
        <HeaderSection title={t('homePage.trendingNews.title')} />
        {news
          ?.slice(0, 3)
          .map((article) => (
            <NewsHomeCard
              onClick={() =>
                router.push(navigationLinks.news.viewNews(article._id))
              }
              key={article._id}
              article={article}
            />
          ))}
      </Stack>
      <BackgroundImage
        onClick={() =>
          router.push(navigationLinks.news.viewNews(news[news.length - 1]?._id))
        }
        className='relative hidden h-[500px] cursor-pointer md:block lg:h-auto lg:flex-1'
        src={news[news.length - 1]?.image}
      >
        <Box className='absolute inset-0 bg-black bg-opacity-50' />
        <Box className='absolute left-0 right-0 top-0 p-4'>
          <Text className='w-fit rounded-lg border px-4 py-2 text-white'>
            {news[news.length - 1]?.title}
          </Text>
        </Box>
        <Stack className='absolute bottom-0 left-4 gap-1 p-4'>
          <Text className='text-white'>
            {news[news.length - 1]?.author} -{' '}
            {news[news.length - 1]?.createdAt
              ? moment(news[news.length - 1].createdAt).locale(locale).format(locale.startsWith('ar') ? 'D MMMM YYYY' : 'MMM D, YYYY')
              : ''}
          </Text>
          <Text className='line-clamp-1 text-4xl uppercase leading-snug text-white'>
            {news[news.length - 1]?.subtitle}
          </Text>
        </Stack>
      </BackgroundImage>
    </Flex>
  )
}

export default TrendingNews
