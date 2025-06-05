'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { News } from '@commonTypes'
import { navigationLinks } from '@constants'
import { Button, Card, Flex, Group, Skeleton, Stack, Text } from '@mantine/core'
import { useLocale, useTranslations } from 'next-intl'
import { IoIosArrowForward } from 'react-icons/io'

export function NewsCardSkeleton() {
  return (
    <Card
      shadow='sm'
      padding='lg'
      radius='md'
      w={{ base: 288, md: 338, lg: 438 }}
    >
      <Card.Section>
        <Skeleton height={240} />
      </Card.Section>

      <Skeleton height={24} mt='md' />
      <Skeleton height={20} mt='sm' />
      <Skeleton height={20} mt='xs' />

      <Skeleton
        height={16}
        mt='md'
        style={{ borderBottom: '1px solid #dee2e6', paddingBottom: 16 }}
      />

      <Group mt='md' justify='space-between'>
        <Skeleton height={36} width={120} />
        <Skeleton height={36} width={36} radius='xl' />
      </Group>
    </Card>
  )
}

export interface NewsCardProps {
  article: News
}

function NewsCard({ article }: NewsCardProps) {
  const locale = useLocale()
  const router = useRouter()
  const t = useTranslations()
  return (
    <Stack className='w-[288px] gap-[18px] rounded-md bg-default-background pb-4 md:w-[338px] lg:w-[438px]'>
      <Image
        src={article.image}
        width={438}
        height={282}
        className='h-[240px] w-full cursor-pointer'
        alt='img'
        objectFit='contain'
        onClick={() => router.push(navigationLinks.news.viewNews(article._id))}
      />

      <Stack className='rounded-md bg-default-background px-3'>
        <Text
          component='h3'
          onClick={() =>
            router.push(navigationLinks.news.viewNews(article._id))
          }
          className='line-clamp-1 cursor-pointer overflow-hidden text-lg font-semibold'
        >
          {article.title}
        </Text>
        <Text className='line-clamp-2 overflow-hidden text-neutral-500'>
          {article.subtitle}
        </Text>
        <Flex className='w-full justify-end border-t pt-3'>
          <Button
            rightSection={
              <IoIosArrowForward
                className={`${locale?.startsWith('ar') ? 'rotate-180' : ''}`}
              />
            }
            onClick={() =>
              router?.push(navigationLinks.news.viewNews(article._id))
            }
            className='cursor-pointer gap-[10px] rounded-lg bg-primary px-[15px] py-[10px] text-white md:h-[50px]'
          >
            {t('news.readMore')}
          </Button>
        </Flex>
      </Stack>
    </Stack>
  )
}

export default NewsCard
