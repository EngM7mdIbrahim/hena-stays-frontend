'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import {
  DEFAULT_USER_SIGNUP_FORM_DATA,
  navigationLinks,
  SEARCH_PARAM_KEYS
} from '@constants'
import { useLinkConstructor } from '@hooks'
import { Input, Stack, Text } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { USER_SIGN_UP_FORM_SCHEMA_WITH_EFFECTS } from '@schemas'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import CheckboxField from '@components/CustomFields/CheckboxField'
import PasswordField from '@components/CustomFields/PasswordField'
import PhoneNumberField from '@components/CustomFields/PhoneNumberField'
import TextField from '@components/CustomFields/TextField'
import { transformData } from '@utils'

export interface SignUpUserProps {
  defaultValues?: typeof DEFAULT_USER_SIGNUP_FORM_DATA
  onSubmit: (
    data: NonNullable<
      ReturnType<
        typeof transformData<
          ReturnType<typeof USER_SIGN_UP_FORM_SCHEMA_WITH_EFFECTS>
        >
      >
    >
  ) => Promise<void>
  loading: boolean
}

function SignUpUser({ onSubmit, loading, defaultValues }: SignUpUserProps) {
  const t = useTranslations()
  const form = useForm({
    mode: 'controlled',
    initialValues: DEFAULT_USER_SIGNUP_FORM_DATA,
    validate: zodResolver(USER_SIGN_UP_FORM_SCHEMA_WITH_EFFECTS(t))
  })

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      form.setValues({
        ...defaultValues,
        isEdit: true
      })
    }
  }, [defaultValues, form?.setValues])

  const { constructLink } = useLinkConstructor()

  const handleSubmit = (data: typeof DEFAULT_USER_SIGNUP_FORM_DATA) => {
    const transformedData = transformData(
      USER_SIGN_UP_FORM_SCHEMA_WITH_EFFECTS(t),
      data
    )

    if (transformedData) {
      onSubmit(transformedData)
    }
  }

  return (
    <Stack>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextField
            withAsterisk
            value={form.values.username}
            {...form.getInputProps('username')}
            placeholder={t('shared.placeholders.username')}
            label={t('shared.fields.username')}
            type='text'
            required
            size='md'
          />
          <TextField
            withAsterisk
            value={form.values.name}
            {...form.getInputProps('name')}
            placeholder={t('shared.placeholders.fullName')}
            label={t('shared.fields.fullName')}
            type='text'
            required
            size='md'
          />
          <TextField
            withAsterisk
            value={form.values.email}
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
            {form.errors.phone && (
              <Input.Error>{form.errors.phone}</Input.Error>
            )}
          </Stack>
          {!form.values.sameAsWhatsapp && (
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
            checked={form.values.sameAsWhatsapp}
            value='sameAsWhatsapp'
            label={t('shared.fields.sameAsWhatsapp')}
          />
          <Stack gap={10}>
            <PasswordField
              withAsterisk
              size='md'
              {...form.getInputProps('password')}
              placeholder={t('shared.placeholders.password')}
              label={t('shared.fields.password')}
              type='password'
              required
            />
            <PasswordField
              withAsterisk
              size='md'
              {...form.getInputProps('confirmPassword')}
              placeholder={t('shared.placeholders.confirmPassword')}
              label={t('shared.fields.confirmPassword')}
              type='password'
              required
            />
            <Text
              component='p'
              className='text-xs font-semibold text-neutral-500'
            >
              {t('auth.signup.shared.basicInformation.fields.passwordHint')}
            </Text>
          </Stack>

          <PrimaryButton
            loading={loading}
            type='submit'
            size='lg'
            className='mt-4 w-full rounded-md bg-primary px-6 py-3 font-semibold text-secondary'
          >
            {defaultValues
              ? t('shared.buttons.update')
              : t('shared.buttons.register')}
          </PrimaryButton>
        </Stack>
      </form>
      {!defaultValues && (
        <Text
          component={Link}
          href={constructLink(navigationLinks.auth.signUp, {
            [SEARCH_PARAM_KEYS.USER_KEY]: 'false'
          })}
          className='text-primary underline hover:no-underline'
        >
          {t('auth.signup.signupUser.registerAsCompanyAgent')}
        </Text>
      )}
    </Stack>
  )
}

export default SignUpUser
