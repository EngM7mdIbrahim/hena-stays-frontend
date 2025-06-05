'use client'

import React from 'react'
import { Modules } from '@enums'
import { useGetUserPermissions, useProtectRoute } from '@hooks'
import { Box } from '@mantine/core'

import LoaderScreen from '@components/LoaderScreen'

export default function AdminUsersLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { permissions } = useGetUserPermissions(Modules.USERS)
  const { canViewUsersPage } = permissions
  const isLoaded = useProtectRoute(canViewUsersPage)

  // Show loader if no admin permission
  if (!isLoaded) {
    return <LoaderScreen />
  }

  return <Box>{children}</Box>
}
