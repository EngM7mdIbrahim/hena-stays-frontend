'use client'

import React from 'react'
import { useDefaultSupportUser, useGetConfig } from '@hooks'
import {
  Alert,
  Box,
  Button,
  Divider,
  Flex,
  Skeleton,
  Stack,
  Text
} from '@mantine/core'
import { useTranslations } from 'next-intl'
import { CiCreditCard1 } from 'react-icons/ci'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import FullScreenError from '@components/FullScreenError'
import PaymentInfo from '@components/Subscription/PaymentInfo'
import UploadFile from '@components/UploadFile'
import { cn, formatNumberToShortForm } from '@utils'

function BankTransferSkeleton() {
  return (
    <Stack className='flex flex-col gap-4'>
      <Skeleton height={28} width={200} />
      <Box className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Skeleton height={100} />
        <Skeleton height={100} />
        <Skeleton height={100} />
        <Skeleton height={100} />
      </Box>
      <Skeleton height={1} />
      <Box className='rounded-md bg-neutral-100 p-4'>
        <Stack>
          <Skeleton height={16} width='80%' />
          <Skeleton height={16} width='60%' />
          <Skeleton height={16} width='70%' />
          <Skeleton height={16} width='50%' />
        </Stack>
      </Box>
      <Stack className='items-center'>
        <Skeleton height={100} />
        <Skeleton height={40} />
        <Flex className='mt-6 flex cursor-pointer items-center justify-center gap-1'>
          <Skeleton height={24} width={24} />
          <Skeleton height={20} width={100} />
        </Flex>
      </Stack>
    </Stack>
  )
}

interface BankTransferProps {
  className?: string
  onSubmit: () => void
  onPaymentVisa: () => void
  isBankCreating: boolean
  credits: number
  file: File | null
  onFileChange: (file: File | null) => void
}

function BankTransfer({
  className,
  file,
  onFileChange,
  onPaymentVisa,
  credits,
  onSubmit,
  isBankCreating
}: BankTransferProps) {
  const t = useTranslations()
  const { defaultSupportUser } = useDefaultSupportUser()
  const { data, isLoading, isError, error } = useGetConfig()

  const fees = Number(data?.config.creditsPrice) * credits
  const tax = fees * 0.05
  const total = fees + tax

  if (isLoading) {
    return <BankTransferSkeleton />
  }
  if (isError && error) {
    return <FullScreenError error={error} />
  }
  return (
    <Stack className={cn('flex flex-col gap-4', className)}>
      <Text component='h2' className='text-xl font-bold text-neutral-500'>
        {t('checkout.bankTransfer.title')}
      </Text>
      <Box className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <PaymentInfo
          title={t('checkout.bankTransfer.fullName')}
          textToCopy='TRUE DAR MARKETING MANAGEMENT L.L.C'
        />
        <PaymentInfo
          title={t('checkout.bankTransfer.bic')}
          textToCopy='WIOBAEADXXX'
        />
        <PaymentInfo
          title={t('checkout.bankTransfer.iban')}
          textToCopy='AE260860000009451979429'
        />
        <PaymentInfo
          title={t('checkout.bankTransfer.businessAddress')}
          textToCopy='Office No F-16, SABHA BUILD, Jabal Ali Industrial First, Dubai, United Arab Emirates'
        />
      </Box>
      <Divider className='mb-6 h-[1px] bg-neutral-300' />
      <Alert
        className='mb-4'
        variant='light'
        color='blue'
        title={t('checkout.bankTransfer.details')}
      >
        <Text>
          {t('checkout.bankTransfer.constOfCreditsDescription', {
            credits,
            total: formatNumberToShortForm(total)
          })}
          <Text
            component='a'
            href={`mailto:${defaultSupportUser?.email}`}
            className='text-blue-500 hover:text-blue-700'
          >
            {defaultSupportUser?.email}
          </Text>{' '}
          <br />
          {t('checkout.bankTransfer.orContactUsOnWhatsapp')}
          <Text
            component='a'
            href={`https://wa.me/${defaultSupportUser?.whatsapp}`}
            className='text-blue-500 hover:text-blue-700'
          >
            {defaultSupportUser?.whatsapp}
          </Text>
          .
        </Text>
      </Alert>

      <Stack className='items-center'>
        <UploadFile
          acceptPdf
          placeholder={t('checkout.bankTransfer.uploadReceipt')}
          file={file}
          onFileChange={onFileChange}
        />
        <PrimaryButton
          className='font-semibold text-secondary hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-50'
          onClick={onSubmit}
          size='md'
          disabled={isBankCreating}
          loading={isBankCreating}
          fullWidth
          type='submit'
        >
          {t('checkout.bankTransfer.submit')}
        </PrimaryButton>
        <Button
          variant='transparent'
          className='mt-6 flex cursor-pointer items-center justify-center gap-1'
          onClick={onPaymentVisa}
        >
          <CiCreditCard1 className='h-6 w-6 text-neutral-700' />
          <Text
            component='a'
            className='font-bold text-neutral-700 underline hover:no-underline'
          >
            {t('checkout.bankTransfer.orByCard')}
          </Text>
        </Button>
      </Stack>
    </Stack>
  )
}

export default BankTransfer
