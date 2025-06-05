'use client'

import React from 'react'
import { DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA } from '@constants'
import { BuyPropertyRequestFormContext } from '@context'
import { Button, Flex, Input, Stack, Text } from '@mantine/core'
import { DetailsProps } from '@sections/Blog/Steps/Details'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import CheckboxField from '@components/CustomFields/CheckboxField'
import PhoneNumberField from '@components/CustomFields/PhoneNumberField'
import TextField from '@components/CustomFields/TextField'

const { useBuyPropertyRequestFormContext } = BuyPropertyRequestFormContext

function PersonalDetails({ onBack, loading }: DetailsProps) {
  const t = useTranslations()
  const form = useBuyPropertyRequestFormContext()
  return (
    <Stack className='w-full gap-4 py-8'>
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
      <>
        <PhoneNumberField
          {...form.getInputProps('contactInfo.phone')}
          label={t('shared.fields.phoneNumber')}
          required
        />
        {form.errors.phone && <Input.Error>{form.errors.phone}</Input.Error>}
      </>

      {!(form.values as typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA)
        .sameAsWhatsapp && (
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
        checked={
          (form.values as typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA)
            .sameAsWhatsapp
        }
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
              checked={
                (
                  form.getValues() as typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA
                )?.contactWays?.email
              }
              onChange={() =>
                form.setFieldValue(
                  'contactWays.email',
                  !(
                    form.getValues() as typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA
                  )?.contactWays?.email
                )
              }
            />
          </Flex>
          <Flex className='items-center gap-2 capitalize'>
            <CheckboxField
              label={t('buyPropertyRequests.makeACallForm.fields.truedar')}
              checked={
                (
                  form.getValues() as typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA
                )?.contactWays?.truedar
              }
              onChange={() =>
                form.setFieldValue(
                  'contactWays.truedar',
                  !(
                    form.getValues() as typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA
                  )?.contactWays?.truedar
                )
              }
            />
          </Flex>
          <Flex className='items-center gap-2 capitalize'>
            <CheckboxField
              label={t('buyPropertyRequests.makeACallForm.fields.whatsapp')}
              checked={
                (
                  form.getValues() as typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA
                )?.contactWays?.whatsapp
              }
              onChange={() =>
                form.setFieldValue(
                  'contactWays.whatsapp',
                  !(
                    form.getValues() as typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA
                  )?.contactWays?.whatsapp
                )
              }
            />
          </Flex>
          <Flex className='items-center gap-2 capitalize'>
            <CheckboxField
              label={t('shared.fields.phoneNumber')}
              value='phone'
              checked={
                (
                  form.getValues() as typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA
                )?.contactWays?.phone
              }
              onChange={() =>
                form.setFieldValue(
                  'contactWays.phone',
                  !(
                    form.getValues() as typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA
                  )?.contactWays?.phone
                )
              }
            />
          </Flex>
        </Flex>
        {form.errors.contactWays && (
          <Input.Error>{form.errors.contactWays}</Input.Error>
        )}
      </Stack>
      <Stack>
        <Button
          onClick={onBack}
          variant='light'
          color='gray'
          className='w-full rounded-lg font-semibold text-primary'
          size='lg'
        >
          {t('shared.buttons.back')}
        </Button>
        <PrimaryButton
          loading={loading}
          type='submit'
          size='lg'
          className='w-full rounded-lg font-semibold text-secondary'
        >
          {(form.getValues() as { _id: string })?._id
            ? t('shared.buttons.update')
            : t('shared.buttons.submit')}
        </PrimaryButton>
      </Stack>
    </Stack>
  )
}

export default PersonalDetails
