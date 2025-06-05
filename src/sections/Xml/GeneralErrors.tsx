import React from 'react'
import { AddPropertyXMLResponse } from '@commonTypes'
import { Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import EmptyWrapper from '@components/EmptyWrapper'
import ItemsWrapper from '@components/ItemWrapper'

export interface GeneralErrorsProps {
  generalErrors?: AddPropertyXMLResponse['generalErrors']
}

function GeneralErrors({ generalErrors }: GeneralErrorsProps) {
  const t = useTranslations()

  return (
    <Stack>
      {generalErrors && generalErrors.length > 0 && (
        <Text className='text-neutral-700'>
          {t('xml.errors.crmInstructions')}
        </Text>
      )}
      {generalErrors && (
        <ItemsWrapper
          loading={false}
          className='grid grid-cols-1 gap-4 md:grid-cols-2'
          LoadingComponent={null}
          EmptyComponent={
            <EmptyWrapper description={t('xml.errors.noErrors')} />
          }
        >
          {generalErrors?.map((error: string, index: number) => (
            <ul key={error} className='list-disc ps-6 text-secondary'>
              <li>
                {index + 1}. {error}
              </li>
            </ul>
          ))}
        </ItemsWrapper>
      )}
    </Stack>
  )
}

export default GeneralErrors
