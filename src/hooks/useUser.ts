import { useContext } from 'react'
import { AuthContext, AuthContextInterface } from '@context'

export function useUser(): AuthContextInterface {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useUser must be used within an AuthProvider')
  }

  return context
}
