import React from 'react'
import Image from 'next/image'
import { Flex, Stack, Text } from '@mantine/core'
import moment from 'moment'

import 'moment/locale/ar'

import { useLocale } from 'next-intl'

import { NewsCardProps } from '@components/NewsCard'

export interface NewsHomeCardProps extends NewsCardProps {
  onClick: () => void
}

function NewsHomeCard({ article, onClick }: NewsHomeCardProps) {
  const locale = useLocale()
  return (
    <Flex
      onClick={onClick}
      className='cursor-pointer flex-col gap-4 md:flex-row md:items-center'
    >
      <Image src={article.image} alt={article.title} width={300} height={300} />
      <Stack className='gap-2 lg:w-[60%]'>
        <Text className='text-sm font-semibold text-neutral-600'>
          {article.author} -{' '}
          {moment(article.createdAt)
            .locale(locale)
            .format(locale.startsWith('ar') ? 'D MMMM YYYY' : 'MMM D, YYYY')}
        </Text>
        <Text className='font-semibold text-neutral-800'>{article.title}</Text>
        <Text className='line-clamp-3 text-sm text-neutral-500'>
          {article.subtitle}
        </Text>
      </Stack>
    </Flex>
  )
}

export default NewsHomeCard
