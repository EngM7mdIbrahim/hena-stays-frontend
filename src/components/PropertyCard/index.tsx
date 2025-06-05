'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { GetOnePropertyResponse, Interactions, User } from '@commonTypes'
import { navigationLinks } from '@constants'
import { Modules } from '@enums'
import { isPopulated } from '@guards'
import { useGetUserPermissions } from '@hooks'
import { Box, Card, Group, Skeleton, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import AgentCard from '@components/AgentCard'
import { Details } from '@components/Analytics/PropertyAdCard'
import PropertyPriceLocation from '@components/PropertyCard/PropertyPriceLocation'
import PropertyThumbnail from '@components/PropertyCard/PropertyThumbnail'
import PropertyFeatures from '@components/PropertyFeatures'
import AdditionalFeatures from '@components/PropertyFeatures/AdditionalFeatures'
import { cn } from '@utils'

export function PropertyCardSkeleton() {
  return (
    <Card withBorder shadow='sm' padding='lg' radius='md'>
      {/* Top Section */}
      <Skeleton height={200} mt='md' radius='md' width='100%' />
      {/* Description */}
      <Skeleton height={10} mt='md' radius='xl' width='90%' />
      <Skeleton height={10} mt={6} radius='xl' width='90%' />
      <Skeleton height={10} mt={6} radius='xl' width='80%' />
    </Card>
  )
}

// Define the layout types
export type LayoutType = 'vertical' | 'horizontal'

export interface PropertyCardProps {
  layout?: LayoutType
  property: GetOnePropertyResponse['property'] & {
    interaction?: Pick<
      Interactions,
      'leadClicks' | 'views' | 'saves' | 'visitors' | 'impressions'
    >
  }
  showAgent?: boolean
  showAdditionalFeatures?: boolean
  showDetails?: boolean
  className?: string
  onClick?: () => void
  topLeftComponent?: React.ReactNode
}

export default function PropertyCard({
  layout = 'vertical',
  className,
  topLeftComponent,
  property,
  showAgent = true,
  showAdditionalFeatures = true,
  showDetails = true,
  onClick
}: PropertyCardProps) {
  const router = useRouter()
  const t = useTranslations()
  const { permissions, user } = useGetUserPermissions(Modules.PROPERTIES)
  const { canSeeInteractions } = permissions

  const { chat, email, phone, whatsapp } =
    property?.interaction?.leadClicks || {}
  const leadsClicks =
    (chat || 0) + (email || 0) + (phone || 0) + (whatsapp || 0)

  const handlePropertyClick = () => {
    if (onClick) {
      onClick()
    } else {
      router.push(navigationLinks.properties.viewProperty(property?._id))
    }
  }

  return (
    <Box
      onClick={handlePropertyClick}
      className={cn(
        'overflow-hidden rounded-lg border border-neutral-500/70 p-2 shadow-md',
        layout === 'vertical' ? 'flex flex-col' : 'flex',
        className
      )}
    >
      {/* Image Section */}
      <PropertyThumbnail
        topLeftComponent={topLeftComponent}
        layout={layout}
        property={property}
      />

      {/* Content Section */}
      <Stack className='w-full flex-1'>
        <Box className='flex-grow p-4'>
          {/* Title and Price */}
          <PropertyPriceLocation property={property} />

          {/* Features */}
          <PropertyFeatures property={property} />

          {/* Additional Features */}
          {showAdditionalFeatures && <AdditionalFeatures property={property} />}
          {/* Details */}

          {canSeeInteractions(user, property) && showDetails && (
            <>
              <Text className='my-2 text-sm text-neutral-700'>
                {t('properties.details.title')}
              </Text>
              <Group className='justify-between'>
                <Details
                  title={t('properties.details.views')}
                  value={Number(property?.interaction?.views || 0)}
                />
                <Details
                  title={t('properties.details.saves')}
                  value={Number(property?.interaction?.saves || 0)}
                />
                <Details
                  title={t('properties.details.visitors')}
                  value={Number(property?.interaction?.visitors || 0)}
                />
                <Details
                  title={t('properties.details.leads')}
                  value={leadsClicks}
                />
                <Details
                  title={t('properties.details.impressions')}
                  value={Number(property?.interaction?.impressions || 0)}
                />
              </Group>
            </>
          )}
        </Box>

        {showAgent && (
          <Box className='px-4 py-2'>
            <AgentCard
              name={
                !isPopulated<User>(property?.createdBy)
                  ? ''
                  : property.createdBy.name
              }
              agentRole={
                !isPopulated<User>(property?.createdBy)
                  ? ''
                  : property.createdBy.role
              }
              avatar={
                !isPopulated<User>(property?.createdBy)
                  ? ''
                  : property.createdBy.image || ''
              }
              property={property}
              makeLead
            />
          </Box>
        )}
      </Stack>
    </Box>
  )
}
