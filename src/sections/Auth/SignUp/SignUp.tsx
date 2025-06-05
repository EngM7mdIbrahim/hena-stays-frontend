'use client'

import React from 'react'
import Link from 'next/link'
import { UserRole, UserRoleType } from '@commonTypes'
import { navigationLinks } from '@constants'
import { useNormalUserRegister, useUserRegister } from '@hooks'
import { Flex, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import AccountType from './AccountType'
import SignUpAgent from './Agent/SignUpAgent'
import SignUpCompany from './Company/SignUpCompany'
import SignUpUser from './SignUpUser'

export interface SignUpProps {
  type?: UserRoleType
}

function SignUp({ type }: SignUpProps) {
  const { onImageUpload, onSubmit } = useUserRegister()
  const { loading, onSubmit: onSubmitUser } = useNormalUserRegister()
  const t = useTranslations()
  let typeName = ''
  if (type === UserRole.User) {
    typeName = t('shared.userRoles.user')
  } else if (type === UserRole.Company) {
    typeName = t('shared.userRoles.company')
  } else if (type === UserRole.Broker) {
    typeName = t('shared.userRoles.broker')
  }
  return (
    <Stack className='mx-auto mt-10 w-full rounded-2xl bg-default-background/70 p-3 md:mt-0 md:bg-transparent md:p-0 lg:w-[80%]'>
      <Stack className='mb-4'>
        <Text
          component='h1'
          className='text-2xl font-bold text-neutral-800 dark:text-neutral-500 md:text-3xl'
        >
          {t('auth.signup.title', { type: typeName })}
        </Text>
        <Text component='p' className='font-semibold text-neutral-500'>
          {t('auth.signup.start')}
        </Text>
        <Flex gap={3}>
          <Text
            component='span'
            className='text-sm font-semibold text-neutral-500'
          >
            {t('auth.signup.haveAccount')}
          </Text>
          <Text
            component={Link}
            href={navigationLinks.auth.signIn}
            className='text-sm font-semibold text-primary underline hover:no-underline'
          >
            {t('auth.signup.login')}
          </Text>
        </Flex>
      </Stack>
      {!type ? (
        <AccountType />
      ) : (
        <>
          {type === UserRole.Company && (
            <SignUpCompany
              onImageUpload={onImageUpload}
              onSubmit={(data) => onSubmit(data, UserRole.Company)}
            />
          )}
          {type === UserRole.Broker && (
            <SignUpAgent
              onImageUpload={onImageUpload}
              onSubmit={(data) => onSubmit(data, UserRole.Broker)}
            />
          )}
          {type === UserRole.User && (
            <SignUpUser onSubmit={onSubmitUser} loading={loading} />
          )}
        </>
      )}
    </Stack>
  )
}

export default SignUp
