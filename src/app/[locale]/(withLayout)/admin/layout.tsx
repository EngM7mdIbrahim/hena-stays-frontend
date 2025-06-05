'use client'

import React from 'react'
import { UserRole } from '@commonTypes'
import { useGetUserPermissions, useProtectRoute } from '@hooks'
import { Box } from '@mantine/core'

import LoaderScreen from '@components/LoaderScreen'

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { user } = useGetUserPermissions()
  const isLoaded = useProtectRoute(user?.role.includes(UserRole.Admin) ?? false)

  // Show loader if no admin permission
  if (!isLoaded) {
    return <LoaderScreen />
  }

  return <Box>{children}</Box>
}
