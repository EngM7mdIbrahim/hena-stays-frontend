'use client'

import { ReactNode } from 'react'
import { useSocketConnectionManager } from '@hooks'

interface SocketProviderProps {
  children: ReactNode
}

export function SocketProvider({ children }: SocketProviderProps) {
  // We need this provider as to access the user from the auth provider for the socket connection
  useSocketConnectionManager()
  return children
}
