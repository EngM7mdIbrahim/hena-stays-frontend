'use client'

import { createContext } from 'react'
import { User } from '@commonTypes'

export interface AuthContextInterface {
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => void
  loading: boolean
  setToken: (token: string | null) => void
}

export const AuthContext = createContext<AuthContextInterface | null>(null)
