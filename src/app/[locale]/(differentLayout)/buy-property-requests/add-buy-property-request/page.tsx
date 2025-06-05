'use client'

import { navigationLinks } from '@constants'
import { Stack } from '@mantine/core'
import AddBuyPropertyRequestForm from '@sections/BuyPropertyRequests/BuyPropertyRequestForm/AddBuyPropertyRequestForm'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@components/Breadcrumb'

export const dynamic = 'force-dynamic'

function AddBuyPropertyRequestPage() {
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
      label: t('buyPropertyRequests.addRequest'),
      link: navigationLinks.buyPropertyRequests.addBuyPropertyRequests
    }
  ]
  return (
    <Stack className='h-full gap-6 px-4 md:px-12'>
      <Breadcrumb className='gap-2 md:gap-0' list={breadCrumbList} />
      <AddBuyPropertyRequestForm />
    </Stack>
  )
}

export default AddBuyPropertyRequestPage
