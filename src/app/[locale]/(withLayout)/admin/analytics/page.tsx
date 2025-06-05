'use client'

import { UserRole } from '@commonTypes'
import { Modules } from '@enums'
import { useGetUserPermissions, useProtectRoute } from '@hooks'
import AdminAnalytics from '@sections/AdminAnalytics'

import LoaderScreen from '@components/LoaderScreen'

export default function AdminAnalyticsPage() {
  const { user } = useGetUserPermissions(Modules.ANALYTICS)
  const isLoaded = useProtectRoute(user?.role === UserRole.Admin)
  if (!isLoaded) {
    return <LoaderScreen />
  }
  return <AdminAnalytics />
}
