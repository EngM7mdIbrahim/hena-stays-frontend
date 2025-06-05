'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { navigationLinks } from '@constants'
import { useDefaultSupportUser } from '@hooks'
import { Box, Flex, Group, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { FaWhatsapp } from 'react-icons/fa6'
import { MdOutlineMailOutline } from 'react-icons/md'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import { cn } from '@utils'

interface CheckoutStatusProps {
  status: boolean
  className?: string
  onTryAgain?: () => void
  isBankTransfer?: boolean
}

function CheckoutStatus({
  status,
  className,
  onTryAgain,
  isBankTransfer
}: CheckoutStatusProps) {
  const t = useTranslations()
  const router = useRouter()

  const { defaultSupportUser } = useDefaultSupportUser()

  let description: string | null = null
  let title: string | null = null

  if (status) {
    if (isBankTransfer) {
      title = t('checkout.status.review.title')
      description = t('checkout.status.review.description')
    } else {
      title = t('checkout.status.success.title')
      description = t('checkout.status.success.description')
    }
  } else if (isBankTransfer) {
    // Status is false and isBankTransfer is true
    title = t('checkout.status.review.title')
    description = t('checkout.status.review.description')
  } else {
    // Status is false and isBankTransfer is false
    title = t('checkout.status.declined.title')
    description = t('checkout.status.declined.description')
  }
  return (
    <Stack
      className={cn(
        'm-auto w-full items-center justify-center py-10 text-center font-lexend',
        className
      )}
    >
      <Box className='mb-4'>
        {status ? (
          <Image
            src={navigationLinks.assets.subscription.success}
            width={100}
            height={100}
            alt='success'
          />
        ) : (
          <Image
            src={navigationLinks.assets.subscription.failed}
            width={180}
            height={180}
            alt='fail'
          />
        )}
      </Box>
      <Text component='h4' className='text-2xl font-bold md:text-3xl'>
        {title}
      </Text>
      <Text className='text-lg font-semibold text-neutral-500 md:w-[80%]'>
        {description}
      </Text>

      <PrimaryButton
        className='font-bold text-secondary hover:bg-primary/80'
        radius='md'
        size='lg'
        fullWidth
        onClick={() =>
          status
            ? router.push(navigationLinks.subscription.credits)
            : onTryAgain?.()
        }
      >
        {status && t('checkout.status.goToPremium')}
        {onTryAgain && !status && t('checkout.status.tryAgain')}
      </PrimaryButton>

      <Text className='font-semibold text-neutral-600'>
        {t('checkout.status.contactUs')}
      </Text>
      <Group className='items-center justify-center gap-6 md:justify-between'>
        <Text
          component='a'
          href={`mailto:${defaultSupportUser?.email}`}
          className='font-bold text-neutral-700 underline hover:no-underline'
        >
          <Flex className='items-center gap-1'>
            <MdOutlineMailOutline size={20} />
            {defaultSupportUser?.email}
          </Flex>
        </Text>
        <Text
          component='a'
          href={`https://wa.me/${defaultSupportUser?.phone}`}
          className='gap-1 font-bold text-neutral-700 underline hover:no-underline'
        >
          <Flex className='items-center gap-1'>
            <FaWhatsapp size={20} />
            {defaultSupportUser?.phone}
          </Flex>
        </Text>
      </Group>
    </Stack>
  )
}

export default CheckoutStatus
