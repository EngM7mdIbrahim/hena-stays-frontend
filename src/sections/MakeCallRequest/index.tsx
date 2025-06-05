'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import {
  DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA,
  navigationLinks
} from '@constants'
import { useCreateCallRequest } from '@hooks'
import { Flex, Input, Stack, Text } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { PERSONAL_DETAILS_FORM_SCHEMA } from '@schemas/buy-property-requests'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import CheckboxField from '@components/CustomFields/CheckboxField'
import PhoneNumberField from '@components/CustomFields/PhoneNumberField'
import TextField from '@components/CustomFields/TextField'
import { transformData } from '@utils'

function MakeCallRequest() {
  const router = useRouter()
  const t = useTranslations()
  const { contactInfo, sameAsWhatsapp, contactWays } =
    DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA
  const { name, email, phone, whatsapp } = contactInfo

  const form = useForm({
    initialValues: {
      contactInfo: { name, email, phone, whatsapp },
      sameAsWhatsapp,
      contactWays
    },
    validate: zodResolver(PERSONAL_DETAILS_FORM_SCHEMA(t))
  })

  const createCallRequest = useCreateCallRequest({
    onSuccess: () => {
      router.push(navigationLinks.buyPropertyRequests.successRequest)
    }
  })

  const handleSubmit = (
    data: Pick<
      typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA,
      'contactInfo' | 'contactWays' | 'sameAsWhatsapp'
    >
  ) => {
    const transformedData = transformData(PERSONAL_DETAILS_FORM_SCHEMA(t), data)
    if (transformedData) {
      const { contactWays: contactMethods, contactInfo: newContactInfo } =
        transformedData
      createCallRequest.mutate({
        ...newContactInfo,
        contactMethods
      })
    }
  }

  return (
    <form
      onSubmit={form.onSubmit((data) =>
        handleSubmit({
          contactInfo: data.contactInfo,
          contactWays: data.contactWays,
          sameAsWhatsapp: data.sameAsWhatsapp
        })
      )}
      className='flex w-full flex-col gap-4 py-4'
    >
      <TextField
        {...form.getInputProps('contactInfo.name')}
        label={t('shared.fields.fullName')}
        placeholder={t('shared.placeholders.fullName')}
        required
        size='md'
        type='text'
      />
      <TextField
        {...form.getInputProps('contactInfo.email')}
        label={t('shared.fields.email')}
        placeholder={t('shared.placeholders.email')}
        required
        size='md'
        type='email'
      />
      <PhoneNumberField
        {...form.getInputProps('contactInfo.phone')}
        label={t('shared.fields.phoneNumber')}
        required
      />
      {!form.values.sameAsWhatsapp && (
        <Stack gap={2}>
          <PhoneNumberField
            required
            label={t('shared.fields.whatsappNumber')}
            {...form.getInputProps('contactInfo.whatsapp')}
          />
          {form.errors.whatsapp && (
            <Input.Error>{form.errors.whatsapp}</Input.Error>
          )}
        </Stack>
      )}
      <CheckboxField
        {...form.getInputProps('sameAsWhatsapp')}
        checked={form.values.sameAsWhatsapp}
        value='sameAsWhatsapp'
        label={t('shared.fields.sameAsWhatsapp')}
      />
      <Stack className='flex w-full flex-col gap-2'>
        <Text className='text-sm font-bold text-neutral-500'>
          {t('buyPropertyRequests.makeACallForm.fields.contactMethod')}
        </Text>
        <Flex className='w-full flex-wrap content-center items-center gap-2'>
          <Flex className='flex items-center gap-2 capitalize'>
            <CheckboxField
              label={t('shared.fields.email')}
              checked={form.getValues()?.contactWays?.email}
              onChange={() =>
                form.setFieldValue(
                  'contactWays.email',
                  !form.getValues()?.contactWays?.email
                )
              }
            />
          </Flex>
          <Flex className='items-center gap-2 capitalize'>
            <CheckboxField
              label={t('buyPropertyRequests.makeACallForm.fields.truedar')}
              checked={form.getValues()?.contactWays?.truedar}
              onChange={() =>
                form.setFieldValue(
                  'contactWays.truedar',
                  !form.getValues()?.contactWays?.truedar
                )
              }
            />
          </Flex>
          <Flex className='items-center gap-2 capitalize'>
            <CheckboxField
              label={t('buyPropertyRequests.makeACallForm.fields.whatsapp')}
              checked={form.getValues()?.contactWays?.whatsapp}
              onChange={() =>
                form.setFieldValue(
                  'contactWays.whatsapp',
                  !form.getValues()?.contactWays?.whatsapp
                )
              }
            />
          </Flex>
          <Flex className='items-center gap-2 capitalize'>
            <CheckboxField
              label={t('shared.fields.phoneNumber')}
              value='phone'
              checked={form.getValues().contactWays?.phone}
              onChange={() =>
                form.setFieldValue(
                  'contactWays.phone',
                  !form.getValues().contactWays?.phone
                )
              }
            />
          </Flex>
        </Flex>
        {form.errors.contactWays && (
          <Input.Error>{form.errors.contactWays}</Input.Error>
        )}
      </Stack>
      <PrimaryButton
        loading={createCallRequest.isPending}
        type='submit'
        size='lg'
        className='w-full rounded-lg font-semibold text-secondary'
      >
        {t('shared.buttons.submit')}
      </PrimaryButton>
    </form>
  )
}

export default MakeCallRequest
