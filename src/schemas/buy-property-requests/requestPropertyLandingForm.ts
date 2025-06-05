import { matchIsValidTel } from 'mui-tel-input'
import * as z from 'zod'

import { TranslationFn } from '@interfaces'

export const REQUEST_PROPERTY_LANDING_FORM_SCHEMA = (t: TranslationFn) =>
  z
    .object({
      name: z
        .string()
        .min(3, { message: t('errorMessages.shared.nameTooShort') })
        .max(50, { message: t('errorMessages.shared.nameTooLong') }),
      email: z
        .string()
        .email({ message: t('errorMessages.shared.invalidEmailFormat') }),
      phone: z.string().refine((value) => matchIsValidTel(value), {
        message: t('errorMessages.shared.invalidPhone')
      }),
      whatsapp: z.string().refine((value) => !value || matchIsValidTel(value), {
        message: t('errorMessages.shared.invalidWhatsapp')
      }),
      sameAsWhatsapp: z.boolean().optional().default(false)
    })
    .superRefine((data, ctx) => {
      if (!data.sameAsWhatsapp && !data.whatsapp) {
        ctx.addIssue({
          path: ['whatsapp'],
          message: t('errorMessages.shared.whatsappRequired'),
          code: z.ZodIssueCode.custom
        })
      }
    })
    .transform((data) => {
      const { sameAsWhatsapp, ...rest } = data
      return {
        ...rest,
        phone: rest.phone.replaceAll(' ', ''),
        whatsapp: sameAsWhatsapp
          ? rest.phone.replaceAll(' ', '')
          : rest.whatsapp?.replaceAll(' ', '')
      }
    })
