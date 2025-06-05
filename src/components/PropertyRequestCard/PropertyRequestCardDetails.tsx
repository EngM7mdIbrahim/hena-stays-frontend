'use client'

import { useMemo } from 'react'
import { Amenity, Category, RequestBuyProperty } from '@commonTypes'
import { isPopulated } from '@guards'
import { Flex, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import LabelValue from '@components/LabelValue'
import { capitalizeFirstLetter } from '@utils'

const labelValueClassNames = {
  wrapperClassName: 'items-start',
  labelClassName: 'text-lg font-normal text-dimmed text-neutral-500',
  textClassName: 'text-lg font-medium text-default-text'
}

export default function PropertyRequestCardDetails({
  furnished,
  category,
  age,
  area,
  amenities
}: RequestBuyProperty) {
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
    <Stack gap='sm'>
      <Text className='text-lg font-medium text-neutral-700'>
        {t('properties.details.title')}
      </Text>
      <Flex justify='space-between' align='center'>
        {isPopulated<Category>(category) && (
          <LabelValue
            title={t('shared.fields.propertyCategory.label')}
            direction='column'
            value={category.name}
            {...labelValueClassNames}
          />
        )}
        <LabelValue
          title={t('shared.age')}
          direction='column'
          value={age?.from && age?.to ? `${age.from} - ${age.to}` : '-'}
          {...labelValueClassNames}
        />
        <LabelValue
          title={t('shared.fields.area')}
          direction='column'
          value={area?.from && area?.to ? `${area.from} - ${area.to}` : '-'}
          {...labelValueClassNames}
        />
      </Flex>
      {furnished && (
        <LabelValue
          title={t('shared.fields.furnishing.label')}
          direction='column'
          value={furnished.join(', ')}
          {...labelValueClassNames}
        />
      )}
      {computedAmenities && (
        <LabelValue
          title={t('shared.features')}
          direction='column'
          value={computedAmenities}
          showCheck
          {...labelValueClassNames}
          labelClassName='text-lg font-medium text-neutral-700'
          textClassName='text-lg font-light text-default-text'
        />
      )}
    </Stack>
  )
}
