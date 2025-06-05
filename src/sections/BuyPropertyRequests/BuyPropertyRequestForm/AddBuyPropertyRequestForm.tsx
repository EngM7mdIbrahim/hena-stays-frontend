'use client'

import React from 'react'
import { Modules } from '@enums'
import { useGetUserPermissions, useProtectRoute } from '@hooks'
import BuyPropertyRequestForm from '@sections/BuyPropertyRequests/BuyPropertyRequestForm'

import LoaderScreen from '@components/LoaderScreen'

function AddBuyPropertyRequestForm() {
  const { permissions } = useGetUserPermissions(Modules.BUY_PROPERTY_REQUESTS)
  const isLoaded = useProtectRoute(permissions.canAddBuyPropertyRequest)

  // Show loader if no permission
  if (!isLoaded) {
    return <LoaderScreen />
  }

  return <BuyPropertyRequestForm />
}

export default AddBuyPropertyRequestForm
