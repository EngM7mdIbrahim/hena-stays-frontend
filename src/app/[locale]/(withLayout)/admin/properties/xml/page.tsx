'use client'

import { navigationLinks } from '@constants'
import { Modules } from '@enums'
import { useGetUserPermissions, useProtectRoute } from '@hooks'
import { Stack } from '@mantine/core'
import AdminXmlRequestsSection from '@sections/Properties/AdminXmlRequests'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@components/Breadcrumb'
import LoaderScreen from '@components/LoaderScreen'

export default function AdminXmlRequestsPage() {
  const t = useTranslations()
  const { permissions } = useGetUserPermissions(Modules.PROPERTIES)
  const { canViewXmlRequests } = permissions
  const isLoaded = useProtectRoute(canViewXmlRequests)
  const breadCrumbList = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },

    {
      label: t('shared.breadcrumb.properties'),
      link: navigationLinks.admin.properties.allProperties
    },
    {
      label: t('shared.breadcrumb.xmlRequests'),
      link: navigationLinks.admin.properties.xmlRequests
    }
  ]
  if (!isLoaded) {
    return <LoaderScreen />
  }
  return (
    <Stack className='gap-6 px-4 md:px-12'>
      <Breadcrumb className='gap-2 md:gap-0' list={breadCrumbList} />
      <AdminXmlRequestsSection />
    </Stack>
  )
}
