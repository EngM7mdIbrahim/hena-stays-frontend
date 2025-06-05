'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { navigationLinks } from '@constants'
import { LinksKeys, Modules } from '@enums'
import { useGetUserPermissions, useProtectRoute } from '@hooks'
import { Flex, Stack } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@components/Breadcrumb'
import LoaderScreen from '@components/LoaderScreen'
import ProfileSidebar from '@components/ProfileMenu'

export default function MyAccountLayout({
  children
}: {
  children: React.ReactNode
}) {
  const t = useTranslations()
  const pathName = usePathname()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { permissions, loading } = useGetUserPermissions(Modules.SETTINGS)
  useProtectRoute(permissions.canViewSettingsPage)

  const breadcrumbItems = [
    { label: t('shared.breadcrumb.home'), link: navigationLinks.landingPage },
    {
      label: t('shared.breadcrumb.myAccount'),
      link: navigationLinks.userProfile.myAccount.account
    },
    ...(pathName === navigationLinks.userProfile.myAccount.followings
      ? [
          {
            label: t('community.followings'),
            link: navigationLinks.userProfile.myAccount.followings
          }
        ]
      : []),

    ...(pathName === navigationLinks.userProfile.myAccount.profile
      ? [
          {
            label: t('shared.breadcrumb.settings'),
            link: navigationLinks.userProfile.myAccount.profile
          }
        ]
      : [])
  ]
  if (loading) {
    return <LoaderScreen />
  }

  return (
    <Stack className='gap-8 p-4 md:p-8'>
      <Breadcrumb list={breadcrumbItems} />

      <Flex className='min-h-screen gap-4'>
        {isMobile &&
          pathName === navigationLinks.userProfile.myAccount.account && (
            <ProfileSidebar
              className='w-full'
              links={[LinksKeys.Account, LinksKeys.Followings]}
            />
          )}

        {!isMobile &&
          pathName !== navigationLinks.userProfile.myAccount.account && (
            <ProfileSidebar links={[LinksKeys.Account, LinksKeys.Followings]} />
          )}

        <Flex className='flex-1'>{children}</Flex>
      </Flex>
    </Stack>
  )
}
