'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UserRole } from '@commonTypes'
import { navigationLinks, SEARCH_PARAM_KEYS } from '@constants'
import { useLinkConstructor } from '@hooks'
import { Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { PiBuildingOfficeLight } from 'react-icons/pi'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import AgentIcon from '@components/RenderableSvg/AgentIcon'
import TogglesWithPicture from '@components/TogglesWithPicture'

function AccountType() {
  const router = useRouter()
  const t = useTranslations()
  type UserRole = (typeof UserRole)[keyof typeof UserRole]

  const [selectedMethod, setSelectedMethod] = useState<UserRole | null>(null)

  const toggleSelection = (method: UserRole) => {
    if (selectedMethod === method) {
      setSelectedMethod(null)
    } else {
      setSelectedMethod(method)
    }
  }
  const { constructLink } = useLinkConstructor()

  const onNext = () => {
    if (selectedMethod === UserRole.Company) {
      router.push(
        constructLink(navigationLinks.auth.signUp, {
          [SEARCH_PARAM_KEYS.TYPE_KEY]: UserRole.Company
        })
      )
    } else if (selectedMethod === UserRole.Broker) {
      router.push(
        constructLink(navigationLinks.auth.signUp, {
          [SEARCH_PARAM_KEYS.TYPE_KEY]: UserRole.Broker
        })
      )
    }
  }

  const userTypeOptions = [
    {
      label: t('shared.userRoles.company'),
      value: UserRole.Company,
      icon: PiBuildingOfficeLight
    },
    {
      label: t('shared.userRoles.agent'),
      value: UserRole.Broker,
      icon: AgentIcon
    }
  ]

  return (
    <Stack>
      <Text component='p' className='text-neutral-500'>
        {t('auth.signup.accountType')}
      </Text>
      <TogglesWithPicture
        options={userTypeOptions}
        selectedValue={selectedMethod}
        onSelectedValueChange={toggleSelection}
        optionClassName='w-full'
      />
      <PrimaryButton
        disabled={!selectedMethod}
        onClick={onNext}
        type='button'
        size='lg'
        className='mt-4 w-full rounded-md bg-primary px-6 py-3 font-semibold text-secondary disabled:opacity-50'
      >
        {t('shared.buttons.next')}
      </PrimaryButton>

      <Text
        component={Link}
        href={constructLink(navigationLinks.auth.signUp, {
          [SEARCH_PARAM_KEYS.TYPE_KEY]: UserRole.User
        })}
        className='text-primary underline hover:no-underline'
      >
        {t('auth.signup.registerAsUser')}
      </Text>
    </Stack>
  )
}

export default AccountType
