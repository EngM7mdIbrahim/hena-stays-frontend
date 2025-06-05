import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@commonTypes'
import { navigationLinks } from '@constants'

import { useUser } from './useUser'

export function useProtectRoute(permission: boolean): boolean
export function useProtectRoute<T>(
  permission: (user: User | null, entity: T | null) => boolean,
  entity: T | null
): boolean
export function useProtectRoute<T>(
  permission: boolean | ((user: User | null, entity: T | null) => boolean),
  entity?: T | null
): boolean {
  const { loading, user } = useUser()
  const router = useRouter()
  const navigateToHome = useCallback(() => {
    router.push(navigationLinks.landingPage)
  }, [router])

  useEffect(() => {
    if (loading) {
      return
    }
    if (typeof permission === 'boolean') {
      if (!permission) {
        navigateToHome()
      }
    } else if (!!entity && !permission(user, entity)) {
      navigateToHome()
    }
  }, [loading, permission, entity, navigateToHome, user])

  if (loading) return false

  if (typeof permission === 'boolean') {
    return permission
  }

  if (!entity) return true
  return permission(user, entity)
}
