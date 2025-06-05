'use client'

import React from 'react'
import { navigationLinks } from '@constants'
import { Flex, Group, Stack, Text } from '@mantine/core'
import SubscriptionSection from '@sections/Subscription'
import { useTranslations } from 'next-intl'

import BreadcrumbWithHeader from '@components/BreadcrumbWithHeader'

function Checkout() {
  const t = useTranslations()
  const breadcrumb = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },
    {
      label: t('shared.breadcrumb.credits'),
      link: navigationLinks.subscription.credits
    },
    {
      label: t('shared.breadcrumb.payment'),
      link: navigationLinks.subscription.checkout
    }
  ]

  return (
    <Stack className='gap-6 px-4 py-10 md:px-12'>
      <Group className='items-baseline justify-between'>
        <BreadcrumbWithHeader title={t('checkout.title')} list={breadcrumb} />
        <Flex className='items-center gap-2'>
          <Text className='rounded-md border-4 border-indigo-500 p-[2px] font-bold text-indigo-500'>
            {t('checkout.stripe')}
          </Text>
          <Text className='font-bold text-neutral-700'>
            {t('checkout.poweredBy')}
          </Text>
        </Flex>
      </Group>
      <Stack className='md:[70%] m-auto mt-20 items-center justify-center lg:w-[60%]'>
        <SubscriptionSection />
      </Stack>
    </Stack>
  )
}

export default Checkout
