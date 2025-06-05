import React from 'react'
import { navigationLinks } from '@constants'
import { Stack } from '@mantine/core'
import CallRequestsSection from '@sections/CallRequestsSection'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@components/Breadcrumb'

function CallRequestsPage() {
  const t = useTranslations()
  const breadCrumbList = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },
    {
      label: t('shared.breadcrumb.users'),
      link: navigationLinks.admin.users.allUsers
    },
    {
      label: t('shared.breadcrumb.callRequests'),
      link: navigationLinks.admin.users.viewCallRequests
    }
  ]

  return (
    <Stack className='px-4 md:px-12'>
      <Breadcrumb className='gap-2 md:gap-0' list={breadCrumbList} />
      <CallRequestsSection />
    </Stack>
  )
}

export default CallRequestsPage
