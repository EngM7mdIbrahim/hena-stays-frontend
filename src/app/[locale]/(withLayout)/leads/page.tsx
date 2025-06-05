'use client'

import React from 'react'
import { Modules } from '@enums'
import { useGetUserPermissions, useProtectRoute } from '@hooks'
import { Box } from '@mantine/core'
import LeadsSection from '@sections/LeadsSection'

import LoaderScreen from '@components/LoaderScreen'

function LeadsPage() {
  const { permissions, loading, user } = useGetUserPermissions(Modules.LEADS)
  const { canViewLeadsPage } = permissions

  // First check if user is authenticated, then check permissions
  const isLoaded = useProtectRoute(!!user && canViewLeadsPage)

  // Show loader while checking authentication/permissions
  if (loading || !isLoaded) {
    return <LoaderScreen />
  }

  return (
    <Box className='px-4 py-10 md:px-8 lg:px-12'>
      <LeadsSection />
    </Box>
  )
}

export default LeadsPage
