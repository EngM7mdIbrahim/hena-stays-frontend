import { matchIsValidTel } from 'mui-tel-input'
import { z } from 'zod'

import { TranslationFn } from '@interfaces'

export const CLIENT_DETAILS_SCHEMA = (t: TranslationFn) =>
  z
    .object({
      name: z.string().min(
        5,
        t('errorMessages.shared.required', {
          field: t('shared.fields.fullName')
        })
      ),
      email: z
        .string()
        .email(t('errorMessages.shared.invalidEmailFormat'))
        .min(10, t('errorMessages.leadClientDetails.emailTooShort'))
        .optional()
        .or(z.literal('')), // Allow empty email if phone is provided
      phone: z
        .string()
        .refine((value) => matchIsValidTel(value), {
          message: t('errorMessages.shared.invalidPhone')
        })
        .optional()
        .or(z.literal('')) // Allow empty phone if email is provided
    })
    .refine(
      (values) => {
        return values.email || values.phone // Ensure at least one is provided
      },
      {
        message: t('errorMessages.leadClientDetails.contactRequired'),
        path: ['email']
      } // Assign error to email field
    )
    .transform((data) => {
      return {
        name: data.name,
        email: data.email || ''
      }
    })
