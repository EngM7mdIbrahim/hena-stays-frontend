import { z } from 'zod'

import { TranslationFn } from '@interfaces'

import { USER_SIGN_UP_FORM_SCHEMA_WITH_EFFECTS } from './signupUser'

export const AGENT_SIGN_UP_FORM_SCHEMA = (t: TranslationFn) =>
  z.object({
    city: z
      .string()
      .min(1, {
        message: t('errorMessages.shared.required', {
          field: t('auth.signup.signupCompany.fields.licensedCity')
        })
      })
      .max(100, { message: t('errorMessages.shared.cityTooLong') }),

    license: z
      .string()
      .min(1, {
        message: t('errorMessages.shared.required', {
          field: t('auth.signup.shared.legalInformation.fields.license')
        })
      })
      .max(50, { message: t('errorMessages.shared.licenseTooLong') }),

    licenseCopies: z.array(z.any()).min(1, {
      message: t('errorMessages.shared.required', {
        field: t('auth.signup.shared.legalInformation.fields.licenseCopies')
      })
    }),

    licenseExpiryDate: z
      .date({
        invalid_type_error: t('errorMessages.shared.required', {
          field: t('auth.signup.signupCompany.fields.licenseExpiryDate')
        })
      })
      .refine((value) => new Date(value) > new Date(), {
        message: t('errorMessages.shared.licenseExpiryDateInFuture')
      })
  })

export const AGENT_SIGN_UP_FORM_SCHEMA_MERGED = (t: TranslationFn) =>
  z.intersection(
    USER_SIGN_UP_FORM_SCHEMA_WITH_EFFECTS(t),
    AGENT_SIGN_UP_FORM_SCHEMA(t)
  )
