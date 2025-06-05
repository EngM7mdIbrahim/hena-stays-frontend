'use client'

import React from 'react'
import Image from 'next/image'
import { navigationLinks } from '@constants'
import { Flex, Group, Input, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import OTPField from '@components/CustomFields/OTPField'

export interface OTPProps {
  email: string
  isSuccess: boolean
  isLoading: boolean
  onResend: () => void
  onConfirm: () => void
  errorMessage: string
  code: string
  setCode: React.Dispatch<React.SetStateAction<string>>
}

function OTP({
  email,
  isSuccess,
  isLoading,
  onResend,
  onConfirm,
  errorMessage,
  code,
  setCode
}: OTPProps) {
  const t = useTranslations()
  return (
    <Stack
      gap={18}
      className='m-0 mt-10 w-full rounded-2xl bg-default-background/70 p-4 md:mt-0 md:bg-transparent lg:w-[80%]'
    >
      <Image
        className='mb-8 self-center'
        src={
          isSuccess
            ? navigationLinks.assets.otp
            : navigationLinks.assets.wrongOtp
        }
        alt='otp'
        width={200}
        height={200}
      />
      <Text component='h1' className='text-2xl font-bold'>
        {t('auth.otp.title')}
      </Text>
      <Text component='p' className='w-full md:w-3/4'>
        {t('auth.otp.description')}
      </Text>

      <Text component='p' className='font-semibold'>
        {email}
      </Text>
      <Group gap={2}>
        <OTPField value={code} onChange={setCode} size='xl' />
        {errorMessage && (
          <Input.Error className='w-full' size='md'>
            {errorMessage}
          </Input.Error>
        )}
      </Group>
      <Flex className='flex-wrap justify-between'>
        <Text component='p' className='text-sm font-semibold text-neutral-600'>
          {t('auth.otp.resendMessage')}
          <Text
            component='button'
            onClick={onResend}
            className='font-semibold text-primary underline hover:underline'
          >
            {t('auth.otp.resendButton')}
          </Text>
        </Text>

        {/* <Text component='p' className='text-sm font-semibold text-neutral-600'>
          MM:SS
        </Text> */}
      </Flex>
      <PrimaryButton
        loading={isLoading}
        onClick={onConfirm}
        type='submit'
        size='lg'
        className='w-full rounded-md bg-primary px-6 py-3 font-semibold text-secondary'
      >
        {t('shared.buttons.confirm')}
      </PrimaryButton>
    </Stack>
  )
}

export default OTP
