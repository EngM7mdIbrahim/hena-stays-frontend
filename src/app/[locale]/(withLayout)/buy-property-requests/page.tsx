'use client'

import React from 'react'
import { navigationLinks } from '@constants'
import { Stack } from '@mantine/core'
import BuyPropertyRequestsSection from '@sections/BuyPropertyRequests/BuyPropertyRequestSection'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@components/Breadcrumb'

function BuyPropertyRequestsPage() {
  const t = useTranslations()
  const breadCrumbList = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },

    {
      label: t('shared.breadcrumb.buyPropertyRequests'),
      link: navigationLinks.buyPropertyRequests.allBuyPropertyRequests
    }
  ]
  return (
    <Stack className='gap-6 px-4 md:px-12'>
      <Breadcrumb className='gap-2 md:gap-0' list={breadCrumbList} />
      <BuyPropertyRequestsSection />
    </Stack>
  )
}

export default BuyPropertyRequestsPage
