'use client'

import { BlogFormContext } from '@context'
import { Button, Input, Stack } from '@mantine/core'
import { useTranslations } from 'next-intl'

import AppEditor from '@components/AppEditor'
import PrimaryButton from '@components/Buttons/PrimaryButton'
import { ProfileInfoProps } from '@components/ProfileInfo'

const { useBlogFormContext } = BlogFormContext

export interface DetailsProps extends Pick<ProfileInfoProps, 'loading'> {
  onBack: () => void
}

function Details({ onBack, loading }: DetailsProps) {
  const form = useBlogFormContext()
  const t = useTranslations()
  return (
    <Stack className='py-4'>
      <AppEditor
        content={(form.getValues() as unknown as { content: string }).content}
        setContent={(content) => form.setFieldValue('content', content)}
        onTableOfContentChange={(toc) =>
          form.setFieldValue('tableOfContents', toc)
        }
      />
      {form.errors.content && (
        <Input.Error className='text-sm'>{form.errors.content}</Input.Error>
      )}
      <PrimaryButton
        type='submit'
        loading={loading}
        size='lg'
        className='rounded-lg font-semibold text-secondary'
      >
        {(form.getValues() as unknown as { _id: string })._id
          ? t('shared.buttons.update')
          : t('shared.buttons.add')}
      </PrimaryButton>
      <Button
        onClick={onBack}
        variant='light'
        color='gray'
        className='rounded-lg font-semibold text-primary'
        size='lg'
      >
        {t('shared.buttons.back')}
      </Button>
    </Stack>
  )
}

export default Details
