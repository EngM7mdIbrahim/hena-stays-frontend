'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { navigationLinks } from '@constants'
import { Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import AddRequestIcon from '@components/RenderableSvg/AddRequestIcon'
import MakeACallIcon from '@components/RenderableSvg/MakeACallIcon'
import TogglesWithPicture from '@components/TogglesWithPicture'

export default function ChooseBuyPropertyRequestTypeSection() {
  const [isMakeCall, setIsMakeCall] = useState<boolean>(false)
  const router = useRouter()
  const t = useTranslations()

  const onNext = () => {
    if (isMakeCall) {
      router.push(navigationLinks.buyPropertyRequests.makeCall)
    } else {
      router.push(navigationLinks.buyPropertyRequests.addBuyPropertyRequests)
    }
  }

  const userTypeOptions = [
    {
      label: t('buyPropertyRequests.addRequest'),
      value: false,
      icon: AddRequestIcon
    },
    {
      label: t('buyPropertyRequests.makeACall'),
      value: true,
      icon: MakeACallIcon
    }
  ]
  return (
    <>
      <Text className='max-w-4xl'>{t('buyPropertyRequests.description')}</Text>
      <Stack>
        <TogglesWithPicture
          optionClassName='w-full'
          options={userTypeOptions}
          selectedValue={isMakeCall}
          onSelectedValueChange={setIsMakeCall}
        />
        <PrimaryButton
          onClick={onNext}
          type='button'
          size='lg'
          className='mt-4 w-full rounded-md bg-primary px-6 py-3 font-semibold text-secondary disabled:opacity-50'
        >
          {t('shared.buttons.next')}
        </PrimaryButton>
      </Stack>
    </>
  )
}
