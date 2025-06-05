import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@commonTypes'
import { COOKIE_KEYS, LOCAL_STORAGE_KEYS, navigationLinks } from '@constants'
import { AuthContext } from '@context'
import Cookies from 'js-cookie'
import { useTranslations } from 'next-intl'

import { useLogout } from '@hooks/query/auth/useLogout'
import { appNotifications } from '@utils'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const t = useTranslations()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)

  const router = useRouter()

  const handleUserChange = (newUser: User | null) => {
    setLoading(false)
    setUser(newUser)
  }

  useEffect(() => {
    const storedToken = Cookies.get(COOKIE_KEYS.ACCESS_TOKEN)

    const storedUser = Cookies.get(COOKIE_KEYS.USER)

    if (storedToken && storedUser) {
      setToken(storedToken ?? null)
      handleUserChange(JSON.parse(storedUser))
    } else {
      handleUserChange(null)
    }
  }, [])

  const login = (newToken: string, newUser: any) => {
    setToken(newToken)
    handleUserChange(newUser)

    Cookies.set(COOKIE_KEYS.ACCESS_TOKEN, newToken)
    Cookies.set(COOKIE_KEYS.USER, JSON.stringify(newUser))
  }

  const logoutUser = useLogout({
    onSuccess: () => {
      Cookies.remove(COOKIE_KEYS.ACCESS_TOKEN)
    }
  })

  const logout = () => {
    setToken(null)
    handleUserChange(null)
    Cookies.remove(COOKIE_KEYS.USER)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REDIRECT_URL)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ANALYTICS)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ADMIN_ANALYTICS)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TRAFFIC)
    appNotifications.info(t('successMessages.loggedOutSuccessfully'))

    const fcmToken = Cookies.get(COOKIE_KEYS.FCM_TOKEN)
    if (fcmToken) {
      logoutUser.mutate({ fcmToken })
    } else {
      Cookies.remove(COOKIE_KEYS.ACCESS_TOKEN)
    }

    router.push(navigationLinks.landingPage)
  }

  const authContextValue = useMemo(
    () => ({ user, token, login, logout, loading, setToken }),
    [user, token, login, logout, loading, setToken]
  )

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}
