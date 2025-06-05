'use client'

import React, { useMemo } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { GetOnePropertyResponse, MediaTypes, Property } from '@commonTypes'
import { navigationLinks } from '@constants'
import { isPopulated } from '@guards'
import { Box, Text } from '@mantine/core'

import { cn } from '@utils'

// Define the layout types

export interface PropertyCardProps {
  property: GetOnePropertyResponse['property']
  className?: string
}

export default function PropertyCard({
  property,
  className
}: PropertyCardProps) {
  const router = useRouter()
  const previewImage = useMemo(() => {
    return property?.media?.find((media) => media.type === MediaTypes.Image)
      ?.url
  }, [property?.media])

  if (!isPopulated<Property>(property)) {
    return null
  }
  const handlePropertyClick = () => {
    router.push(navigationLinks.properties.viewProperty(property?._id))
  }

  return (
    <Box
      onClick={handlePropertyClick}
      className={cn(
        'flex items-center gap-2 overflow-hidden rounded-lg border p-2 shadow-md transition-all hover:cursor-pointer hover:bg-gray-50',
        className
      )}
    >
      {/* Image Section */}
      {previewImage && (
        <Box className='relative h-full w-1/4 overflow-hidden rounded-md'>
          <Image
            src={previewImage}
            alt={property?.title}
            fill
            className='object-cover'
          />
        </Box>
      )}

      {/* Content Section */}
      <Box className='min-w-[75%]'>
        {/* Title and Price */}
        <Text className='line-clamp-1 text-ellipsis text-sm font-bold text-secondary'>
          {property?.title}
        </Text>
        <Text className='text-sm text-primary'>
          {property?.price?.currency}{' '}
          {property?.price?.value?.toLocaleString('en-US')}
        </Text>
      </Box>
    </Box>
  )
}
