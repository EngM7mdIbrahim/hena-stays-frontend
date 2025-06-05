'use client'

import React from 'react'
import { Modules } from '@enums'
import { useGetUserPermissions, useProtectRoute } from '@hooks'
import SellPropertyForm from '@sections/SellPropertyRequest/SellPropertyForm'

import LoaderScreen from '@components/LoaderScreen'

function AddSellPropertyForm() {
  const { permissions } = useGetUserPermissions(Modules.SELL_PROPERTY_REQUESTS)
  const isLoaded = useProtectRoute(permissions.canAddSellPropertyRequest)

  // Show loader if no permission
  if (!isLoaded) {
    return <LoaderScreen />
  }

  return <SellPropertyForm />
}

export default AddSellPropertyForm
