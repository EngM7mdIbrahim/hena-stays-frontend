'use client'

import { PropsWithChildren } from 'react'
import { Modules } from '@enums'
import { useGetUserPermissions } from '@hooks'
import { Stack } from '@mantine/core'
import ChooseBuyPropertyRequestTypeSection from '@sections/BuyPropertyRequests/ChooseBuyPropertyRequestTypeSectiont'

import LoaderScreen from '@components/LoaderScreen'

export default function BuyPropertyRequestsLayout({
  children
}: PropsWithChildren) {
  const { permissions, loading } = useGetUserPermissions(
    Modules.BUY_PROPERTY_REQUESTS
  )

  const { canViewAllBuyPropertyRequests, canViewMyBuyPropertyRequests } =
    permissions

  if (loading) {
    return <LoaderScreen />
  }

  if (!canViewAllBuyPropertyRequests && !canViewMyBuyPropertyRequests) {
    return (
      <Stack className='h-full gap-6 p-4 md:px-12'>
        <ChooseBuyPropertyRequestTypeSection />
      </Stack>
    )
  }

  return children
}
