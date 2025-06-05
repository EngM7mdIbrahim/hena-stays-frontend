'use client'

import { PropsWithChildren } from 'react'
import { Modules } from '@enums'
import { useGetUserPermissions, useProtectRoute } from '@hooks'
import { Box } from '@mantine/core'

import LoaderScreen from '@components/LoaderScreen'

export default function ProtectedPropertiesLayout({
  children
}: PropsWithChildren) {
  const { permissions, loading, user } = useGetUserPermissions(
    Modules.PROPERTIES
  )
  const { canViewSavedProperties, canViewMyProperties } = permissions

  // First check if user is authenticated, then check permissions
  const isLoaded = useProtectRoute(
    !!user && (canViewSavedProperties || canViewMyProperties)
  )

  // Show loader while checking authentication/permissions
  if (loading || !isLoaded) {
    return <LoaderScreen />
  }

  return <Box>{children}</Box>
}
