import React from 'react'
import { ProjectFormContext } from '@context'
import { Button, Group, Input, Stack, Text } from '@mantine/core'
import { BasicInformationProps } from '@sections/Auth/SignUp/Agent/Steps/BasicInformation'
import { DetailsProps } from '@sections/Blog/Steps/Details'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import UploadMultipleFiles, { FileItem } from '@components/UploadMultipleFiles'

const { useProjectFormContext } = ProjectFormContext

function ProjectMedia({
  onNext,
  onBack
}: BasicInformationProps & DetailsProps) {
  const form = useProjectFormContext()
  const t = useTranslations()

  return (
    <Stack className='gap-4 py-12'>
      <Stack className='gap-2'>
        <label>
          <Text component='span' className='text-sm font-bold text-neutral-500'>
            {t('projects.projectForm.steps.projectMedia')}
          </Text>
        </label>
        <UploadMultipleFiles
          className='min-h-80'
          value={(form.getValues() as unknown as { media: FileItem[] }).media}
          onFilesChange={(files) => form.setFieldValue('media', files)}
        />
        {form?.errors?.media && (
          <Input.Error size='sm'>{form?.errors?.media}</Input.Error>
        )}
      </Stack>
      <Group>
        <Button
          onClick={onBack}
          variant='light'
          color='gray'
          className='w-full rounded-lg font-semibold text-primary md:flex-1'
          size='lg'
        >
          {t('shared.buttons.back')}
        </Button>
        <PrimaryButton
          onClick={onNext}
          size='lg'
          className='w-full rounded-lg font-semibold text-secondary md:flex-1'
        >
          {t('shared.buttons.next')}
        </PrimaryButton>
      </Group>
    </Stack>
  )
}

export default ProjectMedia
