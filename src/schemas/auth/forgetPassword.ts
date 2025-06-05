import * as z from 'zod'

import { TranslationFn } from '@interfaces'

export const FORGET_PASSWORD_FORM_SCHEMA = (t: TranslationFn) =>
  z.object({
    email: z
      .string()
      .email({ message: t('errorMessages.auth.signin.invalidEmailFormat') })
  })
