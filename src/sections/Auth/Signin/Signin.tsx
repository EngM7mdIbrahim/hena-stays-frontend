'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Platforms } from '@commonTypes'
import {
  COOKIE_KEYS,
  DEFAULT_SIGNIN_FORM_DATA,
  LOCAL_STORAGE_KEYS,
  navigationLinks,
  SEARCH_PARAM_KEYS
} from '@constants'
import { useLogin, useSendOTP, useUser } from '@hooks'
import { Box, Flex, Stack, Text } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { SIGN_IN_FORM_SCHEMA } from '@schemas'
import Cookies from 'js-cookie'
import { useTranslations } from 'next-intl'
import { FaApple, FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import CheckboxField from '@components/CustomFields/CheckboxField'
import PasswordField from '@components/CustomFields/PasswordField'
import TextField from '@components/CustomFields/TextField'
import { appNotifications, constructLink, getDeviceType } from '@utils'

function Signin() {
  const { login } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations()

  const handleClickCreateAccount = () => {
    const returnUrl = searchParams.get(SEARCH_PARAM_KEYS.RETURN_URL_KEY)
    if (returnUrl) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.REDIRECT_URL, returnUrl)
    }
  }

  const form = useForm({
    mode: 'controlled',
    initialValues: DEFAULT_SIGNIN_FORM_DATA,
    validate: zodResolver(SIGN_IN_FORM_SCHEMA(t))
  })

  const sendOTP = useSendOTP({
    onSuccess: ({ msg }) => {
      appNotifications.success(msg)
      router.push(
        constructLink(navigationLinks.auth.verifyCode, {
          [SEARCH_PARAM_KEYS.EMAIL_KEY]: form.values.email
        })
      )
    }
  })

  const { mutate, isPending } = useLogin({
    onSuccess: ({ token, user }) => {
      login(token, user)
      appNotifications.success(t('successMessages.loggedInSuccessfully'))
      router.push(navigationLinks.landingPage)
      localStorage.removeItem(LOCAL_STORAGE_KEYS.REDIRECT_URL)
    },
    onError: ({ response }) => {
      const message = response?.data?.message
      if (message?.includes('Please verify your email.')) {
        sendOTP.mutate({ email: form.values.email })
      }
    }
  })

  const handleSubmit = (data: typeof DEFAULT_SIGNIN_FORM_DATA) => {
    const fcmToken = Cookies.get(COOKIE_KEYS.FCM_TOKEN)
    const deviceType = getDeviceType()

    mutate({
      ...data,
      ...(deviceType && {
        device: {
          platform: Platforms.WEB,
          os: deviceType
        }
      }),
      fcmToken
    })
  }

  return (
    <Stack className='m-0 mt-10 w-full rounded-2xl bg-default-background/70 p-6 md:mt-0 md:bg-transparent md:p-0 lg:w-[80%]'>
      <Stack className='mb-4'>
        <Text
          component='h1'
          className='text-3xl font-bold text-neutral-800 dark:text-neutral-500'
        >
          {t('auth.signin.title')}
        </Text>
        <Flex className='flex-wrap' gap={3}>
          <Text component='span'>{t('auth.signin.doNotHaveAccount')}</Text>
          <Text
            onClick={handleClickCreateAccount}
            component={Link}
            href={navigationLinks.auth.signUp}
            className='text-primary underline hover:no-underline'
          >
            {t('auth.signin.createAccount')}
          </Text>
        </Flex>
      </Stack>
      <Stack onSubmit={form.onSubmit(handleSubmit) as any} component='form'>
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
        <PasswordField
          withAsterisk
          size='md'
          {...form.getInputProps('password')}
          placeholder={t('shared.placeholders.password')}
          label={t('shared.fields.password')}
          type='password'
          required
        />
        <Flex justify='space-between' className='mb-8 mt-0 flex-wrap' gap={3}>
          <Text
            component={Link}
            href={navigationLinks.auth.forgetPassword}
            className='text-primary underline hover:no-underline'
          >
            {t('auth.signin.forgotPassword')}
          </Text>
          <CheckboxField
            value='rememberMe'
            checked={form.values.rememberMe}
            onChange={() =>
              form.setFieldValue('rememberMe', !form.values.rememberMe)
            }
            label={t('auth.signin.rememberMe')}
          />
        </Flex>
        <PrimaryButton
          loading={isPending}
          type='submit'
          size='lg'
          className='w-full rounded-md bg-primary px-6 py-3 font-semibold text-secondary'
        >
          {t('auth.signin.login')}
        </PrimaryButton>
      </Stack>
      <Flex align='center' gap='sm' className='my-4'>
        <Box className='h-px flex-1 bg-gray-300 dark:bg-gray-600' />
        <Text className='whitespace-nowrap text-sm'>
          {t('auth.signin.orContinueWith')}
        </Text>
        <Box className='h-px flex-1 bg-gray-300 dark:bg-gray-600' />
      </Flex>

      <Flex justify='center' gap='md'>
        <FaFacebook className='text-3xl' color='#1877f2' />
        <FcGoogle className='text-3xl' />
        <FaApple className='text-3xl' />
      </Flex>
    </Stack>
  )
}

export default Signin
