'use client'

import React from 'react'
import { navigationLinks } from '@constants'
import { Stack } from '@mantine/core'
import SellPropertiesRequestSection from '@sections/SellPropertyRequest/SellPropertyRequestsSection'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@components/Breadcrumb'

function PropertiesPage() {
  const t = useTranslations()
  const breadCrumbList = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },

    {
      label: t('shared.breadcrumb.sellPropertyRequests'),
      link: navigationLinks.sellPropertyRequests.allSellPropertyRequests
    }
  ]
  return (
    <Stack className='gap-6 px-4 md:px-12'>
      <Breadcrumb className='gap-2 md:gap-0' list={breadCrumbList} />
      <SellPropertiesRequestSection />
    </Stack>
  )
}

export default PropertiesPage
