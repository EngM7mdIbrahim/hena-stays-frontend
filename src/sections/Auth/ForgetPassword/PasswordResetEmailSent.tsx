'use client'

import React from 'react'
import Image from 'next/image'
import { navigationLinks } from '@constants'
import { Flex, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

export interface PasswordResetEmailSentProps {
  msg: string
}

function PasswordResetEmailSent({ msg }: PasswordResetEmailSentProps) {
  const t = useTranslations()
  return (
    <Stack
      gap={18}
      className='m-0 mt-10 w-full rounded-2xl bg-default-background/70 p-4 md:mt-0 md:bg-none lg:w-[80%]'
    >
      <Text
        component='h1'
        className='text-2xl font-bold capitalize text-neutral-800'
      >
        {t('auth.passwordResetEmailSent.title')}
      </Text>
      <Text
        component='p'
        className='w-full text-sm font-semibold text-neutral-500 md:w-1/2'
      >
        {msg}
      </Text>

      <Flex justify='center'>
        <Image
          src={navigationLinks.assets.successPasswordChange}
          alt='successful'
          width={300}
          height={300}
        />
      </Flex>

      <Flex className='justify-between'>
        <Text
          component='p'
          className='space-x-1 text-sm font-semibold text-neutral-600'
        >
          {t('auth.passwordResetEmailSent.resendMessage')}
          <Text
            component='button'
            className='text-sm font-semibold text-primary underline hover:underline'
          >
            {t('auth.passwordResetEmailSent.resendButton')}
          </Text>
        </Text>
      </Flex>
    </Stack>
  )
}

export default PasswordResetEmailSent
