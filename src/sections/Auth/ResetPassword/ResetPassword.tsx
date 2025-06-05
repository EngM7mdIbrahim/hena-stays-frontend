'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DEFAULT_RESET_PASSWORD_FORM_DATA, navigationLinks } from '@constants'
import { useResetPassword } from '@hooks'
import { Stack, Text } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { RESET_PASSWORD_FORM_SCHEMA } from '@schemas'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import PasswordField from '@components/CustomFields/PasswordField'

export interface ResetPasswordProps {
  token: string
}

function ResetPassword({ token }: ResetPasswordProps) {
  const t = useTranslations()
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.back()
    }
  }, [token])

  const form = useForm({
    mode: 'controlled',
    initialValues: DEFAULT_RESET_PASSWORD_FORM_DATA,
    validate: zodResolver(RESET_PASSWORD_FORM_SCHEMA(t))
  })

  const resetPassword = useResetPassword({
    onSuccess: () => {
      router.push(navigationLinks.auth.successResetPassword)
    }
  })

  const handleSubmit = (data: typeof DEFAULT_RESET_PASSWORD_FORM_DATA) => {
    resetPassword.mutate({
      ...data,
      token
    })
  }

  return (
    <Stack className='m-0 mt-10 w-full rounded-2xl bg-default-background/70 p-4 md:mt-0 md:bg-none lg:w-[80%]'>
      <Stack className='mb-4'>
        <Text
          component='h1'
          className='text-2xl font-bold capitalize text-neutral-800'
        >
          {t('auth.resetPassword.title')}
        </Text>
        <Text component='p' className='text-lg text-neutral-500'>
          {t('auth.resetPassword.description')}
        </Text>
      </Stack>
      <Stack onSubmit={form.onSubmit(handleSubmit) as any} component='form'>
        <Stack gap={2}>
          <PasswordField
            withAsterisk
            size='md'
            {...form.getInputProps('password')}
            placeholder={t('auth.resetPassword.newPassword')}
            label={t('auth.resetPassword.newPassword')}
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

        <PasswordField
          withAsterisk
          size='md'
          {...form.getInputProps('confirmPassword')}
          placeholder={t('auth.resetPassword.confirmPassword')}
          label={t('auth.resetPassword.confirmPassword')}
          type='password'
          required
        />

        <PrimaryButton
          loading={resetPassword.isPending}
          type='submit'
          size='lg'
          className='mt-4 w-full rounded-md bg-primary px-6 py-3 font-semibold text-secondary'
        >
          {t('auth.resetPassword.reset')}
        </PrimaryButton>
      </Stack>
    </Stack>
  )
}

export default ResetPassword
