import React from 'react'
import { Property } from '@commonTypes'
import { Divider, Group, Stack } from '@mantine/core'
import moment from 'moment'
import { useTranslations } from 'next-intl'

import LabelValue from '@components/LabelValue'

function PropertyRegInformation({
  property
}: {
  property: Property | undefined
}) {
  const t = useTranslations()
  return (
    <Stack>
      <Group className='gap-4 md:gap-20'>
        <LabelValue
          title={t('shared.fields.furnishing.label')}
          value={property?.furnished || ''}
          wrapperClassName='gap-2 items-start'
          direction='column'
        />
        <LabelValue
          title={t('properties.propertyView.addedOn')}
          value={
            property?.createdAt
              ? moment(property?.createdAt).format('DD/MM/YYYY')
              : ''
          }
          wrapperClassName='gap-2 items-start'
          direction='column'
        />
        <LabelValue
          title={t('shared.fields.completion.label')}
          value={property?.completion || ''}
          wrapperClassName='gap-2 items-start'
          direction='column'
        />
      </Group>
      <Divider />
      <Group className='gap-4 md:gap-20'>
        <LabelValue
          title={t('properties.propertyView.builtInArea')}
          value={property?.area?.builtIn || '-'}
          wrapperClassName='gap-2 items-start'
          direction='column'
        />

        <LabelValue
          title={t('properties.propertyView.plotArea')}
          value={property?.area?.plot || '-'}
          wrapperClassName='gap-2 items-start'
          direction='column'
        />
      </Group>
      <Divider />
      <Group className='gap-4 md:gap-20'>
        <LabelValue
          title={t('properties.propertyView.brn')}
          value={property?.permit?.BRN || ''}
          wrapperClassName='gap-2 items-start'
          direction='column'
        />

        <LabelValue
          title={t('properties.propertyView.reference')}
          value={property?.permit?.RERA || '-'}
          wrapperClassName='gap-2 items-start'
          direction='column'
        />
      </Group>
    </Stack>
  )
}

export default PropertyRegInformation
