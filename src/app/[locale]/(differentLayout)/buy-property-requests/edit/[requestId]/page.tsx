import React from 'react'
import { navigationLinks } from '@constants'
import { Stack } from '@mantine/core'
import EditBuyPropertyRequestForm from '@sections/BuyPropertyRequests/BuyPropertyRequestForm/EditBuyPropertyRequestForm'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@components/Breadcrumb'

export interface EditBuyPropertyRequestPageProps {
  params: {
    requestId: string
  }
}

function EditBuyPropertyRequestPage({
  params: { requestId }
}: EditBuyPropertyRequestPageProps) {
  const t = useTranslations()
  const breadCrumbList = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },

    {
      label: t('shared.breadcrumb.buyPropertyRequests'),
      link: navigationLinks.buyPropertyRequests.allBuyPropertyRequests
    },
    {
      label: t('shared.breadcrumb.editProperty'),
      link: navigationLinks.buyPropertyRequests.editBuyPropertyRequests(
        requestId
      )
    }
  ]

  return (
    <Stack className='h-full gap-6 px-4 md:px-12'>
      <Breadcrumb className='gap-2 md:gap-0' list={breadCrumbList} />
      <EditBuyPropertyRequestForm requestId={requestId} />
    </Stack>
  )
}

export default EditBuyPropertyRequestPage
