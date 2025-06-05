import * as Sentry from '@sentry/nextjs'

const clientSentryInstance = Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.NEXT_PUBLIC_APP_ENV !== 'dev',
  environment: process.env.NEXT_PUBLIC_APP_ENV,
  tracesSampleRate:
    process.env.SENTRY_TRACES_SAMPLE_RATE !== undefined
      ? parseInt(process.env.SENTRY_TRACES_SAMPLE_RATE, 10)
      : 0.3,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [
    ...(typeof window !== 'undefined'
      ? [
          Sentry.replayIntegration({
            maskAllText: false,
            blockAllMedia: false
          })
        ]
      : [])
  ]
})

export default clientSentryInstance
