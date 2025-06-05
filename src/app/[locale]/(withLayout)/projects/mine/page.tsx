'use client'

import React from 'react'
import { navigationLinks } from '@constants'
import { Modules } from '@enums'
import { useGetUserPermissions, useProtectRoute } from '@hooks'
import { Stack } from '@mantine/core'
import OwnerProjectsSection from '@sections/Projects/OwnerProjectSection'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@components/Breadcrumb'
import LoaderScreen from '@components/LoaderScreen'

function MyProjectsPage() {
  const t = useTranslations()
  const { permissions, loading, user } = useGetUserPermissions(Modules.PROJECTS)
  const { canViewMyProjects } = permissions

  // First check if user is authenticated, then check permissions
  const isLoaded = useProtectRoute(!!user && canViewMyProjects)

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
      label: t('shared.breadcrumb.projects'),
      link: navigationLinks.projects.allProjects
    },
    {
      label: t('shared.breadcrumb.myProjects'),
      link: navigationLinks.projects.myProjects
    }
  ]

  return (
    <Stack className='min-h-screen gap-6 px-4 md:px-12'>
      <Breadcrumb className='gap-2 md:gap-0' list={breadCrumbList} />
      <OwnerProjectsSection />
    </Stack>
  )
}

export default MyProjectsPage
