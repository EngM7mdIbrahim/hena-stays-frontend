import { PropsWithChildren } from 'react'

import { AuthProvider } from './AuthProvider'
import { DefaultSupportUserProvider } from './DefaultSupportUserProvider'

export function StateProvider({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <DefaultSupportUserProvider>{children}</DefaultSupportUserProvider>
    </AuthProvider>
  )
}
