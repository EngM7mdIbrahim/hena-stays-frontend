import React from 'react'
import { navigationLinks } from '@constants'
import { Stack } from '@mantine/core'
import OwnerProjectsSection from '@sections/Projects/OwnerProjectSection'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@components/Breadcrumb'

function MyProjectsPage() {
  const t = useTranslations()
  const breadCrumbList = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },
    {
      label: t('shared.breadcrumb.projects'),
      link: navigationLinks.admin.projects
    }
  ]
  return (
    <Stack className='min-h-screen gap-6 px-4 md:px-12'>
      <Breadcrumb className='gap-2 md:gap-0' list={breadCrumbList} />
      <OwnerProjectsSection mine={false} />
    </Stack>
  )
}

export default MyProjectsPage
