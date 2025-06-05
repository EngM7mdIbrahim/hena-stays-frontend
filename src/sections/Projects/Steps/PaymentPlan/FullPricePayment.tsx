'use client'

import React from 'react'
import { ProjectFormContext } from '@context'
import { Box } from '@mantine/core'
import { useTranslations } from 'next-intl'

import NumberField from '@components/CustomFields/NumberField'

const { useProjectFormContext } = ProjectFormContext

function FullPricePayment() {
  const form = useProjectFormContext()
  const t = useTranslations()

  return (
    <Box className='flex w-full flex-col items-center gap-4 md:flex-row'>
      <Box className='w-full'>
        <NumberField
          withAsterisk={false}
          hideControls
          size='md'
          label={t(
            'projects.projectForm.paymentPlan.fields.fullPrice.preHandoverPercentage'
          )}
          showOptional={false}
          placeholder={t(
            'projects.projectForm.paymentPlan.placeholders.fullPrice.preHandoverPercentage'
          )}
          {...form.getInputProps('preHandOverPercentage')}
        />
      </Box>
      <Box className='w-full'>
        <NumberField
          withAsterisk={false}
          hideControls
          size='md'
          label={t('projects.projectForm.paymentPlan.fields.fullPrice.months')}
          placeholder={t(
            'projects.projectForm.paymentPlan.placeholders.fullPrice.months'
          )}
          showOptional={false}
          {...form.getInputProps('monthsNumber')}
        />
      </Box>
    </Box>
  )
}

export default FullPricePayment
