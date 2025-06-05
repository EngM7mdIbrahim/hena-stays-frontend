'use client'

import { PropsWithChildren, useMemo } from 'react'
import { useGetUserPermissions } from '@hooks'
import { UsersLayouts } from '@layouts'
import { GUEST_USER_TYPE } from '@permissions'

import LoaderScreen from '@components/LoaderScreen'

export default function NextAuthenticatedLayout({
  children
}: PropsWithChildren) {
  const { user, loading } = useGetUserPermissions()
  const Layout = useMemo(() => {
    const layoutKey = !user ? GUEST_USER_TYPE : user.role
    return UsersLayouts[layoutKey as keyof typeof UsersLayouts]
  }, [user, loading])

  return loading ? <LoaderScreen /> : <Layout>{children}</Layout>
}
