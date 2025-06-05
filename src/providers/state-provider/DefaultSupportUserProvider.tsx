import { useEffect, useMemo, useState } from 'react'
import { User } from '@commonTypes'
import { DefaultSupportUserContext } from '@context'
import { useGetDefaultSupportUser } from '@hooks'

export function DefaultSupportUserProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [defaultUser, setDefaultUser] = useState<User | null>(null)

  const {
    data: defaultUserData,
    isLoading,
    isFetching
  } = useGetDefaultSupportUser()

  useEffect(() => {
    if (defaultUserData) {
      setDefaultUser(defaultUserData.user)
    }
  }, [defaultUserData])

  const defaultSupportUserContextValue = useMemo(
    () => ({
      defaultSupportUser: defaultUser,
      loading: isLoading || isFetching
    }),
    [defaultUser, isLoading, isFetching]
  )

  return (
    <DefaultSupportUserContext.Provider value={defaultSupportUserContextValue}>
      {children}
    </DefaultSupportUserContext.Provider>
  )
}
