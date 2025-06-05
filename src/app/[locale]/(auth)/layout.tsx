'use client'

import { PropsWithChildren, useEffect } from 'react'
import { redirect, useSearchParams } from 'next/navigation'
import { UserRole } from '@commonTypes'
import { navigationLinks, SEARCH_PARAM_KEYS } from '@constants'
import { Modules } from '@enums'
import { useGetUserPermissions, useUser } from '@hooks'
import { AuthLayout } from '@layouts'

import LoaderScreen from '@components/LoaderScreen'

export default function NextAuthLayout({ children }: PropsWithChildren) {
  const { user, token, loading } = useUser()
  const { permissions } = useGetUserPermissions(Modules.ANALYTICS)
  const { canViewAnalyticsPage } = permissions
  const searchParams = useSearchParams()
  useEffect(() => {
    if (user && token && !loading) {
      if (searchParams.get(SEARCH_PARAM_KEYS.RETURN_URL_KEY)) {
        redirect(
          decodeURIComponent(
            searchParams.get(SEARCH_PARAM_KEYS.RETURN_URL_KEY)!
          )
        )
      }
      if (canViewAnalyticsPage) {
        redirect(navigationLinks.work.analytics)
      } else if (!canViewAnalyticsPage && user?.role === UserRole.Admin) {
        redirect(navigationLinks.admin.analytics)
      } else {
        redirect(navigationLinks.landingPage)
      }
    }
  }, [user, loading, token])
  if (!loading && (!user || !token)) {
    return <AuthLayout>{children}</AuthLayout>
  }

  // Show loader in case of user loading or there is a user and redirecting
  return <LoaderScreen />
}
