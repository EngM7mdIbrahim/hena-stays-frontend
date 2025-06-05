'use client'

import React from 'react'
import { Modules } from '@enums'
import { useGetUserPermissions, useProtectRoute } from '@hooks'
import AnalyticsSection from '@sections/Analytics'

import LoaderScreen from '@components/LoaderScreen'

function AnalyticsPage() {
  const { permissions, loading } = useGetUserPermissions(Modules.ANALYTICS)
  const { canViewAnalyticsPage } = permissions

  const isLoaded = useProtectRoute(canViewAnalyticsPage)

  // Show loader while checking authentication/permissions
  if (loading || !isLoaded) {
    return <LoaderScreen />
  }

  return <AnalyticsSection />
}

export default AnalyticsPage
