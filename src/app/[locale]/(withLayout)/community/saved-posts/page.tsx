'use client'

import React from 'react'
import { navigationLinks } from '@constants'
import { Modules } from '@enums'
import { useGetUserPermissions, useProtectRoute } from '@hooks'
import { Stack } from '@mantine/core'
import SavedPostsSection from '@sections/Community/SavedPostsSection'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@components/Breadcrumb'
import LoaderScreen from '@components/LoaderScreen'

export default function SavedPostsPage() {
  const t = useTranslations()
  const { permissions, loading } = useGetUserPermissions(Modules.COMMUNITY)
  const { canInteractWithPost } = permissions

  const isLoaded = useProtectRoute(canInteractWithPost)

  // Show loader while checking authentication/permissions
  if (loading || !isLoaded) {
    return <LoaderScreen />
  }

  const breadCrumbList = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },
    {
      label: t('shared.breadcrumb.community'),
      link: navigationLinks.community.allPosts
    },
    {
      label: t('shared.breadcrumb.savedPosts'),
      link: navigationLinks.community.savedPosts
    }
  ]

  return (
    <Stack className='gap-6 px-4 py-10 md:px-8 lg:px-12'>
      <Breadcrumb className='gap-2 md:gap-0' list={breadCrumbList} />
      <SavedPostsSection />
    </Stack>
  )
}
