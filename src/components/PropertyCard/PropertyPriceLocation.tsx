import Image from 'next/image'
import { Property } from '@commonTypes'
import { navigationLinks } from '@constants'
import { Box, Flex, Text } from '@mantine/core'

import { cn, formatNumberToShortForm } from '@utils'

export interface PropertyPriceLocationProps {
  property: Property
  titleClassName?: string
}

export default function PriceLocation({
  property,
  titleClassName
}: PropertyPriceLocationProps) {
  return (
    <Box>
      <Flex className='mb-3 flex-wrap items-center justify-between gap-2'>
        <Text
          className={cn(
            'line-clamp-1 text-lg font-semibold text-neutral-700',
            titleClassName
          )}
        >
          {property?.title}
        </Text>
        <Text className='text-xl font-semibold text-primary'>
          {property?.price?.currency}{' '}
          {formatNumberToShortForm(property?.price?.value)}
        </Text>
      </Flex>

      {/* Location */}
      <Flex className='mb-4 items-center gap-1 text-sm text-neutral-700'>
        <Image
          src={navigationLinks.assets.location}
          width={15}
          height={15}
          alt='location'
          className='flex-shrink-0 dark:brightness-200'
        />
        <Text className='line-clamp-1 text-sm'>
          {property?.location?.address
            ? property?.location?.address
            : 'Not Available'}
        </Text>
      </Flex>
    </Box>
  )
}
