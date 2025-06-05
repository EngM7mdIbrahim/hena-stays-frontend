import { useContext } from 'react'
import {
  DefaultSupportUserContext,
  DefaultSupportUserContextInterface
} from '@context'

export function useDefaultSupportUser(): DefaultSupportUserContextInterface {
  const context = useContext(DefaultSupportUserContext)

  if (!context) {
    throw new Error(
      'useDefaultSupportUser must be used within an DefaultSupportUserProvider'
    )
  }

  return context
}
