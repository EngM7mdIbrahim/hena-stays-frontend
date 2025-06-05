import { z } from 'zod'

import { getPreferredUriScheme } from '@utils'

import envSchema from './env-schema'

const apiDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN || ''
const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || ''
const firebaseMessagingSenderId =
  process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || ''
const firebaseAppId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ''
const firebasePublicVapidKey =
  process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_VAPID_KEY || ''

const firebaseProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || ''
const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN || ''
const sentryOrg = process.env.SENTRY_ORG || ''
const sentryProject = process.env.SENTRY_PROJECT || ''
const sentryTracesSampleRate = parseInt(
  process.env.SENTRY_TRACES_SAMPLE_RATE || '0.3',
  10
)
const appEnv = process.env.NEXT_PUBLIC_APP_ENV || 'dev'
if (appEnv !== 'dev' && appEnv !== 'stg' && appEnv !== 'prod') {
  throw new Error('NEXT_PUBLIC_APP_ENV must be one of: dev, stg, prod')
}

export const env: z.infer<typeof envSchema> & {
  api: string
} = {
  NEXT_PUBLIC_BACKEND_DOMAIN: apiDomain,
  NEXT_PUBLIC_FIREBASE_API_KEY: firebaseApiKey,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: firebaseMessagingSenderId,
  NEXT_PUBLIC_FIREBASE_APP_ID: firebaseAppId,
  NEXT_PUBLIC_FIREBASE_PUBLIC_VAPID_KEY: firebasePublicVapidKey,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: firebaseProjectId,
  NEXT_PUBLIC_SENTRY_DSN: sentryDsn,
  SENTRY_ORG: sentryOrg,
  SENTRY_PROJECT: sentryProject,
  SENTRY_TRACES_SAMPLE_RATE: sentryTracesSampleRate,
  NEXT_PUBLIC_APP_ENV: appEnv,
  api: `${getPreferredUriScheme(apiDomain)}://${apiDomain}`
}
