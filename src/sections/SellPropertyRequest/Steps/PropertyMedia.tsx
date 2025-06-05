import React from 'react'
import { SellPropertyRequestFormContext } from '@context'
import { Button, Group, Stack, Text } from '@mantine/core'
import { BasicInformationProps } from '@sections/Auth/SignUp/Agent/Steps/BasicInformation'
import { DetailsProps } from '@sections/Blog/Steps/Details'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import UploadMultipleFiles, { FileItem } from '@components/UploadMultipleFiles'

const { useSellPropertyRequestFormContext } = SellPropertyRequestFormContext

function PropertyMedia({
  onNext,
  onBack
}: BasicInformationProps & DetailsProps) {
  const t = useTranslations()
  const form = useSellPropertyRequestFormContext()

  return (
    <Stack className='gap-4 py-12'>
      <Stack className='gap-2'>
        <label>
          <Text component='span' className='text-sm font-bold text-neutral-500'>
            {t('properties.propertyForm.steps.propertyMedia')}
          </Text>
        </label>
        <UploadMultipleFiles
          className='min-h-80'
          value={(form.getValues() as unknown as { media: FileItem[] }).media}
          onFilesChange={(files) => form.setFieldValue('media', files)}
        />
        {form?.errors?.media && (
          <Text size='sm' c='red'>
            {form?.errors?.media}
          </Text>
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

export default PropertyMedia
