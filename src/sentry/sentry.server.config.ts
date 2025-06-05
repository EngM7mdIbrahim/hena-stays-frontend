import * as Sentry from '@sentry/nextjs'

const serverSentryInstance = Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.NEXT_PUBLIC_APP_ENV !== 'dev',
  environment: process.env.NEXT_PUBLIC_APP_ENV,
  tracesSampleRate:
    process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE !== undefined
      ? parseInt(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE, 10)
      : 0.3,
  debug: false
})

export default serverSentryInstance
