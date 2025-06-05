import React from 'react'
import { DEFAULT_PROPERTY_FORM_DATA } from '@constants'
import { ProjectFormContext } from '@context'
import { Box, Flex, Input, Stack, Text } from '@mantine/core'
import { BasicInformationProps } from '@sections/Auth/SignUp/Agent/Steps/BasicInformation'
import { useTranslations } from 'next-intl'
import { CiGps } from 'react-icons/ci'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import DateField from '@components/CustomFields/DateField'
import LocationField from '@components/CustomFields/LocationField'
import TextareaField from '@components/CustomFields/TextareaField'
import TextField from '@components/CustomFields/TextField'
import { cn } from '@utils'

const { useProjectFormContext } = ProjectFormContext

function ProjectInformation({ onNext }: BasicInformationProps) {
  const form = useProjectFormContext()
  const t = useTranslations()
  return (
    <Stack className='gap-12 py-12'>
      <Box className='space-y-6'>
        <TextField
          {...form.getInputProps('title')}
          label={t('shared.fields.title')}
          placeholder={t('shared.placeholders.title', {
            type: t('projects.project')
          })}
          required
          size='md'
          type='text'
        />
        <TextareaField
          {...form.getInputProps('description')}
          label={t('shared.fields.description')}
          placeholder={t('shared.placeholders.description', {
            type: t('projects.project')
          })}
          required
          size='md'
          className='min-h-[150px]'
        />

        <Flex className='gap-1'>
          <Text component='span' className='font-bold text-neutral-500'>
            {t('shared.fields.location')}
          </Text>{' '}
          <Input.Error>*</Input.Error>
        </Flex>
        <LocationField
          modalTitle={t('shared.placeholders.selectLocation')}
          {...form.getInputProps('location')}
        >
          <Input
            size='md'
            className='!mt-2'
            classNames={{
              input: cn(
                'w-full rounded-md h-auto border bg-default-background border-neutral-400 focus:border-neutral-300 focus:outline-none'
              )
            }}
            component='button'
            type='button'
            pointer
            rightSection={<CiGps size={20} />}
          >
            <Input.Placeholder
              className={cn({
                'text-default-text': (
                  form.getValues() as typeof DEFAULT_PROPERTY_FORM_DATA
                ).location?.address
              })}
            >
              {(form.getValues() as typeof DEFAULT_PROPERTY_FORM_DATA).location
                ?.address ?? 'Enter your desired location'}
            </Input.Placeholder>
          </Input>
        </LocationField>
        <Input.Error>
          {form.errors.location && form.errors.location}
        </Input.Error>
        <DateField
          placeholder={t(
            'projects.projectForm.projectInformation.fields.handoverDate.placeholder'
          )}
          label={t(
            'projects.projectForm.projectInformation.fields.handoverDate.label'
          )}
          required
          {...form.getInputProps('handOverDate')}
          size='md'
        />
      </Box>
      <PrimaryButton
        onClick={onNext}
        size='lg'
        className='w-full rounded-lg font-semibold text-secondary'
      >
        {t('shared.buttons.next')}
      </PrimaryButton>
    </Stack>
  )
}

export default ProjectInformation
