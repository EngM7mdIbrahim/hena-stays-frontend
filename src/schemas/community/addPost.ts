import { MEDIA_SCHEMA } from '@schemas/common'
import { LOCATION_SCHEMA } from '@schemas/common/location'
import { TranslationFn } from 'src/interfaces/i18.interface'
import * as z from 'zod'

export const ADD_POST_FORM_SCHEMA = (t: TranslationFn) =>
  z.object({
    description: z.string().min(
      1,
      t('errorMessages.shared.required', {
        field: t('shared.fields.description')
      })
    ),
    location: LOCATION_SCHEMA,

    media: MEDIA_SCHEMA(t)
  })
