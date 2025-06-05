import { MEDIA_SCHEMA } from '@schemas/common'
import * as z from 'zod'

import { TranslationFn } from '@interfaces'

export const BLOG_POST_FORM_SCHEMA_BASIC_INFORMATION = (t: TranslationFn) =>
  z.object({
    title: z
      .string()
      .min(
        1,
        t('errorMessages.shared.required', { field: t('shared.fields.title') })
      ),
    description: z.string().min(
      1,
      t('errorMessages.shared.required', {
        field: t('shared.fields.description')
      })
    ),

    media: MEDIA_SCHEMA(t)
  })

export const BLOG_POST_FORM_SCHEMA_ADVANCED_INFORMATION = (t: TranslationFn) =>
  z.object({
    content: z.string().min(
      20,
      t('errorMessages.shared.required', {
        field: t('community.blogPostForm.fields.content')
      })
    ),
    tableOfContents: z.string().default('[]')
  })
