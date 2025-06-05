'use client'

import React from 'react'
import { Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import TogglesWithPicture, {
  TogglesWithPictureProps
} from '@components/TogglesWithPicture'

export interface PaymentOptionsSelectionProps
  extends TogglesWithPictureProps<string> {
  handleNext: () => void
  isBuying: boolean
}

function PaymentOptionsSelection({
  handleNext,
  isBuying,
  options,
  selectedValue,
  onSelectedValueChange
}: PaymentOptionsSelectionProps) {
  const t = useTranslations()
  return (
    <Stack className='w-full items-center'>
      <Stack className='w-full gap-4'>
        <Text className='text-md text-neutral-600'>
          {t('checkout.paymentMethod.selectMethod')}
        </Text>
        <Text className='text-lg font-bold text-neutral-700'>
          {t('checkout.paymentMethod.title')}
        </Text>
        <TogglesWithPicture
          options={options}
          selectedValue={selectedValue}
          onSelectedValueChange={onSelectedValueChange}
          optionClassName='w-full'
        />

        <PrimaryButton
          className='mt-10 font-extrabold text-secondary hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-50'
          onClick={handleNext}
          size='md'
          loading={isBuying}
        >
          {t('shared.buttons.next')}
        </PrimaryButton>
      </Stack>
    </Stack>
  )
}

export default PaymentOptionsSelection
