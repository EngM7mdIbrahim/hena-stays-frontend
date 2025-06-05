'use client'

import React from 'react'
import { useUser } from '@hooks'
import { Box } from '@mantine/core'

import { useProtectRoute } from '@hooks/useProtectRoute'
import LoaderScreen from '@components/LoaderScreen'

function ProtectedSettingsLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser()
  const hasAccess = useProtectRoute(user !== null)

  if (!hasAccess || loading) {
    return <LoaderScreen />
  }

  return <Box>{children}</Box>
}

export default ProtectedSettingsLayout
