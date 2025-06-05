'use client'

import { useEffect } from 'react'
import ErrorWithStatusCode from '@sections/General/ErrorWithStatusCode'
import * as Sentry from '@sentry/nextjs'

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])
  return (
    <html lang='en'>
      <body>
        <ErrorWithStatusCode
          onButtonClick={reset}
          title='All of our servers are busy'
          description='We cannot handle your request right now, please wait for a couple of minutes and refresh the page. Our team is already working on this issue.'
          statusCode={503}
          buttonText='Refresh the page'
        />
      </body>
    </html>
  )
}
