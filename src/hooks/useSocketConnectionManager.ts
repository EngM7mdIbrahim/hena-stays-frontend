import { useEffect } from 'react'
import { initializeSocketInstance, invalidateSocketInstance } from '@services'

import { useUser } from './useUser'

export function useSocketConnectionManager() {
  const { token } = useUser()

  useEffect(() => {
    if (token) {
      initializeSocketInstance(token)
    } else {
      invalidateSocketInstance()
    }
    return () => {
      invalidateSocketInstance()
    }
  }, [token])
}
