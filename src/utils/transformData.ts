import { ZodSchema } from 'zod'

import { appNotifications } from './appNotifications'

export function transformData<T extends ZodSchema>(
  schema: T,
  data: unknown
): ReturnType<T['safeParse']>['data'] | null {
  const result = schema.safeParse(data)
  if (result.success) {
    return result.data
  }
  appNotifications.error(
    'Something went wrong while transforming your form data.'
  )
  return null
}
