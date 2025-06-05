import React from 'react'
import { useGetContactUsById } from '@hooks'
import { Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import FullScreenError from '@components/FullScreenError'
import LoaderScreen from '@components/LoaderScreen'
import AppModal from '@components/Modals/AppModal'

export interface ContactUsModalProps {
  id: string
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

function ContactUsModal({ id, openModal, setOpenModal }: ContactUsModalProps) {
  const t = useTranslations()
  const { data, isLoading, isError, error } = useGetContactUsById({ id })
  const { contactUs } = data || {}

  if (isError) {
    return <FullScreenError error={error} />
  }

  return (
    <AppModal
      size='lg'
      title={`${t('buyPropertyRequests.buyPropertyRequestsForm.request')} ${t('shared.by')} ${contactUs?.name}`}
      open={openModal}
      setOpen={setOpenModal}
    >
      {isLoading ? (
        <LoaderScreen />
      ) : (
        <Stack>
          <Text className='font-semibold capitalize text-neutral-500'>
            {t('shared.fields.username')}: {contactUs?.name}
          </Text>

          <Text size='sm' className='text-neutral-500'>
            {t('shared.fields.email')}:{' '}
            <Text
              component='a'
              href={`mailto:${contactUs?.email}`}
              size='sm'
              className='text-primary hover:underline'
              target='_blank'
              rel='noopener noreferrer'
            >
              {contactUs?.email}
            </Text>
          </Text>
          <Text size='sm' className='line-clamp-1 text-neutral-500'>
            {t('contactUsRequests.card.subject')}: {contactUs?.subject}
          </Text>

          <Text size='sm' className='text-neutral-500'>
            {t('contactUsRequests.message')}: {contactUs?.message}
          </Text>
        </Stack>
      )}
    </AppModal>
  )
}

export default ContactUsModal
