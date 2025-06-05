import { z } from 'zod'

import { TranslationFn } from '@interfaces'

const propertyItemSchema = (t: TranslationFn) =>
  z.object({
    price: z
      .number({ invalid_type_error: t('errorMessages.config.positiveNumber') })
      .min(1, { message: t('errorMessages.config.minValue') }),
    noExpireDays: z
      .number({ invalid_type_error: t('errorMessages.config.positiveNumber') })
      .min(1, { message: t('errorMessages.config.minValue') })
  })

export const CONFIG_FORM_SCHEMA = (t: TranslationFn) =>
  z.object({
    propertyRecommendations: z.object({
      hot: z.array(propertyItemSchema(t)),
      propertyOfWeek: z.array(propertyItemSchema(t)),
      signature: z.array(propertyItemSchema(t))
    })
  })
