import { PropsWithChildren } from 'react'
import { useFirebaseMessaging } from '@hooks'

export default function ServiceWorkerProvider({ children }: PropsWithChildren) {
  useFirebaseMessaging()
  // Add more service workers if needed
  return children
}
