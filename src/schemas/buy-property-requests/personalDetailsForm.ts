import { matchIsValidTel } from 'mui-tel-input'
import * as z from 'zod'

import { TranslationFn } from '@interfaces'

export const CONTACT_INFO_FORM_SCHEMA = (t: TranslationFn) =>
  z.object({
    contactInfo: z.object({
      name: z
        .string()
        .min(
          10,
          t('errorMessages.buyPropertyRequests.personalDetails.nameTooShort')
        ),
      email: z.string().email(t('errorMessages.shared.invalidEmailFormat')),
      phone: z.string().refine((value) => matchIsValidTel(value), {
        message: t('errorMessages.shared.invalidPhone')
      }),
      whatsapp: z.string().refine((value) => !value || matchIsValidTel(value), {
        message: t('errorMessages.shared.invalidWhatsapp')
      })
    }),
    sameAsWhatsapp: z.boolean().optional().default(false),
    contactWays: z.object({
      email: z.boolean().optional().default(true),
      phone: z.boolean().optional().default(true),
      whatsapp: z.boolean().optional().default(true),
      truedar: z.boolean().optional().default(true)
    })
  })

export const PERSONAL_DETAILS_FORM_SCHEMA = (t: TranslationFn) =>
  CONTACT_INFO_FORM_SCHEMA(t)
    .superRefine((data, ctx) => {
      const { sameAsWhatsapp, contactInfo, contactWays } = data

      if (!Object.values(contactWays).some((value) => value)) {
        ctx.addIssue({
          path: ['contactWays'],
          message: t(
            'errorMessages.buyPropertyRequests.personalDetails.contactWayRequired'
          ),
          code: z.ZodIssueCode.custom
        })
      }

      if (!sameAsWhatsapp && !contactInfo.whatsapp) {
        ctx.addIssue({
          path: ['whatsapp'],
          message: t('errorMessages.shared.whatsappRequired'),
          code: z.ZodIssueCode.custom
        })
      }
    })
    .transform((data) => {
      const { sameAsWhatsapp, contactInfo, contactWays } = data

      return {
        contactWays,
        contactInfo: {
          ...contactInfo,
          phone: contactInfo.phone.replaceAll(' ', ''),
          whatsapp: sameAsWhatsapp
            ? contactInfo.phone.replaceAll(' ', '')
            : contactInfo.whatsapp?.replaceAll(' ', '')
        }
      }
    })
