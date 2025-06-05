'use client'

import { useMemo } from 'react'
import { Amenity, RequestSellProperty } from '@commonTypes'
import { isPopulated } from '@guards'
import { Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import LabelValue from '@components/LabelValue'
import { capitalizeFirstLetter } from '@utils'

const labelValueClassNames = {
  wrapperClassName: 'items-start',
  labelClassName: 'text-lg font-medium text-secondary',
  textClassName: 'text-lg font-light text-default-text'
}

export default function PropertySellRequestCardDetails({
  amenities
}: RequestSellProperty) {
  const t = useTranslations()
  const computedAmenities = useMemo(() => {
    const basicAmenities =
      amenities?.basic
        .filter((amenity) => isPopulated<Amenity>(amenity))
        .map((amenity) => capitalizeFirstLetter(amenity.name)) ?? []
    const advancedAmenities =
      amenities?.other
        .filter((amenity) => isPopulated<Amenity>(amenity))
        .map((amenity) => capitalizeFirstLetter(amenity.name)) ?? []
    return [...basicAmenities, ...advancedAmenities].join(', ')
  }, [amenities])

  return (
    <Stack gap='xs'>
      <Text className='font-medium text-neutral-700'>
        {t('shared.features')}
      </Text>

      {computedAmenities && (
        <LabelValue
          title=''
          direction='column'
          showCheck
          value={computedAmenities}
          {...labelValueClassNames}
        />
      )}
    </Stack>
  )
}
