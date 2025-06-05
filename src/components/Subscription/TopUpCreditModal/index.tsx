'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CurrencyCode } from '@commonTypes'
import {
  DEFAULT_CREDITS_FORM_DATA,
  navigationLinks,
  SEARCH_PARAM_KEYS
} from '@constants'
import { useGetConfig, useLinkConstructor } from '@hooks'
import {
  Box,
  Button,
  Flex,
  Group,
  Input,
  Skeleton,
  Stack,
  Text
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useTranslations } from 'next-intl'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { FaCoins } from 'react-icons/fa'

import { useGetMySubscription } from '@hooks/query/subscriptions/useGetMySubscription'
import PrimaryButton from '@components/Buttons/PrimaryButton'
import FullScreenError from '@components/FullScreenError'
import LoaderScreen from '@components/LoaderScreen'
import AppModal from '@components/Modals/AppModal'
import { cn, formatNumberToShortForm } from '@utils'

function TopUpCreditsModalSkeleton() {
  const t = useTranslations()
  return (
    <Stack className='mt-2 gap-2'>
      <Flex className='w-full items-center justify-between'>
        <Text>{t('premium.topUpCredits.estimatedSubTotal')}</Text>
        <Skeleton height={24} width={100} />
      </Flex>
      <Flex className='w-full items-center justify-between'>
        <Text>{t('premium.topUpCredits.estimatedVAT')}</Text>
        <Skeleton height={24} width={100} />
      </Flex>
      <Flex className='w-full items-center justify-between'>
        <Text>{t('premium.topUpCredits.estimatedTotal')}</Text>
        <Skeleton height={24} width={100} />
      </Flex>
    </Stack>
  )
}

export interface TopUpCreditsModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function TopUpCreditsModal({ open, setOpen }: TopUpCreditsModalProps) {
  const t = useTranslations()
  const { constructLink } = useLinkConstructor()
  const {
    data: subscriptionData,
    isLoading: isSubscriptionLoading,
    error: subscriptionError,
    isError: isSubscriptionError
  } = useGetMySubscription()

  const router = useRouter()
  const { data, isLoading, error, isError } = useGetConfig()
  const [amountSelected, setAmountSelected] = useState(75)
  const amounts = [75, 150, 300, 500, 800]

  const { getInputProps, values, setFieldValue, onSubmit } = useForm({
    initialValues: DEFAULT_CREDITS_FORM_DATA
  })

  const fees = Number(data?.config.creditsPrice) * +values.totalAmount
  const tax = fees * 0.05
  const total = fees + tax
  const handleSelectAmount = (value: number) => {
    setAmountSelected(value)
  }

  const handleIncrementAmount = () => {
    setFieldValue('totalAmount', +values.totalAmount + amountSelected)
  }

  const handleDecrementAmount = () => {
    const newAmount = +values.totalAmount - amountSelected
    setFieldValue('totalAmount', newAmount < 75 ? 75 : newAmount)
  }

  const handleSubmit = (dataToSubmit: typeof DEFAULT_CREDITS_FORM_DATA) => {
    setOpen(false)
    router.push(
      constructLink(navigationLinks.subscription.checkout, {
        [SEARCH_PARAM_KEYS.CREDITS_KEY]: String(dataToSubmit.totalAmount),
        [SEARCH_PARAM_KEYS.RETURN_URL_KEY]:
          window.location.origin + navigationLinks.subscription.checkoutCallback
      })
    )
  }

  const isErrors = isError || isSubscriptionError
  const errorToShow = error || subscriptionError

  let content = null

  if (isErrors && errorToShow) {
    content = <FullScreenError error={errorToShow} />
  }

  if (isSubscriptionLoading) {
    content = <LoaderScreen />
  }

  return (
    <AppModal size='lg' open={open} setOpen={setOpen} title='Top-Up Credits'>
      {content}
      {!isErrors && !isSubscriptionLoading && (
        <>
          <Flex className='items-center gap-2 text-sm text-neutral-600'>
            <Text>
              {t('premium.topUpCredits.availableCreditsLabel')}:{' '}
              {subscriptionData?.subscription.credits}
            </Text>
            <FaCoins className='text-primary' />
          </Flex>

          <form className='space-y-4' onSubmit={onSubmit(handleSubmit)}>
            <Stack>
              <Text className='mt-4'>
                {t('premium.topUpCredits.creditsTopUpAmount')}
              </Text>
              <Flex className='justify-between gap-4'>
                <Button
                  size='md'
                  variant='outline'
                  type='button'
                  disabled={values.totalAmount === 75}
                  onClick={handleDecrementAmount}
                  className='rounded-full border border-neutral-200 font-medium text-neutral-600 duration-200 hover:border-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-neutral-200'
                >
                  <BiMinus className='text-primary' size={25} />
                </Button>

                <Input
                  readOnly
                  {...getInputProps('totalAmount')}
                  radius='xl'
                  className='flex-1'
                  size='md'
                />

                <Button
                  variant='outline'
                  type='button'
                  size='md'
                  onClick={handleIncrementAmount}
                  className='rounded-full border border-neutral-200 font-medium text-neutral-600 duration-200 hover:border-primary'
                >
                  <BiPlus className='text-primary' size={25} />
                </Button>
              </Flex>
            </Stack>
            <Box className='grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
              {amounts.map((value) => (
                <Button
                  variant='outline'
                  size='md'
                  type='button'
                  onClick={() => handleSelectAmount(value)}
                  key={value}
                  className={cn(
                    'rounded-full border border-neutral-200 font-medium text-neutral-600 duration-200 hover:border-primary',
                    amountSelected === value && 'border-primary'
                  )}
                  leftSection={<BiPlus className='text-primary' />}
                >
                  {value}
                </Button>
              ))}
            </Box>
            <hr />
            {isLoading ? (
              <TopUpCreditsModalSkeleton />
            ) : (
              <>
                <Flex className='mt-2 w-full items-center justify-between'>
                  <Text>{t('premium.topUpCredits.estimatedSubTotal')}</Text>
                  <Text className='text-lg font-bold'>
                    {CurrencyCode.Aed} {formatNumberToShortForm(fees)}
                  </Text>
                </Flex>
                <Flex className='mt-2 w-full items-center justify-between'>
                  <Text>{t('premium.topUpCredits.estimatedVAT')}</Text>
                  <Text className='text-lg font-bold'>
                    {CurrencyCode.Aed} {formatNumberToShortForm(tax)}
                  </Text>
                </Flex>
                <Flex className='mt-2 w-full items-center justify-between'>
                  <Text>{t('premium.topUpCredits.estimatedTotal')}</Text>
                  <Text className='text-lg font-bold'>
                    {CurrencyCode.Aed} {formatNumberToShortForm(total)}
                  </Text>
                </Flex>
              </>
            )}
            <Group>
              <Button
                size='md'
                radius='xl'
                onClick={() => setOpen(false)}
                variant='light'
                color='gray'
                className='w-full font-semibold text-primary md:flex-1'
              >
                {t('premium.topUpCredits.cancel')}
              </Button>
              <PrimaryButton
                size='md'
                radius='xl'
                type='submit'
                className='w-full font-semibold text-secondary md:flex-1'
              >
                {t('premium.topUpCredits.proceedToBuy')}
              </PrimaryButton>
            </Group>
          </form>
        </>
      )}
    </AppModal>
  )
}

export default TopUpCreditsModal
