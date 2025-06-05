import * as z from 'zod'

import { TranslationFn } from '@interfaces'

export const RESET_PASSWORD_FORM_SCHEMA = (t: TranslationFn) =>
  z
    .object({
      password: z
        .string()
        .min(8, {
          message: t('errorMessages.shared.passwordTooShort')
        })
        .regex(/[a-zA-Z]/, {
          message: t('errorMessages.shared.passwordNoLetter')
        })
        .regex(/\d/, {
          message: t('errorMessages.shared.passwordNoNumber')
        })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, {
          message: t('errorMessages.shared.passwordNoSymbol')
        }),

      confirmPassword: z.string()
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: t('errorMessages.shared.passwordsDontMatch')
    })
