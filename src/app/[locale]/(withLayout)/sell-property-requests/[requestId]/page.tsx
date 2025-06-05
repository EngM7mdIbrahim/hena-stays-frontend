import React from 'react'
import { navigationLinks } from '@constants'
import { Stack } from '@mantine/core'
import SellPropertyViewSection from '@sections/SellPropertyRequest/SellPropertyViewSection'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@components/Breadcrumb'

export interface PropertyViewPageProps {
  params: {
    requestId: string
  }
}

function PropertyViewPage({ params }: PropertyViewPageProps) {
  const t = useTranslations()
  const list = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },
    {
      label: t('shared.breadcrumb.sellPropertyRequests'),
      link: navigationLinks.sellPropertyRequests.allSellPropertyRequests
    },
    {
      label: t('shared.breadcrumb.propertyView'),
      link: navigationLinks.sellPropertyRequests.viewSellPropertyRequest(
        params.requestId
      )
    }
  ]
  return (
    <Stack className='gap-4 px-4 md:px-8 lg:px-12'>
      <Breadcrumb className='gap-2 md:gap-0' list={list} />

      <SellPropertyViewSection requestId={params.requestId} />
    </Stack>
  )
}

export default PropertyViewPage
