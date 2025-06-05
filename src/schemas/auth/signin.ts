import * as z from 'zod'

import { TranslationFn } from '@interfaces'

export const SIGN_IN_FORM_SCHEMA = (t: TranslationFn) =>
  z.object({
    email: z
      .string()
      .email({ message: t('errorMessages.auth.signin.invalidEmailFormat') }),
    password: z
      .string()
      .min(6, { message: t('errorMessages.auth.signin.invalidPassword') }),
    rememberMe: z.boolean().optional()
  })
