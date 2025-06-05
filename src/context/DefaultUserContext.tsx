'use client'

import { createContext } from 'react'
import { User } from '@commonTypes'

export interface DefaultSupportUserContextInterface {
  defaultSupportUser: User | null
  loading: boolean
}

export const DefaultSupportUserContext =
  createContext<DefaultSupportUserContextInterface | null>(null)
