'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  DEFAULT_FORGET_PASSWORD_FORM_DATA,
  navigationLinks,
  SEARCH_PARAM_KEYS
} from '@constants'
import { useForgetPassword, useLinkConstructor } from '@hooks'
import { Flex, Stack, Text } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { FORGET_PASSWORD_FORM_SCHEMA } from '@schemas'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import TextField from '@components/CustomFields/TextField'

function ForgetPassword() {
  const t = useTranslations()
  const router = useRouter()
  const { constructLink } = useLinkConstructor()

  const form = useForm({
    mode: 'controlled',
    initialValues: DEFAULT_FORGET_PASSWORD_FORM_DATA,
    validate: zodResolver(FORGET_PASSWORD_FORM_SCHEMA(t))
  })

  const forgetPassword = useForgetPassword({
    onSuccess: ({ msg }) => {
      router.push(
        constructLink(navigationLinks.auth.successForgetPasswordEmailSent, {
          [SEARCH_PARAM_KEYS.MSG_KEY]: msg
        })
      )
    }
  })

  const handleSubmit = (data: typeof DEFAULT_FORGET_PASSWORD_FORM_DATA) => {
    forgetPassword.mutate(data)
  }

  return (
    <Stack
      component='form'
      justify='center'
      onSubmit={form.onSubmit(handleSubmit) as any}
      gap={18}
      className='m-0 mt-10 w-full rounded-2xl bg-default-background/70 p-4 md:mt-0 md:bg-none lg:w-[80%]'
    >
      <Text
        component='h1'
        className='text-2xl font-bold capitalize text-neutral-800'
      >
        {t('auth.forgetPassword.title')}
      </Text>
      <Text
        component='p'
        className='w-full text-sm font-semibold text-neutral-500 md:w-3/4'
      >
        {t('auth.forgetPassword.description')}
      </Text>

      <Flex className='justify-between'>
        <Text
          component='p'
          className='space-x-1 text-sm font-semibold text-neutral-600'
        >
          {t('auth.forgetPassword.rememberPassword')}
          <Text
            component={Link}
            href={navigationLinks.auth.signIn}
            className='text-sm font-semibold text-primary underline hover:underline'
          >
            {t('auth.forgetPassword.login')}
          </Text>
        </Text>
      </Flex>

      <TextField
        {...form.getInputProps('email')}
        value={form.values.email}
        placeholder={t('shared.placeholders.email')}
        label={t('shared.fields.email')}
        type='email'
        required
        size='md'
      />
      <PrimaryButton
        loading={forgetPassword.isPending}
        type='submit'
        size='lg'
        className='w-full rounded-md bg-primary px-6 py-3 font-semibold text-secondary'
      >
        {t('auth.forgetPassword.confirm')}
      </PrimaryButton>
    </Stack>
  )
}

export default ForgetPassword
