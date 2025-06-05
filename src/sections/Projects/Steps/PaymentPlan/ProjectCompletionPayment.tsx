import React, { useEffect } from 'react'
import { ProjectFormContext } from '@context'
import { Box, Flex } from '@mantine/core'
import { useTranslations } from 'next-intl'

import NumberField from '@components/CustomFields/NumberField'

const { useProjectFormContext } = ProjectFormContext

interface ProjectCompletionPaymentProps {
  index: number
}

function ProjectCompletionPayment({ index }: ProjectCompletionPaymentProps) {
  const form = useProjectFormContext()
  const t = useTranslations()
  useEffect(() => {
    form.setFieldValue(
      `paymentPlan.projectCompletion.${index}.order`,
      index + 1
    )
  }, [])

  return (
    <Flex className='w-full flex-col gap-4 md:flex-row'>
      <Box className='w-full'>
        <NumberField
          withAsterisk={false}
          key={form.key(
            `paymentPlan.projectCompletion.${index}.mileStonePercentage`
          )}
          size='md'
          label={t(
            'projects.projectForm.paymentPlan.fields.projectCompletion.milestone'
          )}
          placeholder={t(
            'projects.projectForm.paymentPlan.placeholders.projectCompletion.milestone'
          )}
          {...form.getInputProps(
            `paymentPlan.projectCompletion.${index}.mileStonePercentage`
          )}
          hideControls
          showOptional={false}
        />
      </Box>
      <Box className='w-full'>
        <NumberField
          withAsterisk={false}
          key={form.key(
            `paymentPlan.projectCompletion.${index}.preHandOverPercentage`
          )}
          size='md'
          label={t(
            'projects.projectForm.paymentPlan.fields.projectCompletion.paymentPercentageAtThisStage'
          )}
          placeholder={t(
            'projects.projectForm.paymentPlan.placeholders.projectCompletion.paymentPercentageAtThisStage'
          )}
          {...form.getInputProps(
            `paymentPlan.projectCompletion.${index}.preHandOverPercentage`
          )}
          hideControls
          showOptional={false}
        />
      </Box>
    </Flex>
  )
}

export default ProjectCompletionPayment
