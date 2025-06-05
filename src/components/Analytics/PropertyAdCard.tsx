'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Interactions, Property } from '@commonTypes'
import { navigationLinks } from '@constants'
import { Box, Flex, Group, Skeleton, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useTranslations } from 'next-intl'

import { LabelValueProps } from '@components/LabelValue'
import PropertyPriceLocation from '@components/PropertyCard/PropertyPriceLocation'
import PropertyThumbnail from '@components/PropertyCard/PropertyThumbnail'
import PropertyFeatures from '@components/PropertyFeatures'
import { cn } from '@utils'

export function Details({ title, value }: LabelValueProps) {
  return (
    <Box className={cn('flex flex-col gap-1')}>
      <Text className={cn('text-xs text-neutral-400')}>{title}</Text>
      <Flex className='gap-2'>
        <Text
          className={cn('text-sm font-semibold capitalize text-default-text')}
        >
          {value}
        </Text>
      </Flex>
    </Box>
  )
}

export function PropertyAdCardLoading() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <Box
      className={`overflow-hidden rounded-lg border p-2 shadow-md ${
        isMobile ? 'flex flex-col' : 'flex'
      }`}
    >
      <Skeleton height={150} width={isMobile ? '100%' : '50%'} />
      <Box className={`p-4 ${!isMobile ? 'w-1/2' : ''}`}>
        <Skeleton height={20} width='80%' mb='sm' />
        <Skeleton height={20} width='60%' mb='sm' />
        <Skeleton height={20} width='100%' mb='sm' />
        <Group>
          <Skeleton height={20} width='30%' />
          <Skeleton height={20} width='30%' />
          <Skeleton height={20} width='30%' />
        </Group>
      </Box>
    </Box>
  )
}
export interface PropertyAdCardProps {
  interactions: Omit<Interactions, 'property'>
  property: Property
}

function PropertyAdCard({ interactions, property }: PropertyAdCardProps) {
  const t = useTranslations()
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width: 768px)')

  const { chat, email, phone, whatsapp } = interactions?.leadClicks || {}
  const leadsClicks =
    (chat || 0) + (email || 0) + (phone || 0) + (whatsapp || 0)

  const handlePropertyClick = () => {
    router.push(navigationLinks.properties.viewProperty(property?._id))
  }

  return (
    <Box
      onClick={handlePropertyClick}
      className={`overflow-hidden rounded-lg border border-neutral-200 p-2 shadow-md ${
        isMobile ? 'flex flex-col' : 'flex'
      }`}
    >
      <PropertyThumbnail
        layout={isMobile ? 'vertical' : 'horizontal'}
        property={property}
      />

      {/* Content Section */}
      <Box className={`p-4 ${!isMobile ? 'w-1/2' : ''}`}>
        {/* Title and Price */}
        <PropertyPriceLocation
          titleClassName='text-default-text'
          property={property}
        />

        {/* Features */}
        <PropertyFeatures property={property} />

        {/* Details */}
        <>
          <Text className='my-2 text-sm text-neutral-700'>
            {t('properties.details.title')}
          </Text>
          <Group className='justify-between'>
            <Details
              title={t('properties.details.views')}
              value={Number(interactions?.views || 0)}
            />
            <Details
              title={t('properties.details.saves')}
              value={Number(interactions?.saves || 0)}
            />
            <Details
              title={t('properties.details.visitors')}
              value={Number(interactions?.visitors || 0)}
            />
            <Details
              title={t('properties.details.leads')}
              value={leadsClicks}
            />
            <Details
              title={t('properties.details.impressions')}
              value={Number(interactions?.impressions || 0)}
            />
          </Group>
        </>
      </Box>
    </Box>
  )
}

export default PropertyAdCard
