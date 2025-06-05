import React from 'react'
import { useRouter } from 'next/navigation'
import { GetAllXmlPropertiesResponse, User } from '@commonTypes'
import { navigationLinks } from '@constants'
import { isPopulated } from '@guards'
import { Avatar, Box, Card, Group, Skeleton, Text } from '@mantine/core'
import moment from 'moment'

import 'moment/locale/ar'

import { useLocale, useTranslations } from 'next-intl'

export function XmlCardSkeleton() {
  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder className='space-y-4'>
      <Group>
        <Skeleton height={40} circle />
        <Box>
          <Skeleton height={16} width={100} />
        </Box>
      </Group>

      <Box size='sm' className='text-neutral-500'>
        <Skeleton height={16} width={16} />
      </Box>

      <Skeleton height={16} width={150} className='text-neutral-500' />
      <Skeleton height={16} width={200} className='text-neutral-500' />
    </Card>
  )
}

export interface XmlCardProps {
  data: GetAllXmlPropertiesResponse['items'][number]
}

function XmlCard({ data }: XmlCardProps) {
  const router = useRouter()
  const t = useTranslations()
  const locale = useLocale()

  const getPlatform = () => {
    const host = new URL(data?.url).hostname
    if (host.includes('propertyfinder')) return 'Property Finder'
    if (host.includes('bayut')) return 'Bayut'
    return 'Unknown'
  }

  return (
    <Card
      onClick={() =>
        router.push(navigationLinks.admin.properties.viewXmlRequest(data._id))
      }
      className='cursor-pointer space-y-4 border border-neutral-200 bg-default-background transition-transform duration-200 hover:scale-105'
      shadow='sm'
      padding='lg'
      radius='md'
    >
      {isPopulated<User>(data.creator) ? (
        <Group>
          <Avatar
            src={data.creator?.image}
            name={data.creator?.name}
            radius='xl'
          />
          <Box>
            <Text fw={500} className='text-sm capitalize md:text-base'>
              {data.creator?.name}
            </Text>
          </Box>
        </Group>
      ) : null}

      <Box size='sm' className='text-neutral-500'>
        {t('xml.xmlRequests.mainCard.url')}:{' '}
        <a
          href={data.url}
          target='_blank'
          className='text-primary underline hover:no-underline'
        >
          {t('xml.xmlRequests.mainCard.linkToXml')}
        </a>
      </Box>

      <Text size='sm' className='text-neutral-500'>
        {t('xml.xmlRequests.mainCard.platform')}: {getPlatform()}
      </Text>

      <Text size='sm' className='text-neutral-500'>
        {t('xml.xmlRequests.createdAt')}:{' '}
        {moment(data.createdAt)
          .locale(locale)
          .format(
            locale.startsWith('ar')
              ? 'DD MMMM YYYY, h:mm A'
              : 'MMM Do YYYY, h:mm A'
          )}
      </Text>
    </Card>
  )
}

export default XmlCard
