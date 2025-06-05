'use client'

import React from 'react'
import Image from 'next/image'
import { DEFAULT_CONTACT_US_FORM_DATA, navigationLinks } from '@constants'
import { useCreateContactUs } from '@hooks'
import { Container } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { CONTACT_US_FORM_SCHEMA } from '@schemas/contact-us'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import TextareaField from '@components/CustomFields/TextareaField'
import TextField from '@components/CustomFields/TextField'
import HeaderSection from '@components/HeaderSection'
import { appNotifications } from '@utils'

function ContactUs() {
  const t = useTranslations()
  const form = useForm({
    initialValues: DEFAULT_CONTACT_US_FORM_DATA,
    validate: zodResolver(CONTACT_US_FORM_SCHEMA),
    mode: 'controlled'
  })

  const { mutate, isPending } = useCreateContactUs({
    onSuccess: () => {
      form.reset()
      appNotifications.success(t('contactUsRequests.messageSentSuccessfully'))
    }
  })

  const handleSubmit = (data: typeof DEFAULT_CONTACT_US_FORM_DATA) => {
    mutate(data)
  }

  return (
    <Container className='m-auto flex w-full flex-col items-center justify-between gap-4 md:flex-row lg:w-[80%]'>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className='w-full space-y-4 lg:w-[50%]'
      >
        <HeaderSection
          title={t('contactUsRequests.buttons.send')}
          badgeTitle={t('contactUsRequests.badgeTitle')}
        />

        <TextField
          label={t('contactUsRequests.fields.name')}
          required
          placeholder={t('contactUsRequests.placeholders.name')}
          {...form.getInputProps('name')}
        />
        <TextField
          label={t('contactUsRequests.fields.email')}
          required
          type='email'
          placeholder={t('contactUsRequests.placeholders.email')}
          {...form.getInputProps('email')}
        />
        <TextField
          label={t('contactUsRequests.fields.subject')}
          required
          placeholder={t('contactUsRequests.placeholders.subject')}
          {...form.getInputProps('subject')}
        />
        <TextareaField
          label={t('contactUsRequests.fields.message')}
          required
          placeholder={t('contactUsRequests.placeholders.message')}
          className='min-h-[150px]'
          {...form.getInputProps('message')}
        />
        <PrimaryButton
          loading={isPending}
          type='submit'
          size='lg'
          className='mt-4 rounded-xl font-semibold text-secondary'
        >
          {t('contactUsRequests.buttons.send')}
        </PrimaryButton>
      </form>
      <Image
        src={navigationLinks.assets.contactUs}
        alt='Contact us'
        className='hidden md:block'
        width={300}
        height={300}
      />
    </Container>
  )
}

export default ContactUs
