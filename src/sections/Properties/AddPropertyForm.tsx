'use client'

import React from 'react'
import { Modules } from '@enums'
import { useGetUserPermissions, useProtectRoute } from '@hooks'
import { Box } from '@mantine/core'
import PropertyForm from '@sections/Properties/PropertyForm'

import LoaderScreen from '@components/LoaderScreen'

function AddPropertyForm() {
  const { permissions } = useGetUserPermissions(Modules.PROPERTIES)
  const isLoaded = useProtectRoute(permissions.canCreateProperty)

  // Show loader if no permission
  if (!isLoaded) {
    return <LoaderScreen />
  }

  return (
    <Box>
      <PropertyForm />
    </Box>
  )
}

export default AddPropertyForm
