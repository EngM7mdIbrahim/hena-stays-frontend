import React from 'react'
import { BlogFormContext } from '@context'
import { Input, Stack, Text } from '@mantine/core'
import { BasicInformationProps } from '@sections/Auth/SignUp/Agent/Steps/BasicInformation'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import TextareaField from '@components/CustomFields/TextareaField'
import TextField from '@components/CustomFields/TextField'
import UploadMultipleFiles, { FileItem } from '@components/UploadMultipleFiles'

const { useBlogFormContext } = BlogFormContext

function Basic({ onNext }: BasicInformationProps) {
  const t = useTranslations()
  const form = useBlogFormContext()

  return (
    <Stack className='gap-8 py-4'>
      <TextField
        {...form.getInputProps('title')}
        label={t('shared.fields.title')}
        placeholder={t('shared.placeholders.title', {
          type: t('community.blog')
        })}
        required
        type='text'
      />
      <TextareaField
        {...form.getInputProps('description')}
        placeholder={t('community.blogPostForm.placeholders.details')}
        label={t('shared.fields.description')}
        required
      />
      <Stack className='gap-2'>
        <label>
          <Text component='span' className='text-sm font-bold text-neutral-500'>
            {t('community.blogPostForm.fields.blogImages')}
          </Text>
        </label>
        <UploadMultipleFiles
          className='h-40'
          value={(form.getValues() as unknown as { media: FileItem[] }).media}
          onFilesChange={(files) => form.setFieldValue('media', files)}
        />
        {form.errors.media && (
          <Input.Error size='sm'>{form.errors.media}</Input.Error>
        )}
      </Stack>
      <PrimaryButton
        size='lg'
        className='rounded-lg font-semibold text-secondary'
        type='button'
        onClick={onNext}
      >
        {t('shared.buttons.next')}
      </PrimaryButton>
    </Stack>
  )
}

export default Basic
