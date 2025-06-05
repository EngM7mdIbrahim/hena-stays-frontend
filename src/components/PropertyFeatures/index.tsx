'use client'

import Image from 'next/image'
import { Property } from '@commonTypes'
import { navigationLinks } from '@constants'
import { isDark } from '@guards'
import { Flex, Text, useMantineColorScheme } from '@mantine/core'
import { useTranslations } from 'next-intl'

export interface PropertyFeaturesProps {
  property: Property
}

function PropertyFeatures({ property }: PropertyFeaturesProps) {
  const t = useTranslations()
  const { colorScheme } = useMantineColorScheme()
  return (
    <Flex className='flex-wrap items-center justify-between gap-2 font-semibold text-neutral-800'>
      <Flex className='items-center gap-2'>
        <Image
          src={
            isDark(colorScheme)
              ? navigationLinks.assets.bedDark
              : navigationLinks.assets.bed
          }
          width={20}
          height={20}
          alt='bed'
        />

        <Text className='text-sm'>
          {property?.bedroom}{' '}
          {property?.bedroom && property?.bedroom > 1
            ? t('shared.beds')
            : t('shared.bed')}
        </Text>
      </Flex>
      <Flex className='items-center gap-2'>
        <Image
          src={
            isDark(colorScheme)
              ? navigationLinks.assets.bathDark
              : navigationLinks.assets.bath
          }
          width={20}
          height={20}
          alt='bath'
        />

        <Text className='text-sm'>
          {property?.toilets}{' '}
          {property?.toilets && property?.toilets > 1
            ? t('shared.baths')
            : t('shared.bath')}
        </Text>
      </Flex>
      <Flex className='items-center gap-2'>
        <Image
          src={
            isDark(colorScheme)
              ? navigationLinks.assets.livingDark
              : navigationLinks.assets.living
          }
          width={20}
          height={20}
          alt='living'
        />

        <Text className='text-sm'>
          {property?.living}{' '}
          {property?.living && property?.living > 1
            ? t('shared.livingRooms')
            : t('shared.living')}
        </Text>
      </Flex>
    </Flex>
  )
}

export default PropertyFeatures
