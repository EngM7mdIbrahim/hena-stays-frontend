'use client'

import { useEffect } from 'react'
import clientSentryInstance from '@sentry/sentry.client.config'

export default function ErrorTracer() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      clientSentryInstance?.captureException(event.error)
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      clientSentryInstance?.captureException(event.reason)
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return null
}
