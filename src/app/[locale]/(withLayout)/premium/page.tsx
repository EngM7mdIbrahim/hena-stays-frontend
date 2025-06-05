'use client'

import { navigationLinks } from '@constants'
import { Modules } from '@enums'
import { useGetUserPermissions, useProtectRoute } from '@hooks'
import { Stack } from '@mantine/core'
import PremiumSection from '@sections/Subscription/PremiumSection'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@components/Breadcrumb'
import LoaderScreen from '@components/LoaderScreen'

function PremiumPage() {
  const t = useTranslations()
  const { permissions, loading } = useGetUserPermissions(Modules.CREDITS)
  const { canViewCreditsPage } = permissions

  const isLoaded = useProtectRoute(canViewCreditsPage)

  if (loading || !isLoaded) {
    return <LoaderScreen />
  }

  const breadcrumbs = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },
    {
      label: t('shared.breadcrumb.premium'),
      link: navigationLinks.subscription.credits
    }
  ]

  return (
    <Stack className='px-4 md:px-12'>
      <Breadcrumb className='gap-2 md:gap-0' list={breadcrumbs} />
      <PremiumSection />
    </Stack>
  )
}

export default PremiumPage
