'use client'

import { Box, Flex, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { FaCheck } from 'react-icons/fa'

import { PropertyFeaturesProps } from '.'

function AdditionalFeatures({ property }: PropertyFeaturesProps) {
  const t = useTranslations()
  return (
    <Box className='mt-8 min-h-[130px]'>
      <Text className='my-2 text-sm font-medium text-neutral-700'>
        {t('shared.features')}
      </Text>
      {(property?.amenities && (property?.amenities?.basic || []).length > 0) ||
      (property?.amenities?.other || []).length > 0 ? (
        <Flex className='flex-wrap gap-4 text-neutral-500'>
          {(property?.amenities && property?.amenities?.basic?.length > 0
            ? property.amenities.basic
            : property?.amenities?.other || []
          )
            .slice(0, 3)
            .map((feature) => {
              // Handle string feature
              if (typeof feature === 'string') {
                return (
                  <Stack
                    key={`feature-${feature}`}
                    className='items-start gap-1 text-sm'
                  >
                    <Text className='font-medium'>{feature}</Text>
                    <Flex className='items-center text-sm font-semibold'>
                      <FaCheck size={14} className='me-1 text-success-500' />
                      {t('shared.yes')}
                    </Flex>
                  </Stack>
                )
              }

              // Handle object feature
              return (
                <Stack key={feature?._id} className='items-start gap-1 text-sm'>
                  <Text className='font-medium'>{feature?.name}</Text>
                  <Flex className='items-center text-sm font-semibold'>
                    <FaCheck size={14} className='me-1 text-success-500' />
                    {t('shared.yes')}
                  </Flex>
                </Stack>
              )
            })}
        </Flex>
      ) : (
        <Text className='mt-4 text-center text-xl'>
          {t('shared.noAdditionalFeatures')}
        </Text>
      )}
    </Box>
  )
}

export default AdditionalFeatures
