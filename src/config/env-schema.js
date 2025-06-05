const z = require('zod')

const envSchema = z.object({
  NEXT_PUBLIC_BACKEND_DOMAIN: z
    .string({
      message: 'NEXT_PUBLIC_BACKEND_DOMAIN must be a string'
    })
    .min(1, 'NEXT_PUBLIC_BACKEND_DOMAIN must be a string'),
  NEXT_PUBLIC_FIREBASE_API_KEY: z
    .string({
      message: 'NEXT_PUBLIC_FIREBASE_API_KEY must be a string'
    })
    .min(1, 'NEXT_PUBLIC_FIREBASE_API_KEY must be a string'),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z
    .string({
      message: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID must be a string'
    })
    .min(1, 'NEXT_PUBLIC_FIREBASE_PROJECT_ID must be a string'),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z
    .string({
      message: 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID must be a string'
    })
    .min(1, 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID must be a string'),
  NEXT_PUBLIC_FIREBASE_APP_ID: z
    .string({
      message: 'NEXT_PUBLIC_FIREBASE_APP_ID must be a string'
    })
    .min(1, 'NEXT_PUBLIC_FIREBASE_APP_ID must be a string'),
  NEXT_PUBLIC_FIREBASE_PUBLIC_VAPID_KEY: z
    .string({
      message: 'NEXT_PUBLIC_FIREBASE_PUBLIC_VAPID_KEY must be a string'
    })
    .min(1, 'NEXT_PUBLIC_FIREBASE_PUBLIC_VAPID_KEY must be a string'),
  NEXT_PUBLIC_SENTRY_DSN: z
    .string({
      message: 'NEXT_PUBLIC_SENTRY_DSN must be a string'
    })
    .url('NEXT_PUBLIC_SENTRY_DSN must be a valid URL')
    .min(1, 'NEXT_PUBLIC_SENTRY_DSN must be a string'),
  NEXT_PUBLIC_APP_ENV: z.enum(['dev', 'prod', 'stg'], {
    message: 'NEXT_PUBLIC_APP_ENV must be a valid environment'
  }),
  SENTRY_ORG: z
    .string({
      message: 'SENTRY_ORG must be a string'
    })
    .min(1, 'SENTRY_ORG must be a string'),
  SENTRY_PROJECT: z
    .string({
      message: 'SENTRY_PROJECT must be a string'
    })
    .min(1, 'SENTRY_PROJECT must be a string'),
  SENTRY_TRACES_SAMPLE_RATE: z.coerce
    .number({
      message: 'SENTRY_TRACES_SAMPLE_RATE must be a number'
    })
    .min(0, 'SENTRY_TRACES_SAMPLE_RATE must be a number')
    .max(1, 'SENTRY_TRACES_SAMPLE_RATE must be a number')
})

envSchema.parse(process.env)
module.exports = envSchema
