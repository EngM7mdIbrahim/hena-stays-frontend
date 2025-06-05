import React from 'react'
import { Amenity, RequestSellProperty, SubCategory } from '@commonTypes'
import { AMENITIES, navigationLinks } from '@constants'
import { isPopulated } from '@guards'
import { Box, Flex, Group, Stack, Text } from '@mantine/core'
import { CardIcon } from '@sections/Properties/Steps/PropertyFeaturesForm'
import { useTranslations } from 'next-intl'

import { cn } from '@utils'

function SellPropertyDescription({
  property
}: {
  property: RequestSellProperty | undefined
}) {
  const t = useTranslations()

  const propertyTradeMarks = [
    {
      label: t('shared.fields.subCategory'),
      value: isPopulated<SubCategory>(property?.subCategory)
        ? property?.subCategory?.name
        : '-',
      icon: navigationLinks.assets.propertyTrademarks.propertyType
    },
    {
      label: t('shared.fields.noOfBedrooms'),
      value: property?.bedroom,
      icon: navigationLinks.assets.propertyTrademarks.beds
    },
    {
      label: t('shared.fields.noOfLivingRooms'),
      value: property?.living,
      icon: navigationLinks.assets.propertyTrademarks.living
    },
    {
      label: t('shared.fields.noOfToilets'),
      value: property?.toilets,
      icon: navigationLinks.assets.propertyTrademarks.baths
    },
    {
      label: t('shared.fields.area'),
      value: property?.area?.builtIn ? `${property?.area?.builtIn}` : '-',
      icon: navigationLinks.assets.propertyTrademarks.size
    },
    {
      label: t('shared.fields.price'),
      value: `${property?.price?.currency} ${property?.price?.value?.toLocaleString()}`,
      icon: navigationLinks.assets.propertyTrademarks.coin
    }
  ]

  const getIcon = (label: string) => {
    return AMENITIES.find((amenity) => amenity.label === label)?.icon
  }

  return (
    <Stack className='py-6'>
      <Text className='font-bold'>{property?.title}</Text>
      <Stack>
        <Text className='text-lg font-semibold text-neutral-800'>
          {t('properties.propertyView.propertyTrademarks')}
        </Text>
        <Group>
          {propertyTradeMarks.map((trademark) => (
            <Flex
              className='gap-2 rounded-md border border-neutral-200 px-4 py-2'
              key={trademark.label}
            >
              <CardIcon src={trademark.icon} alt={trademark.label} />
              <Stack className='gap-[1px]'>
                <Text className='text-sm font-semibold text-neutral-700'>
                  {trademark.label}
                </Text>
                <Text className='font-semibold'>{trademark.value}</Text>
              </Stack>
            </Flex>
          ))}
        </Group>
      </Stack>

      <Stack>
        <Text className='text-lg font-semibold text-neutral-800'>
          {t('shared.fields.amenities')}
        </Text>
        <Box className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {property?.amenities?.basic?.map((amenity) => {
            if (!isPopulated<Amenity>(amenity)) {
              return null
            }
            return (
              <Box
                className={cn(
                  'flex flex-col items-center justify-center gap-2 rounded-md border border-neutral-200 bg-default-background p-8 text-center'
                )}
                key={amenity?._id}
              >
                <Box>
                  {getIcon(amenity?.name) && (
                    <CardIcon
                      alt={amenity?.name}
                      src={getIcon(amenity?.name) || ''}
                    />
                  )}
                </Box>
                <Text className='text-neutral-700'>{amenity?.name}</Text>
              </Box>
            )
          })}
        </Box>
        <Box className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {property?.amenities?.other?.map((amenity) => {
            return (
              <Stack
                className={cn(
                  'items-center justify-center rounded-md border border-neutral-200 bg-default-background p-3 text-center'
                )}
                key={amenity}
              >
                <Text className='text-neutral-700'>{amenity}</Text>
              </Stack>
            )
          })}
        </Box>
      </Stack>
      <Box className='font-semibold'>{property?.description}</Box>
    </Stack>
  )
}

export default SellPropertyDescription
