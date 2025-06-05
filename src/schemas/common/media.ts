import { TranslationFn } from 'src/interfaces/i18.interface'
import * as z from 'zod'

export const MEDIA_SCHEMA = (t: TranslationFn) =>
  z
    .array(
      z.object({
        file: z.instanceof(File),
        preview: z.string()
      })
    )
    .min(
      1,
      t('errorMessages.shared.required', {
        field: t('properties.propertyForm.steps.propertyMedia')
      })
    )
