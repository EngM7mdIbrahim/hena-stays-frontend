import { User } from '@commonTypes'
import { Modules } from '@enums'
import { GUEST_USER_TYPE, rolePermissions } from '@permissions'

import { RolePermissions } from '@interfaces'

import { useUser } from './useUser'

interface ReturnType<T extends keyof RolePermissions> {
  permissions: RolePermissions[T]
  loading: boolean
  user: User | null
}

export const useGetUserPermissions = <
  T extends keyof RolePermissions = typeof Modules.COMMUNITY
>(
  module: T = Modules.COMMUNITY as T
): ReturnType<T> => {
  const { user, loading } = useUser()

  const permissions =
    rolePermissions[
      (user?.role as keyof typeof rolePermissions) ?? GUEST_USER_TYPE
    ][module]

  return { permissions, loading, user }
}
