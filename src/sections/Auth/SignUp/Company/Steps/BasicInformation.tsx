'use client'

import React from 'react'
import {
  DEFAULT_AGENT_SIGNUP_FORM_DATA,
  DEFAULT_USER_SIGNUP_FORM_DATA
} from '@constants'
import { CompanySignupFormContext } from '@context'
import { Input, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import CheckboxField from '@components/CustomFields/CheckboxField'
import PasswordField from '@components/CustomFields/PasswordField'
import PhoneNumberField from '@components/CustomFields/PhoneNumberField'
import TextField from '@components/CustomFields/TextField'

const { useCompanySignupFormContext } = CompanySignupFormContext

export interface BasicInformationProps {
  onNext: () => void
}

function BasicInformation({ onNext }: BasicInformationProps) {
  const form = useCompanySignupFormContext()
  const t = useTranslations()

  return (
    <Stack>
      <TextField
        withAsterisk
        {...form.getInputProps('username')}
        placeholder={t('shared.placeholders.username')}
        label={t('shared.fields.username')}
        type='text'
        required
        size='md'
      />
      <TextField
        withAsterisk
        {...form.getInputProps('companyName')}
        placeholder={t('auth.signup.signupCompany.placeholders.companyName')}
        label={t('auth.signup.signupCompany.fields.companyName')}
        type='text'
        required
        size='md'
      />
      <TextField
        withAsterisk
        {...form.getInputProps('name')}
        placeholder={t('shared.placeholders.fullName')}
        label={t('shared.fields.fullName')}
        type='text'
        required
        size='md'
      />
      <TextField
        withAsterisk
        {...form.getInputProps('address')}
        placeholder={t('auth.signup.signupCompany.placeholders.companyAddress')}
        label={t('auth.signup.signupCompany.fields.companyAddress')}
        type='text'
        required
        size='md'
      />

      <TextField
        withAsterisk
        {...form.getInputProps('email')}
        placeholder={t('shared.placeholders.email')}
        label={t('shared.fields.email')}
        type='email'
        required
        size='md'
      />
      <Stack gap={2}>
        <PhoneNumberField
          required
          label={t('shared.fields.phoneNumber')}
          {...form.getInputProps('phone')}
        />
        {form.errors.phone && <Input.Error>{form.errors.phone}</Input.Error>}
      </Stack>
      {!(form.values as typeof DEFAULT_AGENT_SIGNUP_FORM_DATA)
        .sameAsWhatsapp && (
        <Stack gap={2}>
          <PhoneNumberField
            required
            label={t('shared.fields.whatsappNumber')}
            {...form.getInputProps('whatsapp')}
          />
          {form.errors.whatsapp && (
            <Input.Error>{form.errors.whatsapp}</Input.Error>
          )}
        </Stack>
      )}

      <CheckboxField
        {...form.getInputProps('sameAsWhatsapp')}
        checked={
          (form.values as typeof DEFAULT_USER_SIGNUP_FORM_DATA).sameAsWhatsapp
        }
        value='sameAsWhatsapp'
        label={t('shared.fields.sameAsWhatsapp')}
      />

      <Stack gap={10}>
        <PasswordField
          withAsterisk={
            !(form.values as typeof DEFAULT_USER_SIGNUP_FORM_DATA).isEdit
          }
          size='md'
          {...form.getInputProps('password')}
          placeholder={t('shared.placeholders.password')}
          label={t('shared.fields.password')}
          type='password'
          required={
            !(form.values as typeof DEFAULT_USER_SIGNUP_FORM_DATA).isEdit
          }
        />
        <PasswordField
          withAsterisk={
            !(form.values as typeof DEFAULT_USER_SIGNUP_FORM_DATA).isEdit
          }
          size='md'
          {...form.getInputProps('confirmPassword')}
          placeholder={t('shared.placeholders.confirmPassword')}
          label={t('shared.fields.confirmPassword')}
          type='password'
          required={
            !(form.values as typeof DEFAULT_USER_SIGNUP_FORM_DATA).isEdit
          }
        />
        <Text component='p' className='text-xs font-semibold text-neutral-500'>
          {t('auth.signup.shared.basicInformation.fields.passwordHint')}
        </Text>
      </Stack>

      <PrimaryButton
        onClick={onNext}
        type='button'
        size='lg'
        className='mt-4 w-full rounded-md bg-primary px-6 py-3 font-semibold text-secondary'
      >
        {t('shared.buttons.next')}
      </PrimaryButton>
    </Stack>
  )
}

export default BasicInformation
